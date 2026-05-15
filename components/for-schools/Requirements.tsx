'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Requirements() {
  return (
    <section className="bg-bg-black py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <SectionHeader
          badge="REQUIREMENTS"
          title="What Your School <em>Needs</em>"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-bg-surface-2 rounded-2xl p-6 md:p-8 border border-[rgba(255,255,255,0.06)]">
            <h3 className="heading-s mb-5">Minimum Requirements</h3>

            <div className="space-y-3 mb-8">
              {[
                { yes: true, text: 'One dedicated room (min 20×15 ft) OR shared lab space' },
                { yes: true, text: 'Standard electrical supply (no special wiring)' },
                { yes: true, text: 'At least one teacher willing to be the lab coordinator' },
                { yes: false, text: 'No special internet required (offline content available)' },
                { yes: false, text: 'No civil renovation or construction needed' },
                { yes: false, text: 'No dedicated IT staff needed' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 body-m">
                  <span className={`mt-0.5 shrink-0 ${item.yes ? 'text-success' : 'text-text-dim'}`}>
                    {item.yes ? '✓' : '✗'}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(255,255,255,0.06)] pt-6">
              <h4 className="text-text-primary font-jakarta font-semibold text-sm mb-4">
                Schools of all types welcome:
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Government schools',
                  'Private aided schools',
                  'Private unaided schools',
                  'International schools',
                  'Residential schools',
                ].map((type) => (
                  <span
                    key={type}
                    className="text-xs font-jakarta font-medium text-text-muted bg-bg-surface-3 rounded-full px-3 py-1.5 border border-[rgba(255,255,255,0.06)]"
                  >
                    ✓ {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
