'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Programs', href: '/programs' },
  { label: 'Research', href: '/research' },
  { label: 'For Schools', href: '/for-schools' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide Navbar for Admin, Trainer, School and Login portals
  const isDashboard = pathname?.startsWith('/admin') || pathname?.startsWith('/trainer') || pathname?.startsWith('/school') || pathname === '/login';
  
  if (isDashboard) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled ? 'py-4' : 'py-8'
        )}
      >
        <div className="section-container">
          <nav 
            className={cn(
              'flex items-center justify-between px-8 h-20 rounded-[2rem] transition-all duration-700',
              scrolled 
                ? 'glass-panel bg-bg-black/40 border-white/10' 
                : 'bg-transparent border-transparent'
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group relative z-50">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(245,197,24,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <span className="font-syne font-extrabold text-[#050508] text-sm leading-none">
                    SK
                  </span>
                </div>
                <div className="absolute inset-0 bg-gold blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <div className="hidden sm:block">
                <span className="font-syne font-extrabold text-text-primary text-[1.1rem] tracking-tight group-hover:text-gold transition-colors duration-300">
                  SK Robotics
                </span>
                <p className="text-[0.6rem] uppercase font-bold tracking-[0.2em] text-text-dim group-hover:text-gold/50 transition-colors">
                  Next-Gen EdTech
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[0.85rem] font-jakarta font-extrabold tracking-widest uppercase transition-colors py-2 px-1',
                    pathname === link.href
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {pathname === link.href && (
                    <motion.span 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button 
                href="/contact" 
                size="sm" 
                className="bg-[#6B21A8] hover:bg-[#581C87] text-white border-none px-6 py-2 rounded-lg font-bold shadow-none"
              >
                Buy Now
              </Button>
              <Link 
                href="/login" 
                className="px-6 py-2 border-2 border-[#6B21A8] text-[#6B21A8] rounded-lg font-bold text-sm hover:bg-[#6B21A8] hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center glass-panel rounded-xl border-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-black/98 backdrop-blur-3xl md:hidden flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-5xl font-syne font-extrabold transition-colors flex items-center justify-between group',
                      pathname === link.href ? 'text-gold' : 'text-text-primary'
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-12 border-t border-border-medium"
              >
                <div className="flex flex-col gap-4">
                  <Button href="/contact" size="lg" className="w-full bg-[#6B21A8] hover:bg-[#581C87] text-white">
                    Buy Now
                  </Button>
                  <Link 
                    href="/login"
                    className="w-full py-5 rounded-3xl border-2 border-[#6B21A8] text-[#6B21A8] font-bold text-center hover:bg-[#6B21A8] hover:text-white transition-all"
                  >
                    Sign In
                  </Link>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[0.65rem] uppercase font-bold text-text-dim tracking-widest mb-1">Email Us</p>
                    <p className="text-sm font-semibold">saikirani999@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase font-bold text-text-dim tracking-widest mb-1">Call Us</p>
                    <p className="text-sm font-semibold">+91 85019 24576</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
