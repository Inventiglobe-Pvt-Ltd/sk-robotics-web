'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Image from 'next/image';

const SUPPORTERS = [
  {
    name: "Dr. Ramesh Kumar",
    role: "Principal",
    school: "Global International School",
    image: "/images/placeholder-profile.png", // Using a placeholder strategy
    quote: "SK Robotics has changed how our students perceive complex physics concepts."
  },
  {
    name: "Mrs. Shanthi Priya",
    role: "Academic Director",
    school: "Vikas Group of Institutions",
    image: "/images/placeholder-profile.png",
    quote: "The VR Science Lab is the most popular part of our campus today."
  },
  {
    name: "Mr. Venkatesh Rao",
    role: "Chairman",
    school: "Heritage Valley School",
    image: "/images/placeholder-profile.png",
    quote: "A visionary step towards future-proofing our education system."
  }
];

export default function SupportersSection() {
  return (
    <section className="bg-bg-black section-spacing relative">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="OUR SUPPORTERS"
          title="Collaborating with <em>Visionary Educators</em>"
          subtitle="We are proud to be supported by school leaders and academic institutions who believe in transforming education through innovation."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {SUPPORTERS.map((supporter, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="h-full flex flex-col items-center text-center p-10 group overflow-hidden">
                {/* Image Area with Glow */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gold to-blue-500 p-0.5 relative z-10 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-bg-surface-2 flex items-center justify-center overflow-hidden">
                      {/* Placeholder for Profile */}
                      <div className="w-full h-full bg-bg-surface-3 flex items-center justify-center text-gold/30">
                        <span className="font-syne font-bold text-xs uppercase tracking-widest">Profile</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gold/20 blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-syne font-extrabold text-text-primary mb-2 group-hover:text-gold transition-colors">
                    {supporter.name}
                  </h3>
                  <p className="label-caps text-[0.6rem] mb-6 text-gold/60">
                    {supporter.role} • {supporter.school}
                  </p>
                  
                  <p className="body-base text-text-muted italic leading-relaxed">
                    "{supporter.quote}"
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Supporter Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[2.5rem] bg-gradient-to-r from-bg-surface-2 to-bg-surface-3 border border-border-medium text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,197,24,0.05),transparent)] pointer-events-none" />
          <p className="text-2xl font-syne font-bold text-text-primary max-w-3xl mx-auto relative z-10 leading-relaxed">
            "Together, we are building a stronger educational ecosystem that inspires innovation and empowers the next generation."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
