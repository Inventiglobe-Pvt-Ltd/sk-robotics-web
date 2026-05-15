import { NextResponse } from 'next/server';

// Zod v4 uses a slightly different import pattern
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  schoolName: z.string().min(2, 'School name is required'),
  phone: z.string().min(10, 'Valid phone number required').max(15),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  location: z.string().min(2, 'Location is required'),
  totalStudents: z.number().optional(),
  classesServed: z.string().optional(),
  programs: z.array(z.string()),
  message: z.string().optional(),
  heardFrom: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      // Dynamic import of Resend
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      // Send notification email to SK Robotics
      await resend.emails.send({
        from: 'SK Robotics Website <onboarding@resend.dev>',
        to: ['saikirani999@gmail.com'],
        subject: `New Demo Request: ${data.schoolName}`,
        html: buildNotificationEmail(data),
      });

      // Send auto-reply if email was provided
      if (data.email) {
        await resend.emails.send({
          from: 'SK Robotics <onboarding@resend.dev>',
          to: [data.email],
          subject: 'Thank you for contacting SK Robotics!',
          html: buildAutoReplyEmail(data.name),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

function buildNotificationEmail(data: z.infer<typeof contactSchema>): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #07070F; color: #F3F2ED; padding: 32px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: #F5C518; color: #07070F; font-weight: 800; padding: 8px 16px; border-radius: 8px; font-size: 18px;">SK</div>
        <h2 style="margin-top: 16px; color: #F5C518;">New Demo Request</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Name</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">School</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.schoolName}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="tel:${data.phone}" style="color: #F5C518;">${data.phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Email</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.email || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Location</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.location}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Students</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.totalStudents || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Classes</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.classesServed || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">Programs</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.programs.join(', ') || 'None selected'}</td></tr>
        <tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58); border-bottom: 1px solid rgba(255,255,255,0.06);">How heard</td><td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.heardFrom || 'Not specified'}</td></tr>
        ${data.message ? `<tr><td style="padding: 8px 0; color: rgba(243,242,237,0.58);">Message</td><td style="padding: 8px 0;">${data.message}</td></tr>` : ''}
      </table>
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">WhatsApp This Lead</a>
      </div>
    </div>
  `;
}

function buildAutoReplyEmail(name: string): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #07070F; color: #F3F2ED; padding: 32px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: #F5C518; color: #07070F; font-weight: 800; padding: 8px 16px; border-radius: 8px; font-size: 18px;">SK</div>
      </div>
      <h2 style="text-align: center; color: #F5C518; margin-bottom: 16px;">Thank You, ${name}!</h2>
      <p style="color: rgba(243,242,237,0.58); line-height: 1.7; margin-bottom: 16px;">
        We have received your inquiry and our education specialist will contact you within <strong style="color: #F3F2ED;">24 hours</strong> to schedule a free school visit.
      </p>
      <p style="color: rgba(243,242,237,0.58); line-height: 1.7; margin-bottom: 24px;">
        In the meantime, feel free to reach us directly:
      </p>
      <div style="background: #0D0D1A; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
        <p style="margin: 4px 0;">📞 <a href="tel:+918501924576" style="color: #F5C518; text-decoration: none;">+91 8501924576</a></p>
        <p style="margin: 4px 0;">💬 <a href="https://wa.me/918501924576" style="color: #25D366; text-decoration: none;">Chat on WhatsApp</a></p>
        <p style="margin: 4px 0;">✉️ <a href="mailto:saikirani999@gmail.com" style="color: #F5C518; text-decoration: none;">saikirani999@gmail.com</a></p>
      </div>
      <p style="color: rgba(243,242,237,0.28); font-size: 12px; text-align: center;">
        SK Robotics & VR Science Labs · Shamshabad, Hyderabad
      </p>
    </div>
  `;
}
