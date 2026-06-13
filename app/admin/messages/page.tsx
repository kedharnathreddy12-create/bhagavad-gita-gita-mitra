import fs from 'fs';
import path from 'path';
import { Mail, Calendar, User, LogOut, Trash2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction, deleteMessageAction } from '../actions';

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  
  if (!auth?.value) {
    redirect('/admin');
  }

  const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');
  
  let messages = [];
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, 'utf8');
      messages = JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading messages:", error);
  }

  return (
    <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 py-12 sm:py-16 xl:py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Messages (సందేశాలు)</h1>
          <p className="text-base sm:text-lg text-text-secondary">Messages received from the contact form.</p>
        </div>
        
        <form action={logoutAction}>
          <button className="bg-red-500/20 text-red-300 hover:bg-red-500/30 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border border-red-500/30">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </form>
      </div>

      {messages.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-white/5 text-center">
          <Mail className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl text-white font-medium">No messages yet</h3>
          <p className="text-text-secondary mt-2">When someone fills out the contact form, their message will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg: any) => (
            <div key={msg.id} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-5 h-5 text-accent-gold" />
                    <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-accent-gold hover:underline flex items-center gap-2 text-sm sm:text-base">
                    <Mail className="w-4 h-4" /> {msg.email}
                  </a>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(msg.date).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </div>
                  
                  <form action={deleteMessageAction}>
                    <input type="hidden" name="messageId" value={msg.id} />
                    <button 
                      type="submit" 
                      className="text-red-400/70 hover:text-red-400 bg-red-400/10 hover:bg-red-400/20 p-2 rounded-lg transition-all sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-2 text-sm"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" /> 
                      <span className="sm:hidden">Delete</span>
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl">
                <p className="text-white whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
