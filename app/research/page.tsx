import type { Metadata } from 'next';
import ResearchHero from '@/components/research/ResearchHero';
import ResearchStats from '@/components/research/ResearchStats';
import ResearchInsights from '@/components/research/ResearchInsights';
import FutureSkillsSection from '@/components/research/FutureSkillsSection';
import InnovationTimeline from '@/components/research/InnovationTimeline';
import ResearchCTA from '@/components/research/ResearchCTA';

export const metadata: Metadata = {
  title: 'Research & Innovation | Educational Impact',
  description: 'Evidence-based research on the impact of VR, AR, and Robotics in modern education. Explore learning retention data and future skills readiness.',
};

export default function ResearchPage() {
  return (
    <main className="bg-bg-black">
      <ResearchHero />
      
      {/* Evidence Sections */}
      <ResearchStats />
      <ResearchInsights />
      
      {/* Transformation Storytelling */}
      <InnovationTimeline />
      
      {/* Future Skills Analysis */}
      <FutureSkillsSection />
      
      {/* Final Wrap */}
      <ResearchCTA />
    </main>
  );
}
