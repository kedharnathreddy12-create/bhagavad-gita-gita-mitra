'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

  try {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      throw error;
    }
    
    revalidatePath('/admin/messages');
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error('Failed to delete message');
  }
}
