'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function MapEmbed() {
  return (
    <section className="bg-bg-black py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="rounded-2xl overflow-hidden border border-gold-border/15">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30474.93371825!2d78.3671!3d17.2403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbb5ce87c30b3%3A0xd4a7a8a1ad41e0ca!2sShamshabad%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SK Robotics Office Location — Shamshabad, Hyderabad"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
