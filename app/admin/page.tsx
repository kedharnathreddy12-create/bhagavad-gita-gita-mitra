'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-accent-gold/20 p-4 rounded-full">
            <Lock className="w-8 h-8 text-accent-gold" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h1>
        <p className="text-center text-text-secondary mb-8">Please enter your credentials</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-accent-gold text-primary-dark font-bold py-3 rounded-xl hover:bg-accent-saffron transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
