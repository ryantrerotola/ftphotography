import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Francesca Trerotola Photography | Southern Maine Portrait & Lifestyle Photographer",
    template: "%s | Francesca Trerotola Photography",
  },
  description:
    "Capturing authentic joy, love, and laughter in Southern Maine. Specializing in family portraits, weddings, engagements, senior portraits, headshots, and pet photography. Based in Cumberland, ME — serving all of New England.",
  keywords: [
    "Maine photographer",
    "Southern Maine photography",
    "Cumberland Maine photographer",
    "family photographer Maine",
    "wedding photographer Maine",
    "portrait photographer",
    "lifestyle photography",
    "engagement photographer Maine",
    "senior portraits Maine",
    "pet photographer Maine",
    "headshot photographer Maine",
    "New England photographer",
  ],
  openGraph: {
    title: "Francesca Trerotola Photography",
    description:
      "Capturing authentic joy, love, and laughter in Southern Maine. Family portraits, weddings, engagements, and more.",
    url: "https://www.francescatrerotolaphotography.com",
    siteName: "Francesca Trerotola Photography",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francesca Trerotola Photography",
    description:
      "Capturing authentic joy, love, and laughter in Southern Maine.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
