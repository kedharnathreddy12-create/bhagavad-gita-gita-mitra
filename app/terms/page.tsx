export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Terms of Service</h1>
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>Welcome to Krishna Bhagavad Gita. By using our website, you agree to comply with and be bound by the following terms.</p>
        
        <h2 className="text-xl text-white font-bold mt-6">1. Acceptance of Terms</h2>
        <p>If you do not agree to these terms, please do not use our site. We reserve the right to modify these terms at any time.</p>

        <h2 className="text-xl text-white font-bold mt-6">2. Use of Content</h2>
        <p>All content provided on this website is for educational and spiritual purposes. You may read, share, and use this content for personal use. Commercial redistribution without permission is prohibited.</p>

        <h2 className="text-xl text-white font-bold mt-6">3. Disclaimer</h2>
        <p>The information provided is translated to &quot;Simple Telugu&quot; for ease of understanding and may differ from strict traditional scholarly translations. Use it as a guide rather than absolute academic material.</p>
      </div>
    </div>
  );
}
