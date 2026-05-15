'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    question: 'How much does it cost?',
    answer:
      "Every school receives a customized quote based on program selection, student count, and infrastructure. We offer flexible EMI and government scheme-compatible pricing to fit all budgets.",
  },
  {
    question: 'What happens if equipment gets damaged?',
    answer:
      "Operational wear and tear is covered under our annual maintenance agreement. For major damage, we provide rapid assessment and repair services to minimize downtime.",
  },
  {
    question: 'Do teachers need technical skills?',
    answer:
      "No. We provide end-to-end training and simple operational guides. Our on-site trainers visit regularly to handle the technical complexities so teachers can focus on pedagogy.",
  },
  {
    question: 'How does the content stay current?',
    answer:
      "Our content library is updated twice annually to align with the latest CBSE, ICSE, and State Board curriculum changes. These updates are pushed automatically to your lab.",
  },
  {
    question: 'Can parents see the lab?',
    answer:
      'Yes. We actively help organize "Parent Demo Days" and open house events to showcase your school’s technological leadership to the community.',
  },
  {
    question: 'Is there a trial period?',
    answer:
      'We offer a free on-site demonstration for school leadership and board members before any commitment is made. This allows you to experience the impact firsthand.',
  },
];

export default function SchoolFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="FAQ"
          title="Common Questions, <em>Clear Answers</em>"
          subtitle="Everything you need to know about partnering with SK Robotics for your school’s technological transformation."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={fadeUp}
              className={cn(
                "rounded-[1.5rem] border transition-all duration-500 overflow-hidden",
                openIndex === i 
                  ? "bg-bg-surface-2 border-gold/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer group"
              >
                <span className={cn(
                  "font-syne font-bold text-lg tracking-tight transition-colors duration-300",
                  openIndex === i ? "text-gold" : "text-text-primary group-hover:text-gold"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500",
                  openIndex === i ? "border-gold bg-gold text-[#050508] rotate-45" : "border-white/10 text-text-muted"
                )}>
                  <PlusIcon />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 md:pb-10">
                      <p className="body-base text-text-secondary leading-relaxed border-t border-white/5 pt-6">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
