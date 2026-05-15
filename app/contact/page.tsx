import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactMethods from '@/components/contact/ContactMethods';
import MapEmbed from '@/components/contact/MapEmbed';

export const metadata: Metadata = {
  title: 'Contact & Book Demo | +91 8501924576',
  description:
    'Contact SK Robotics to book a free VR lab demo at your school. Call +91 8501924576 or fill the form. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Contact Layout: Form + Info */}
      <section className="bg-bg-black py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
            <ContactForm />
            <ContactMethods />
          </div>
        </div>
      </section>

      <MapEmbed />
    </>
  );
}
