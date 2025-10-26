import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Private Blood Tests London | Advanced Biomarker Analysis | The Wellness",
  description: "Book private blood tests in London with results in 4-24 hours. Lifestyle, Hormone & Executive panels from £400. Expert analysis, same-day appointments available.",
  keywords: ["private blood tests London", "blood testing", "biomarker analysis", "health screening", "hormone testing", "private GP blood tests", "same day blood test results", "executive health check", "comprehensive blood panel", "preventative health"],
  authors: [{ name: "The Wellness London" }],
  creator: "The Wellness London",
  publisher: "The Wellness London",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://bloodtests.thewellnesslondon.com',
    siteName: 'The Wellness London - Blood Tests',
    title: 'Private Blood Tests London | Advanced Biomarker Analysis',
    description: 'Book private blood tests in London with results in 4-24 hours. Lifestyle, Hormone & Executive panels from £400. Expert analysis, same-day appointments.',
    images: [
      {
        url: 'https://bloodtests.thewellnesslondon.com/images/bloods/1.jpg',
        width: 1200,
        height: 630,
        alt: 'The Wellness London - Private Blood Testing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Blood Tests London | Advanced Biomarker Analysis',
    description: 'Book private blood tests with results in 4-24 hours. From £400. Expert analysis, same-day appointments.',
    images: ['https://bloodtests.thewellnesslondon.com/images/bloods/1.jpg'],
    creator: '@thewellnesslondon',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: 'https://bloodtests.thewellnesslondon.com',
  },
  verification: {
    google: '', // Add Google Search Console verification code later
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
