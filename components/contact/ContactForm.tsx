'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  schoolName: z.string().min(2, 'School name is required'),
  phone: z.string().min(10, 'Valid phone number required').max(15, 'Phone number too long'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  location: z.string().min(2, 'Location is required'),
  totalStudents: z.string().optional(),
  classesServed: z.string().optional(),
  programs: z.array(z.string()),
  message: z.string().optional(),
  heardFrom: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const PROGRAM_OPTIONS = [
  'VR Science Lab',
  'AR Learning',
  'AI & CS',
  'Robotics',
];

const CLASSES_OPTIONS = [
  'Class 1–5',
  'Class 1–8',
  'Class 1–10',
  'Class 1–12',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programs: [],
    },
  });

  const selectedPrograms = watch('programs') || [];

  const toggleProgram = (program: string) => {
    const current = selectedPrograms;
    if (current.includes(program)) {
      setValue('programs', current.filter((p) => p !== program));
    } else {
      setValue('programs', [...current, program]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full"
      >
        <Card variant="featured" className="p-12 text-center h-full flex flex-col items-center justify-center border-success/20 bg-success/[0.02]">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-4xl mb-8 border border-success/30">
            ✓
          </div>
          <h3 className="heading-card text-success mb-4">Submission Received</h3>
          <p className="body-base text-text-secondary mb-10 max-w-sm">
            Thank you for reaching out. Our education specialist will call you 
            within 24 business hours to schedule your demonstration.
          </p>
          <Button onClick={() => setStatus('idle')} variant="secondary">
            Send Another Inquiry
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card variant="glass" className="p-8 md:p-12">
        <h3 className="heading-card mb-8">Inquiry Form</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label-caps text-[0.65rem] text-text-dim">Contact Person *</label>
              <input
                {...register('name')}
                placeholder="Principal / Director Name"
                className="form-input"
              />
              {errors.name && <p className="text-error text-[0.7rem] font-bold">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="label-caps text-[0.65rem] text-text-dim">School Name *</label>
              <input
                {...register('schoolName')}
                placeholder="Full Registered Name"
                className="form-input"
              />
              {errors.schoolName && <p className="text-error text-[0.7rem] font-bold">{errors.schoolName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label-caps text-[0.65rem] text-text-dim">Phone Number *</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+91 00000 00000"
                className="form-input"
              />
              {errors.phone && <p className="text-error text-[0.7rem] font-bold">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="label-caps text-[0.65rem] text-text-dim">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="school@example.com"
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-caps text-[0.65rem] text-text-dim">Location / Area *</label>
            <input
              {...register('location')}
              placeholder="e.g. LB Nagar, Hyderabad"
              className="form-input"
            />
            {errors.location && <p className="text-error text-[0.7rem] font-bold">{errors.location.message}</p>}
          </div>

          <div className="space-y-4 pt-4">
            <p className="label-caps text-[0.65rem] text-text-dim">Programs of Interest</p>
            <div className="flex flex-wrap gap-3">
              {PROGRAM_OPTIONS.map((program) => (
                <button
                  key={program}
                  type="button"
                  onClick={() => toggleProgram(program)}
                  className={`text-[0.7rem] font-bold uppercase tracking-widest px-5 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                    selectedPrograms.includes(program)
                      ? 'bg-gold border-gold text-[#050508]'
                      : 'bg-white/[0.03] border-white/5 text-text-muted hover:border-white/20'
                  }`}
                >
                  {program}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <label className="label-caps text-[0.65rem] text-text-dim">Additional Message</label>
            <textarea
              {...register('message')}
              placeholder="Tell us about your specific requirements..."
              rows={4}
              className="form-input resize-none"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              loading={status === 'loading'}
              className="w-full"
              size="lg"
            >
              Submit Inquiry &amp; Book Demo
            </Button>
          </div>

          {status === 'error' && (
            <p className="text-error text-[0.8rem] text-center font-bold">
              Transmission failed. Please call us at +91 85019 24576
            </p>
          )}

          <p className="text-text-dim text-[0.65rem] text-center uppercase tracking-widest font-bold">
            🔒 Secure &amp; Confidential Submission
          </p>
        </form>
      </Card>
    </motion.div>
  );
}
