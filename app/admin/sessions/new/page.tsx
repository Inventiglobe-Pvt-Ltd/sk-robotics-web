'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { Save, Clock, Users, BookOpen } from 'lucide-react';

export default function NewSessionPage() {
  const [formData, setFormData] = useState({
    schoolId: '',
    class: '',
    section: '',
    topicTitle: '',
    topicDescription: '',
    totalStudents: '',
    presentCount: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving session...', formData);
    // Add API call here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-syne font-extrabold text-text-primary mb-2">New VR Session</h1>
        <p className="text-text-muted">Record today's immersive learning impact.</p>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-[2.5rem] border-white/5 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School & Class */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Select School</label>
                <select 
                  className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none transition-all text-text-primary appearance-none"
                  value={formData.schoolId}
                  onChange={(e) => setFormData({...formData, schoolId: e.target.value})}
                >
                  <option value="">Choose School...</option>
                  <option value="1">Global International School</option>
                  <option value="2">Vikas Vidhyalaya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Class</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5th"
                    className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Section</label>
                  <input 
                    type="text" 
                    placeholder="e.g. A"
                    className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Total Strength</label>
                  <div className="relative">
                    <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input 
                      type="number" 
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                      value={formData.totalStudents}
                      onChange={(e) => setFormData({...formData, totalStudents: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Present</label>
                  <input 
                    type="number" 
                    className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                    value={formData.presentCount}
                    onChange={(e) => setFormData({...formData, presentCount: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input 
                      type="time" 
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">End Time</label>
                  <input 
                    type="time" 
                    className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Topic Section */}
          <div className="space-y-6 pt-10 border-t border-white/5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Topic Title</label>
              <div className="relative">
                <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input 
                  type="text" 
                  placeholder="e.g. Life Cycle of a Butterfly"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary"
                  value={formData.topicTitle}
                  onChange={(e) => setFormData({...formData, topicTitle: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-dim px-2">Topic Description / Key Concepts</label>
              <textarea 
                rows={4}
                placeholder="Describe what students learned..."
                className="w-full px-6 py-4 rounded-2xl bg-bg-surface-2 border border-border-medium focus:border-gold/50 outline-none text-text-primary resize-none"
                value={formData.topicDescription}
                onChange={(e) => setFormData({...formData, topicDescription: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" variant="primary" className="px-12 py-5 flex items-center gap-3">
              <Save className="w-5 h-5" />
              Save Session Data
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
