export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Privacy Policy</h1>
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>At <strong>GitaMitra</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our website.</p>
        
        <h2 className="text-xl text-white font-bold mt-6">1. Information We Collect</h2>
        <p>GitaMitra is primarily an educational platform designed to help users learn the teachings of the Bhagavad Gita.</p>
        <p>We may collect:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Information you voluntarily provide through contact forms, feedback forms, or account registration.</li>
          <li>Learning progress, bookmarks, and preferences that you choose to save.</li>
          <li>Basic technical information such as browser type, device information, and usage statistics for improving website performance.</li>
        </ul>

        <h2 className="text-xl text-white font-bold mt-6">2. Learning Data and Bookmarks</h2>
        <p>Bookmarks, reading progress, and learning preferences may be stored locally in your browser or securely within your account if you are logged in.</p>
        <p>This information is used solely to enhance your learning experience on GitaMitra.</p>

        <h2 className="text-xl text-white font-bold mt-6">3. AI-Powered Features</h2>
        <p>GitaMitra may provide AI-assisted features powered by third-party services such as Google Gemini.</p>
        <p>When using these features:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your questions may be processed by the AI service to generate responses.</li>
          <li>Please avoid sharing sensitive personal information while interacting with AI features.</li>
          <li>Use of AI services may also be subject to the privacy policies of the respective providers.</li>
        </ul>

        <h2 className="text-xl text-white font-bold mt-6">4. Cookies and Analytics</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Maintain website functionality.</li>
          <li>Remember user preferences.</li>
          <li>Analyze website usage and improve performance.</li>
        </ul>
        <p>You can control or disable cookies through your browser settings.</p>

        <h2 className="text-xl text-white font-bold mt-6">5. Third-Party Services</h2>
        <p>We may use trusted third-party services for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Website hosting</li>
          <li>Analytics</li>
          <li>Authentication</li>
          <li>AI-powered assistance</li>
        </ul>
        <p>These providers process data according to their own privacy policies and security practices.</p>

        <h2 className="text-xl text-white font-bold mt-6">6. Data Security</h2>
        <p>We implement reasonable security measures to protect user information from unauthorized access, disclosure, or misuse.</p>
        <p>However, no method of internet transmission or electronic storage is completely secure.</p>

        <h2 className="text-xl text-white font-bold mt-6">7. Children&apos;s Privacy</h2>
        <p>GitaMitra is intended for educational purposes and can be used by learners of all ages. We do not knowingly collect personal information from children without appropriate consent where required by law.</p>

        <h2 className="text-xl text-white font-bold mt-6">8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised &quot;Last Updated&quot; date.</p>

        <h2 className="text-xl text-white font-bold mt-6">9. Contact Us</h2>
        <p>If you have any questions regarding this Privacy Policy, please contact us through the contact page available on GitaMitra.</p>
      </div>
    </div>
  );
}
