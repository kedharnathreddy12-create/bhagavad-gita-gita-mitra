export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Privacy Policy</h1>
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>At Krishna Bhagavad Gita, we respect your privacy and are committed to protecting it through our compliance with this policy.</p>
        
        <h2 className="text-xl text-white font-bold mt-6">1. Information We Collect</h2>
        <p>We do not collect personal information unless you explicitly provide it (e.g., via contact forms). Features like bookmarks use local storage on your device, meaning the data never leaves your browser.</p>

        <h2 className="text-xl text-white font-bold mt-6">2. Third-Party Services</h2>
        <p>We use third-party services like Google Gemini AI for chatbot functionality. Interactions with the chatbot may be subject to Google&apos;s privacy policies.</p>

        <h2 className="text-xl text-white font-bold mt-6">3. Cookies</h2>
        <p>We use minimal cookies for site functionality and analytics to improve the user experience.</p>
      </div>
    </div>
  );
}
