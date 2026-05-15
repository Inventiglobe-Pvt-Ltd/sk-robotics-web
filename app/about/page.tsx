import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import VisionMissionSection from '@/components/about/VisionMissionSection';
import HistorySection from '@/components/about/HistorySection';
import GoalsSection from '@/components/about/GoalsSection';
import SupportersSection from '@/components/about/SupportersSection';
import FounderSection from '@/components/about/FounderSection';
import FutureEducationCTA from '@/components/about/FutureEducationCTA';

export const metadata: Metadata = {
  title: 'About Us | Our Vision & Journey',
  description: 'Learn about SK Robotics & VR Science Labs - our mission to revolutionize education through immersive technology, robotics, and VR.',
};

export default function AboutPage() {
  return (
    <main className="bg-bg-black">
      <AboutHero />
      <VisionMissionSection />
      <HistorySection />
      <GoalsSection />
      <SupportersSection />
      <FounderSection />
      <FutureEducationCTA />
    </main>
  );
}
