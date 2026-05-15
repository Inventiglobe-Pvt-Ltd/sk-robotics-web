'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function TrainerRoot() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/trainer/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-gold animate-spin" />
    </div>
  );
}
