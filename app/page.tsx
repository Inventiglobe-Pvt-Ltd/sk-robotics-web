import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import ProgramCards from '@/components/home/ProgramCards';
import ImmersiveShowcase from '@/components/home/ImmersiveShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import SchoolGallery from '@/components/home/SchoolGallery';
import HomeCTA from '@/components/home/HomeCTA';

export const metadata: Metadata = {
  title: "SK Robotics & VR Science Labs | Hyderabad's #1 School EdTech",
  description:
    'Install VR, AR, AI & Robotics labs in your school. Curriculum-aligned, budget-friendly, and fully supported. Serving 50+ schools across Hyderabad. Book a free demo today.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProgramCards />
      <ImmersiveShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <SchoolGallery />
      <HomeCTA />
    </>
  );
}
