
"use client";

import { useEffect, useRef, useState } from "react";

type ChatSource = { url: string; title: string };
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  notice?: string;
};

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Nabeel's AI portfolio assistant. Ask me about his skills, projects, experience, or anything else.",
};

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    const userMessage = message.trim();
    if (!userMessage || loading) return;

    const assistantIndex = messages.length + 1;
    setMessages((previous) => [
      ...previous,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "The AI request failed.");
      }
      if (!response.body) throw new Error("The AI response stream was unavailable.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";

      const applyLines = (lines: string[]) => {
        let addedText = "";
        let sources: ChatSource[] | undefined;
        let notice: string | undefined;
        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk = JSON.parse(line) as {
            text?: string;
            error?: string;
            sources?: ChatSource[];
            notice?: string;
          };
          if (chunk.error) throw new Error(chunk.error);
          addedText += chunk.text ?? "";
          if (chunk.sources?.length) sources = chunk.sources;
          if (chunk.notice) notice = chunk.notice;
        }

        if (addedText || sources || notice) {
          setMessages((previous) =>
            previous.map((item, index) =>
              index === assistantIndex
                ? {
                    ...item,
                    content: item.content + addedText,
                    ...(sources ? { sources } : {}),
                    ...(notice ? { notice } : {}),
                  }
                : item
            )
          );
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        pending += decoder.decode(value, { stream: !done });
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        applyLines(lines);
        if (done) break;
      }
      applyLines([pending]);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "The AI request failed. Please try again.";
      setMessages((previous) =>
        previous.map((item, index) =>
          index === assistantIndex ? { ...item, content: errorMessage } : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-chat ${chatOpen ? "open" : ""}`}>
      {chatOpen && (
        <section className="ai-chat-window" aria-label="Nabeel AI chat">
          <header className="ai-chat-header">
            <div className="ai-chat-title">
              <div className="ai-avatar" aria-hidden="true">✦</div>
              <div>
                <strong>Nabeel AI</strong>
                <span>Portfolio Assistant</span>
              </div>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="ai-chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((item, index) => (
              <div className={`chat-message ${item.role}`} key={`${index}-${item.role}`}>
                {item.notice && <span className="chat-notice">{item.notice}</span>}
                {item.content}
                {item.sources && item.sources.length > 0 && (
                  <div className="chat-sources">
                    <span>Sources</span>
                    {item.sources.map((source) => (
                      <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                        {source.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant typing" aria-label="Nabeel AI is responding">
                <span /><span /><span />
              </div>
            )}
          </div>

          <form
            className="ai-chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about Nabeel..."
              aria-label="Message Nabeel AI"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !message.trim()} aria-label="Send message">
              ↗
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="ai-chat-button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Close AI portfolio assistant" : "Open AI portfolio assistant"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? "×" : "✦"}
      </button>
    </div>
  );
}
