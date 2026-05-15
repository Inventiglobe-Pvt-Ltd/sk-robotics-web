import '../globals.css';
import { Syne, Inter } from 'next/font/google';
import TrainerSidebar from '@/components/trainer/TrainerSidebar';
import TrainerTopbar from '@/components/trainer/TrainerTopbar';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${syne.variable} ${inter.variable} font-inter bg-bg-black min-h-screen text-text-primary selection:bg-gold/30 flex`}>
      <TrainerSidebar />
      <div className="flex-1 ml-72 flex flex-col">
        <TrainerTopbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
