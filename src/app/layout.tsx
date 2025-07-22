import type { Metadata } from "next";
import { Orbitron, Fira_Code } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"]
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Lineekela Shinavene - Digital Evolution Portfolio",
  description: "Immersive tech portfolio showcasing software development, creative technology, and digital innovation. Experience the journey from logic gates to innovation.",
  keywords: "software developer, web development, react, next.js, three.js, creative technology, namibia developer",
  authors: [{ name: "Lineekela Shinavene" }],
  openGraph: {
    title: "Lineekela Shinavene - Digital Evolution",
    description: "Interactive 3D portfolio with immersive scroll experience",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${firaCode.variable}`}>
      <body className="font-fira antialiased">
        {children}
      </body>
    </html>
  );
}
