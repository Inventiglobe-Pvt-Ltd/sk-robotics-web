'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

const TESTIMONIALS = [
  {
    quote: 'Our students were bored with textbooks. After the VR lab, they beg to come to science class. The engagement has been nothing short of remarkable.',
    name: 'Sri. Ravi Kumar',
    role: 'Principal',
    school: 'Sri Vidya High School',
  },
  {
    quote: "I was skeptical about the cost. But SK Robotics worked within our budget, handled everything, and the parents' reaction was priceless.",
    name: 'Mrs. Sunita Reddy',
    role: 'Correspondent',
    school: 'Saraswati Vidyalayam',
  },
  {
    quote: 'This is not just a lab. It is a complete transformation of how our children relate to learning. Our district inspection team was highly impressed.',
    name: 'Sri. Mohammed Ishaq',
    role: 'School Director',
    school: 'New Generation School',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="WHAT SCHOOLS SAY"
          title="Principals Who <em>Made the Leap</em>"
          subtitle="Real feedback from school administrators across Hyderabad who have transformed their classrooms with our labs."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="h-full">
              <Card variant="glass" className="h-full flex flex-col p-8 lg:p-10">
                {/* Quote Icon */}
                <div className="text-gold mb-8 opacity-40">
                  <QuoteIcon />
                </div>

                <p className="body-large italic text-text-primary mb-10 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-border-subtle">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                    <span className="font-syne font-bold text-gold text-xs">
                      {t.name.split(' ').pop()?.[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary tracking-tight">{t.name}</h4>
                    <p className="text-[0.7rem] font-bold uppercase tracking-widest text-text-dim mt-0.5">
                      {t.role} · {t.school}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
    </svg>
  );
}
