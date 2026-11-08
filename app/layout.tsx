import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Diwali | Kiran Parikh & Family",
  description:
    "A stunning, personalized Happy Diwali celebration website with realistic fireworks, glowing diyas, and warm festive wishes from Kiran Parikh & Family.",
  keywords: [
    "Diwali",
    "Deepavali",
    "Kiran Parikh",
    "Diwali Greeting",
    "Festival of Lights",
    "Happy Diwali",
  ],
  authors: [{ name: "Kiran Parikh & Family" }],
  openGraph: {
    title: "Happy Diwali | Kiran Parikh & Family",
    description:
      "May your life shine brighter than a thousand diyas. Experience a magical personalized Diwali greeting!",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23160B2D'/><path d='M16 6 C14 12 10 16 10 20 C10 23 12.5 25 16 25 C19.5 25 22 23 22 20 C22 16 18 12 16 6 Z' fill='%23FFD700'/><path d='M6 22 Q16 26 26 22 C25 29 7 29 6 22 Z' fill='%23FF6B00'/></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#080B1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080B1A] text-white antialiased overflow-x-hidden selection:bg-diwali-royalGold selection:text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
