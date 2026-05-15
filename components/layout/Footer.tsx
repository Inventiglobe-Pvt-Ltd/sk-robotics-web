'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Camera, 
  Briefcase, 
  Video,
  Send
} from 'lucide-react';
import Button from '@/components/ui/Button';

import { usePathname } from 'next/navigation';

const PROGRAMS = [
  { label: 'VR Science Lab', href: '/programs#vr-science' },
  { label: 'AR Learning', href: '/programs#ar-learning' },
  { label: 'AI & CS', href: '/programs#ai-cs' },
  { label: 'Robotics Lab', href: '/programs#robotics' },
];

const COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'For Schools', href: '/for-schools' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact Us', href: '/contact' },
];

const CONTACT_INFO = [
  { icon: Mail, label: 'saikirani999@gmail.com', href: 'mailto:saikirani999@gmail.com' },
  { icon: Phone, label: '+91 85019 24576', href: 'tel:+918501924576' },
  { icon: MapPin, label: 'Shamshabad, Hyderabad', href: '#' },
];

export default function Footer() {
  const pathname = usePathname();
  
  // Hide Footer for Admin, Trainer, School and Login portals
  const isDashboard = pathname?.startsWith('/admin') || pathname?.startsWith('/trainer') || pathname?.startsWith('/school') || pathname === '/login';
  
  if (isDashboard) return null;

  return (
    <footer className="bg-bg-black border-t border-border-medium pt-24 pb-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gold/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                <span className="font-syne font-extrabold text-[#050508] text-lg leading-none">
                  SK
                </span>
              </div>
              <div>
                <div className="font-syne font-extrabold text-text-primary text-xl leading-tight group-hover:text-gold transition-colors">
                  SK Robotics
                </div>
                <div className="text-text-dim text-[0.7rem] font-jakarta leading-tight uppercase tracking-[0.2em] font-bold mt-1">
                  Next-Gen EdTech
                </div>
              </div>
            </Link>
            <p className="body-base text-text-muted mb-10 max-w-[360px] leading-relaxed">
              Transforming education through immersive visualization. We empower schools with world-class VR, AR, and Robotics labs.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: Camera, href: '#' },
                { icon: Briefcase, href: '#' },
                { icon: Video, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-bg-surface-2 border border-border-medium flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 hover:bg-bg-surface-3 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="label-caps text-text-primary mb-8 tracking-[0.2em]">Programs</h4>
            <ul className="flex flex-col gap-5">
              {PROGRAMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-text-muted hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-caps text-text-primary mb-8 tracking-[0.2em]">Company</h4>
            <ul className="flex flex-col gap-5">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-text-muted hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="label-caps text-text-primary mb-8 tracking-[0.2em]">Stay Connected</h4>
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map((item, i) => (
                <a 
                  key={i}
                  href={item.href} 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-surface-2 border border-border-medium flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-black transition-all">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[0.9375rem] text-text-muted group-hover:text-text-primary transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
              
              <div className="mt-4">
                <Button href="/contact" variant="gold-outline" size="md" className="w-full">
                  Book a Free Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-border-medium flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[0.8rem] text-text-dim font-medium">
            © 2026 SK Robotics & VR Science Labs. All rights reserved.
          </p>
          <div className="flex gap-10 text-[0.8rem] font-bold text-text-dim uppercase tracking-widest">
            <Link href="#" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gold transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
