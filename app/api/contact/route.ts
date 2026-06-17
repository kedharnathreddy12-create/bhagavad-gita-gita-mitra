import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { name, contactInfo, message } = await req.json();

    if (!name || !contactInfo || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          id: Date.now().toString(),
          name,
          email: contactInfo,
          message,
          date: new Date().toISOString(),
          read: false
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Message saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
