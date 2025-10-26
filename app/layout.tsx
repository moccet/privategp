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
  title: "Private GP London | Same Day Appointments | GMC Registered Doctors | The Wellness",
  description: "Private GP in London with same-day appointments. GMC registered doctors available for in-person, video & telephone consultations. Prescriptions & referrals. Book online.",
  keywords: [
    "private GP London",
    "private doctor London",
    "same day GP appointment",
    "private GP near me",
    "GMC registered doctor",
    "private medical consultation",
    "video GP consultation",
    "telephone doctor appointment",
    "online GP appointment",
    "home visit doctor London",
    "urgent GP appointment",
    "private GP Chelsea",
    "private doctor Kensington",
    "private GP Mayfair",
    "private GP Canary Wharf",
    "private doctor City of London",
    "private prescription London",
    "GP referral letter",
    "fit note private doctor",
    "sick note GP London",
    "medical certificate London",
    "same day private doctor appointment",
    "private GP without NHS referral",
    "instant GP consultation London",
    "24 hour private doctor",
    "express medical consultation",
    "chronic disease management",
    "health check up London",
    "medical advice London",
    "second opinion doctor",
  ],
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
    siteName: 'The Wellness London - Private GP',
    title: 'Private GP London | Same Day Appointments | GMC Registered | The Wellness',
    description: 'Private GP in London with same-day appointments. GMC registered doctors for comprehensive medical care, prescriptions & specialist referrals.',
    images: [
      {
        url: 'https://bloodtests.thewellnesslondon.com/images/gp/1.jpeg',
        width: 1200,
        height: 630,
        alt: 'The Wellness London - Private GP Consultation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private GP London | Same Day Appointments | GMC Registered',
    description: 'Private GP with same-day appointments. GMC registered doctors for in-person, video & telephone consultations. Book online.',
    images: ['https://bloodtests.thewellnesslondon.com/images/gp/1.jpeg'],
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
