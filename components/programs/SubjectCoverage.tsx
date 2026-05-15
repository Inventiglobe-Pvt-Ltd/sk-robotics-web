'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const SUBJECTS = [
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Computer Science',
  'History / Geography',
  'Engineering Design',
  'Environmental Science',
];

const PROGRAMS_COLS = ['VR Lab', 'AR Learning', 'AI & CS', 'Robotics'];

const COVERAGE: Record<string, boolean[]> = {
  'Physics': [true, true, false, true],
  'Chemistry': [true, true, false, false],
  'Biology': [true, true, false, false],
  'Mathematics': [false, true, true, true],
  'Computer Science': [false, false, true, true],
  'History / Geography': [true, true, false, false],
  'Engineering Design': [false, false, true, true],
  'Environmental Science': [true, true, false, false],
};

export default function SubjectCoverage() {
  return (
    <section className="bg-bg-black section-spacing">
      <div className="section-container">
        <SectionHeader
          badge="COVERAGE"
          title="What Each Program <em>Covers</em>"
          subtitle="A comprehensive map of subject integration across our four core EdTech programs."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="relative"
        >
          {/* Subtle glow behind table */}
          <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="glass-panel rounded-[2rem] overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-border-medium bg-white/[0.02]">
                    <th className="text-left p-6 label-caps text-text-dim sticky left-0 bg-bg-surface-2 lg:bg-transparent z-10 backdrop-blur-xl">
                      Core Subject
                    </th>
                    {PROGRAMS_COLS.map((col) => (
                      <th
                        key={col}
                        className="text-center p-6 label-caps text-gold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {SUBJECTS.map((subject) => (
                    <tr
                      key={subject}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-6 text-[0.95rem] font-bold text-text-primary tracking-tight sticky left-0 bg-bg-surface-2 lg:bg-transparent z-10 backdrop-blur-xl">
                        {subject}
                      </td>
                      {COVERAGE[subject].map((covered, j) => (
                        <td key={j} className="text-center p-6">
                          {covered ? (
                            <div className="flex justify-center">
                              <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/30">
                                <CheckIcon />
                              </div>
                            </div>
                          ) : (
                            <span className="text-text-dim/40">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
