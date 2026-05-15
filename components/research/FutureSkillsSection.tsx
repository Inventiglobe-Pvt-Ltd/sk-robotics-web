'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { Cpu, Rocket, Puzzle, Code, Globe, MessageSquare } from 'lucide-react';

const SKILLS = [
  { icon: Cpu, name: 'Robotics & Automation', level: 95 },
  { icon: Code, name: 'AI & Computational Literacy', level: 90 },
  { icon: Puzzle, name: 'Complex Problem Solving', level: 85 },
  { icon: Rocket, name: 'Creative Innovation', level: 92 },
  { icon: Globe, name: 'Digital Citizenship', level: 88 },
  { icon: MessageSquare, name: 'Collaborative Logic', level: 90 },
];

export default function FutureSkillsSection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeader
              badge="FUTURE READINESS"
              title="Equipping Students for the <em>Intelligence Age</em>"
              subtitle="Beyond traditional subjects, our research identifies critical skills required for the 2030 global workforce."
              align="left"
            />
            
            <div className="space-y-10 mt-12">
              <p className="body-large text-text-secondary">
                The rapid integration of AI and Robotics into every industry means education must pivot from rote learning to high-level system thinking.
              </p>
              
              <div className="flex flex-col gap-6">
                 {[
                   'Critical thinking in the age of generative AI',
                   'Hands-on engineering logic through robotics',
                   'Immersive data visualization and analysis'
                 ].map((text, i) => (
                   <div key={i} className="flex gap-4 items-center group">
                      <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(245,197,24,0.5)] group-hover:scale-150 transition-transform" />
                      <span className="text-lg font-medium text-text-primary">{text}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {SKILLS.map((skill, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full hover:bg-bg-surface-2 transition-colors border-white/5 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <skill.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h4 className="font-syne font-bold text-sm text-text-primary tracking-tight">
                      {skill.name}
                    </h4>
                  </div>
                  
                  {/* Skill Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[0.6rem] uppercase font-bold tracking-widest text-text-dim">
                       <span>Proficiency</span>
                       <span>{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gold"
                       />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
