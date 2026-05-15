import type { Metadata } from 'next';
import ForSchoolsHero from '@/components/for-schools/ForSchoolsHero';
import WhatSchoolsGet from '@/components/for-schools/WhatSchoolsGet';
import PartnerProcess from '@/components/for-schools/PartnerProcess';
import Requirements from '@/components/for-schools/Requirements';
import SchoolFAQ from '@/components/for-schools/SchoolFAQ';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'For Schools | Partner with SK Robotics Hyderabad',
  description:
    "Everything your school needs to say yes to VR, AR, AI & Robotics labs. From cost to space to teacher training — we've got you covered.",
};

const PARTNER_SCHOOLS = [
  'Sri Vidya High School',
  'Saraswati Vidyalayam',
  'New Generation School',
  'Hyderabad Public School',
  'Modern English Medium School',
  'Shamshabad Vidyanikethan',
];

export default function ForSchoolsPage() {
  return (
    <>
      <ForSchoolsHero />
      <WhatSchoolsGet />
      <PartnerProcess />
      <Requirements />
      <SchoolFAQ />

      {/* Social Proof Strip */}
      <section className="bg-bg-black py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {PARTNER_SCHOOLS.map((school) => (
              <span
                key={school}
                className="text-xs font-jakarta font-medium text-text-muted border border-gold-border rounded-full px-4 py-2"
              >
                {school}
              </span>
            ))}
            <span className="text-xs font-jakarta font-semibold text-gold border border-gold-border rounded-full px-4 py-2">
              + 44 more schools
            </span>
          </div>
          <p className="text-text-dim text-sm font-jakarta">
            Schools currently partnered with SK Robotics
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-bg-surface py-24 md:py-32 gold-glow-overlay relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <h2 className="heading-l mb-4">
            Take the First Step — It&apos;s Free
          </h2>
          <p className="body-l max-w-xl mx-auto mb-8">
            Schedule your school&apos;s free lab demonstration today.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] font-jakarta font-semibold px-10 py-4 bg-gold text-[#07070F] hover:bg-gold-bright shadow-[0_4px_24px_rgba(245,197,24,0.30)] transition-all text-lg"
          >
            Book Free Demo at My School
          </a>
        </div>
      </section>
    </>
  );
}
