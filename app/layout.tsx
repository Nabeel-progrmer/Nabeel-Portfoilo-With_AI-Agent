import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabeel Faisal | MERN Stack Developer",
  description:
    "Explore Nabeel Faisal's web development projects, skills and experience in MERN stack development, AI and prompt engineering.",
  openGraph: {
    title: "Nabeel Faisal | MERN Stack Developer",
    description:
      "Web developer building modern full-stack applications and AI-powered experiences.",
    siteName: "Nabeel Faisal Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
