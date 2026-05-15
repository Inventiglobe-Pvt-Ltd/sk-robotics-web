'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const GALLERY_ITEMS = [
  { caption: 'VR Science Exploration', icon: '🥽' },
  { caption: 'AR Biology Session', icon: '📱' },
  { caption: 'Robotics Workshop', icon: '⚙️' },
  { caption: 'AI Coding Lab', icon: '🤖', featured: true },
  { caption: 'Interactive Learning', icon: '🎓' },
  { caption: 'Teacher Certification', icon: '👩‍🏫' },
];

export default function SchoolGallery() {
  return (
    <section className="bg-bg-black section-spacing">
      <div className="section-container">
        <SectionHeader
          badge="IN ACTION"
          title="See the Labs <em>Come to Life</em>"
          subtitle="A glimpse into the transformed classrooms where students are engaging with the technology of tomorrow."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-[2rem] border border-border-subtle bg-bg-surface ${
                item.featured ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.05] ${
                  item.featured ? 'aspect-[21/9]' : 'aspect-square'
                }`}
              >
                {/* Placeholder content - will be replaced by actual photos */}
                <div className="text-center p-8">
                  <div className="text-5xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Cinematic caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="glass-panel p-4 rounded-2xl border-white/10">
                  <p className="text-sm font-bold tracking-tight text-text-primary">
                    {item.caption}
                  </p>
                  <p className="text-[0.7rem] text-text-muted mt-1 uppercase tracking-widest font-jakarta">
                    Live Session
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
