import type { Metadata } from 'next';
import { syne, jakarta } from '@/lib/fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/layout/WhatsAppFAB';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "SK Robotics & VR Science Labs | Hyderabad's #1 School EdTech",
    template: '%s | SK Robotics & VR Science Labs',
  },
  description:
    'Install VR, AR, AI & Robotics labs in your school. Curriculum-aligned, budget-friendly, and fully supported. Serving 50+ schools across Hyderabad. Book a free demo today.',
  keywords: [
    'VR lab for schools Hyderabad',
    'robotics lab school India',
    'AR education',
    'AI for students',
    'EdTech Hyderabad',
    'STEM lab school',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://skrobotics.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SK Robotics & VR Science Labs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness'],
              name: 'SK Robotics & VR Science Labs',
              telephone: '+918501924576',
              email: 'saikirani999@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Shamshabad',
                addressRegion: 'Telangana',
                addressCountry: 'IN',
              },
              url: 'https://skrobotics.in',
              description:
                'EdTech company installing VR, AR, AI and Robotics labs in K-12 schools across Hyderabad',
            }),
          }}
        />
      </head>
      <body className="font-jakarta antialiased bg-bg-black text-text-primary">
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
