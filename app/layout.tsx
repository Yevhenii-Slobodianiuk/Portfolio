import type { Metadata } from "next";
import "../styles/reset.css";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Yevhenii Slobodianiuk | Fullstack Developer",
  description:
    "Yevhenii Slobodianiuk — Fullstack developer with 2 years of experience. React, TypeScript, Node.js, Next.js.",
  keywords: [
    "Yevhenii Slobodianiuk",
    "Євгеній Слободянюк",
    "fullstack developer",
    "react developer",
    "web developer portfolio",
  ],
  authors: [{ name: "Yevhenii Slobodianiuk" }],
  openGraph: {
    title: "Yevhenii Slobodianiuk | Fullstack Developer",
    description: "Portfolio of Yevhenii Slobodianiuk — Fullstack developer",
    url: "https://yevhenii-slobodianiyk-portfolio.vercel.app/",
    siteName: "Yevhenii Slobodianiuk Portfolio",
    images: [{ url: "/images/image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yevhenii Slobodianiuk | Fullstack Developer",
    description: "Portfolio of Yevhenii Slobodianiuk — Fullstack developer",
    images: ["/images/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Yevhenii Slobodianiuk",
            jobTitle: "Fullstack Developer",
            url: "https://yevhenii-slobodianiyk-portfolio.vercel.app",
            sameAs: [
              "https://github.com/Yevhenii-Slobodianiuk",
              "https://www.linkedin.com/in/yevhenii-s-7821a5263/",
            ],
          }),
        }}
      />
    </html>
  );
}
