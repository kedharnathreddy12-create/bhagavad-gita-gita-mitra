import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { name, contactInfo, experience } = await req.json();

    if (!name || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prefix the experience message to differentiate from contact messages
    const formattedMessage = `[EXPERIENCE] ${experience}`;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          id: Date.now().toString(),
          name,
          email: contactInfo || "No contact info provided",
          message: formattedMessage,
          date: new Date().toISOString(),
          read: false
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Experience saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving experience:', error);
    return NextResponse.json({ error: 'Failed to save experience' }, { status: 500 });
  }
}
