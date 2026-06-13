'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function loginAction(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'gitamitra' && password === 'partha') {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
    
    redirect('/admin/messages');
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin');
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  
  if (!auth?.value) {
    throw new Error('Unauthorized');
  }

  const messageId = formData.get('messageId') as string;
  if (!messageId) return;

  const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');
  
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, 'utf8');
      let messages = JSON.parse(fileData);
      
      messages = messages.filter((msg: any) => msg.id !== messageId);
      
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
      revalidatePath('/admin/messages');
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error('Failed to delete message');
  }
}
