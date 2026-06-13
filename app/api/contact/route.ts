import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');
    
    // Read existing messages or create empty array
    let messages = [];
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, 'utf8');
      try {
        messages = JSON.parse(fileData);
      } catch {
        messages = [];
      }
    }

    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      read: false
    };

    messages.unshift(newMessage); // Add to the beginning of the array

    // Save back to file
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Message saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
