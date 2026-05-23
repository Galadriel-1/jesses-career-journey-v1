import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Watermark } from "@/components/Watermark";
import resume from "@/data/resume.json";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  resume.summary.length > 155
    ? resume.summary.slice(0, 152).trimEnd() + "..."
    : resume.summary;

export const metadata: Metadata = {
  title: `${resume.name} · ${resume.headline}`,
  description,
  openGraph: {
    title: `${resume.name} · ${resume.headline}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} · ${resume.headline}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Watermark />
      </body>
    </html>
  );
}
