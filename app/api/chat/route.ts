import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextResponse } from "next/server";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

const portfolioContext = `
You are the AI assistant for Nabeel Faisal's developer portfolio.

ABOUT NABEEL:
- Name: Nabeel Faisal
- Role: MERN Stack Developer
- Based in Pakistan
- Open to remote opportunities
- Focus: Full-stack web development, AI, LLMs and Agentic AI

SKILLS:
HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS,
Bootstrap, Ant Design, Next.js, Node.js, Express, MongoDB,
SQL, Supabase, Redux Toolkit, Zustand, Git, GitHub, REST APIs,
, Prompt Engineering .

PROJECTS:

1. Workforce Management
Stack: React, Vite, Express, MongoDB, JWT
Features include authentication, role-based dashboards,
attendance, QR scanning, tasks and employee management.
Live: https://workforce-management-crgn.vercel.app/
Frontend:
https://github.com/Nabeel-progrmer/Workforce-Management
Backend:
https://github.com/Nabeel-progrmer/Workforce-backend

2. Nexaura Academy
Stack: HTML, CSS, JavaScript, Supabase
Live: https://nexaura-academy.netlify.app/
GitHub:
https://github.com/Nabeel-progrmer/Nexaura-academy

3. NOVA E-Commerce
Stack: React, Redux Toolkit, JavaScript, CSS
Live: https://e-commerce-nova.netlify.app/
GitHub:
https://github.com/Nabeel-progrmer/E-commerce-Redux

4. Bakery Website
Stack: Next.js, TypeScript, Tailwind CSS
Live: https://bakery-website-1-two.vercel.app/
GitHub:
https://github.com/Nabeel-progrmer/Bakery-Website

LINKS:
LinkedIn:
https://www.linkedin.com/in/nabeel-faisal-926a46386/

GitHub:
https://github.com/Nabeel-progrmer

RULES:
- Answer portfolio questions using the information above.
- Never invent experience, education, jobs, achievements or technologies.
- If information is not available, say that it is not listed in the portfolio.
- Keep answers concise and professional.
- For current or time-sensitive questions, use Google Search grounding and include sources in the answer.
- Do not present outdated or uncertain information as current.
- For general questions unrelated to Nabeel, answer normally.
`;

function aiErrorMessage(error: unknown) {
  const details = error instanceof Error ? error.message.toLowerCase() : "";

  if (/per.?minute|per.?second|too many requests|rate.?limit/.test(details)) {
    return "Nabeel AI is getting too many requests right now. Wait a minute and try again.";
  }

  if (/quota|resource_exhausted|per.?day|billing|spend/.test(details)) {
    return "Nabeel AI has reached its usage limit. Please try again later.";
  }

  if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
    return "Nabeel AI is temporarily unavailable. Please try again later.";
  }

  return "Nabeel AI couldn't complete this request. Please try again.";
}

const realTimeQuestion =
  /\b(today|tonight|now|right now|live|real[- ]time|current(?:ly)?|latest|recent(?:ly)?|breaking|news|weather|forecast|temperature|price|stock|exchange rate|score|standings|schedule|results?|election|president|prime minister|as of|this (?:week|month|year)|who won|search (?:the )?web|look up online)\b/i;

const simpleDateQuestion =
  /\b(?:whats? the day today|what is the day today|what day is (?:it|today)(?: today)?|which day is today|day today|whats? todays date|what is todays date|todays date|date today|current date)\b/i;

export async function POST(request: Request) {
  try {
    // Keep app/.env in place while loading it only on the server.
    loadEnvConfig(path.join(process.cwd(), "app"));

    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const normalizedMessage = message
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[?!.,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (simpleDateQuestion.test(normalizedMessage)) {
      const now = new Date();
      const date = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Karachi",
      }).format(now);

      return new Response(
        `${JSON.stringify({ text: `Today is ${date} (Pakistan time).` })}\n`,
        { headers: { "Content-Type": "application/x-ndjson; charset=utf-8" } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Nabeel AI is not configured on the server yet." },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const useSearch = realTimeQuestion.test(message);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sources = new Map<string, string>();
        let sentText = false;
        const emit = (value: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`${JSON.stringify(value)}\n`));
        };

        const streamModel = async (withSearch: boolean, searchFallback = false) => {
          const responseStream = await ai.models.generateContentStream({
            model: "gemini-3.5-flash-lite",
            contents: message,
            config: {
              systemInstruction: searchFallback
                ? `${portfolioContext}\n\nLive web search is unavailable for this request. Do not claim to have checked current data or cite sources. Clearly say the current information could not be verified, and only offer general context if useful.`
                : portfolioContext,
              maxOutputTokens: 256,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
              ...(withSearch ? { tools: [{ googleSearch: {} }] } : {}),
            },
          });

          for await (const chunk of responseStream) {
            if (chunk.text) {
              sentText = true;
              emit({ text: chunk.text });
            }

            if (withSearch) {
              for (const candidate of chunk.candidates ?? []) {
                for (const groundingChunk of candidate.groundingMetadata?.groundingChunks ?? []) {
                  const webSource = groundingChunk.web;
                  if (webSource?.uri) {
                    sources.set(webSource.uri, webSource.title || webSource.uri);
                  }
                }
              }
            }
          }
        };

        try {
          await streamModel(useSearch);

          if (sources.size > 0) {
            emit({
              sources: Array.from(sources, ([url, title]) => ({ url, title })).slice(0, 5),
            });
          }
        } catch (error) {
          console.error("Gemini stream error:", error);
          const searchQuotaReached =
            useSearch && error instanceof ApiError && error.status === 429;

          if (searchQuotaReached && !sentText) {
            sources.clear();
            emit({
              notice:
                "Live search is unavailable right now, so this answer may not include the latest information.",
            });

            try {
              await streamModel(false, true);
            } catch (fallbackError) {
              console.error("Nabeel AI fallback error:", fallbackError);
              emit({ error: aiErrorMessage(fallbackError) });
            }
          } else {
            emit({
              error: searchQuotaReached
                ? "Live search stopped before the answer was complete. Please try again."
                : aiErrorMessage(error),
            });
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { error: aiErrorMessage(error) },
      { status: 502 }
    );
  }
}
