import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Chapa Azul | A escola em movimento";
const description =
  "Conheça as propostas, eventos, campeonatos e ideias da Chapa Azul para transformar a escola com a participação de todos.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0].trim();
  const requestHost = forwardedHost || requestHeaders.get("host") || "localhost:3000";
  const safeHost = /^[a-z0-9.-]+(?::\d+)?$/i.test(requestHost)
    ? requestHost
    : "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol === "http" || safeHost.startsWith("localhost")
    ? "http"
    : "https";
  const origin = `${protocol}://${safeHost}`;

  return {
    title,
    description,
    applicationName: "Chapa Azul",
    keywords: [
      "Chapa Azul",
      "grêmio estudantil",
      "escola",
      "eventos",
      "gincanas",
    ],
    openGraph: {
      title,
      description,
      siteName: "Chapa Azul",
      type: "website",
      locale: "pt_BR",
      url: origin,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
