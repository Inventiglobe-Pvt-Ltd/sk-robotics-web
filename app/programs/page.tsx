import type { Metadata } from 'next';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramDetail from '@/components/programs/ProgramDetail';
import SubjectCoverage from '@/components/programs/SubjectCoverage';
import HomeCTA from '@/components/home/HomeCTA';
import type { ProgramData } from '@/types';

export const metadata: Metadata = {
  title: 'Programs | VR · AR · AI · Robotics for Schools',
  description:
    'Explore our four complete lab programs: VR Science Lab, AR Learning, AI & Computer Science, and Robotics — all designed for Indian schools and curriculum standards.',
};

const PROGRAMS: ProgramData[] = [
  {
    id: 'vr-science',
    icon: '🥽',
    badge: 'PROGRAM 01',
    title: 'VR Science Lab',
    description:
      "The most impactful way to teach science concepts that can't be seen with the naked eye. Students literally step inside a beating heart, zoom into a DNA strand, or witness the Big Bang — with a VR headset on in their own classroom.\n\nOur library includes 200+ simulations mapped to CBSE, ICSE, and Telangana State Board syllabi across Classes 6–12.",
    tags: ['Biology', 'Physics', 'Geography', 'History'],
    features: [
      '200+ curriculum-aligned simulations',
      'Biology, Chemistry, Physics, Earth Science, Space',
      'Works with smartphone-based VR headsets (low cost)',
      'Teacher dashboard with lesson planning tools',
      'Student progress tracking and assessment',
    ],
    equipment: 'VR headsets, content server, teacher tablet',
    image: '/images/vr-lab.jpg',
    link: '/programs#vr-science',
  },
  {
    id: 'ar-learning',
    icon: '📱',
    badge: 'PROGRAM 02',
    title: 'AR Learning Station',
    description:
      "Augmented Reality doesn't replace the classroom — it supercharges it. Using tablets or phones, students can place 3D models of molecules, ancient monuments, or mechanical engines on their desk and interact with them.\n\nNo headsets required. Works on standard Android tablets, making it the most affordable immersive tech available.",
    tags: ['Chemistry', 'Engineering', 'Mathematics'],
    features: [
      '150+ AR models across all core subjects',
      'No VR headset needed — tablet or smartphone only',
      'Multilingual content (English, Telugu, Hindi)',
      'Offline mode — works without internet',
      'Shareable student creations for parent presentations',
    ],
    equipment: 'Android tablets/stands, content library license',
    image: '/images/ar-class.jpg',
    link: '/programs#ar-learning',
  },
  {
    id: 'ai-cs',
    icon: '🤖',
    badge: 'PROGRAM 03',
    title: 'AI & Computer Science',
    description:
      "The most future-critical skill in the world is computing. Our program takes students from zero — even those who've never used a keyboard — to building real AI projects by Class 10.\n\nStructured in progressive levels: Digital Literacy → Block Coding → Python Basics → Data Science → AI Projects.",
    tags: ['Coding', 'AI Basics', 'Data Science', 'Robotics Logic'],
    features: [
      'Age-appropriate curriculum from Class 4 to Class 12',
      'Block coding (Scratch) to Python progression',
      'AI literacy — understanding how AI works and affects society',
      "Student projects displayed in annual 'Tech Expo'",
      'Certifications aligned with Google, Microsoft learn paths',
    ],
    equipment: 'Computer lab setup or tablet cart',
    image: '/images/ai-session.jpg',
    link: '/programs#ai-cs',
  },
  {
    id: 'robotics',
    icon: '⚙️',
    badge: 'PROGRAM 04',
    title: 'Robotics Lab',
    description:
      "There is no better STEM teacher than a robot that doesn't do what you told it to. Our robotics program uses hands-on kits to teach engineering thinking, electronics basics, and computational logic through building and competing.\n\nPrograms include inter-school robotics competitions to keep engagement levels sky-high all year.",
    tags: ['STEM', 'Electronics', 'Problem Solving'],
    features: [
      'Age-appropriate kits: beginner (Class 5–7), advanced (8–12)',
      'Sensors, motors, microcontrollers, basic circuits',
      'Inter-school competition calendar',
      'Connects directly to AI programming modules',
      'Annual showcase and parent demo day',
    ],
    equipment: 'Robotics kit sets, spare components, storage',
    image: '/images/robotics.jpg',
    link: '/programs#robotics',
  },
];

export default function ProgramsPage() {
  return (
    <>
      <ProgramsHero />
      {PROGRAMS.map((program, index) => (
        <ProgramDetail key={program.id} program={program} index={index} />
      ))}
      <SubjectCoverage />

      {/* CTA Section */}
      <section className="bg-bg-black py-24 md:py-32 gold-glow-overlay relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <h2 className="heading-l mb-4">
            Which programs are right for your school?
          </h2>
          <p className="body-l max-w-xl mx-auto mb-8">
            Book a free assessment and we&apos;ll recommend the perfect combination for your school.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] font-jakarta font-semibold px-8 py-4 bg-gold text-[#07070F] hover:bg-gold-bright shadow-[0_4px_24px_rgba(245,197,24,0.30)] transition-all"
            >
              Book Free Assessment
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] font-jakarta font-semibold px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.20)] text-text-primary hover:border-[rgba(255,255,255,0.50)] transition-all"
            >
              Download Full Brochure
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
