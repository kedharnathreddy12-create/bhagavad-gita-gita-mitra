export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Terms of Service</h1>
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>Welcome to <strong>GitaMitra</strong>. By accessing or using this website, you agree to comply with and be bound by the following Terms of Service.</p>
        
        <h2 className="text-xl text-white font-bold mt-6">1. Acceptance of Terms</h2>
        <p>By using GitaMitra, you acknowledge that you have read, understood, and agreed to these Terms of Service.</p>
        <p>If you do not agree with any part of these terms, please discontinue use of the website.</p>
        <p>We reserve the right to update or modify these terms at any time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.</p>

        <h2 className="text-xl text-white font-bold mt-6">2. Use of Content</h2>
        <p>All content available on GitaMitra, including articles, chapter explanations, learning materials, and AI-assisted responses, is provided for educational, spiritual, and informational purposes.</p>
        <p>You may:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Read and access the content for personal use.</li>
          <li>Share links to GitaMitra content.</li>
          <li>Use the content for non-commercial educational purposes with appropriate attribution.</li>
        </ul>
        <p>You may not:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Republish or redistribute content for commercial purposes without permission.</li>
          <li>Copy substantial portions of the website to create competing services.</li>
          <li>Misuse the website or its services.</li>
        </ul>

        <h2 className="text-xl text-white font-bold mt-6">3. Educational Disclaimer</h2>
        <p>GitaMitra presents Bhagavad Gita teachings in a simplified and easy-to-understand format, including explanations tailored for students, professionals, and general readers.</p>
        <p>The content is intended for learning and spiritual understanding and should not be considered a substitute for traditional scholarly commentaries, religious instruction, legal advice, medical advice, or professional guidance.</p>
        <p>Different traditions and scholars may interpret Bhagavad Gita teachings differently.</p>

        <h2 className="text-xl text-white font-bold mt-6">4. AI-Assisted Features</h2>
        <p>Some features may use artificial intelligence services to provide explanations and answers.</p>
        <p>AI-generated responses are provided for informational purposes only and may occasionally contain inaccuracies. Users should exercise their own judgment and refer to authentic sources when necessary.</p>

        <h2 className="text-xl text-white font-bold mt-6">5. User Conduct</h2>
        <p>When using GitaMitra, you agree not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Attempt unauthorized access to the website or its systems.</li>
          <li>Disrupt or interfere with website functionality.</li>
          <li>Submit harmful, abusive, or unlawful content.</li>
          <li>Use automated tools to scrape or copy large portions of content.</li>
        </ul>

        <h2 className="text-xl text-white font-bold mt-6">6. Limitation of Liability</h2>
        <p>GitaMitra is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
        <p>We make no guarantees regarding uninterrupted availability, accuracy, or completeness of content. To the maximum extent permitted by law, GitaMitra shall not be liable for any damages arising from the use of the website.</p>

        <h2 className="text-xl text-white font-bold mt-6">7. Changes to the Service</h2>
        <p>We reserve the right to modify, suspend, or discontinue any feature or service without prior notice.</p>

        <h2 className="text-xl text-white font-bold mt-6">8. Contact</h2>
        <p>For questions regarding these Terms of Service, please contact us through the contact page available on GitaMitra.</p>
      </div>
    </div>
  );
}
