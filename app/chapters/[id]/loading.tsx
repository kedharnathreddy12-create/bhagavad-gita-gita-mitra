export default function ChapterLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="w-24 h-4 bg-white/10 rounded mb-8"></div>
      
      <div className="text-center mb-16">
        <div className="w-32 h-4 bg-accent-gold/20 rounded mx-auto mb-4"></div>
        <div className="w-64 md:w-96 h-12 bg-white/10 rounded-lg mx-auto mb-6"></div>
        <div className="w-48 h-6 bg-white/5 rounded mx-auto mb-6"></div>
        
        <div className="glass-panel rounded-2xl p-6 border border-white/5 h-32 bg-white/5"></div>
      </div>

      <div className="space-y-12">
        <div className="w-32 h-8 bg-white/10 rounded mb-8"></div>
        
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 h-64 bg-white/5">
             <div className="flex justify-between mb-6">
                <div className="w-20 h-6 bg-accent-gold/20 rounded-full"></div>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/10"></div>
                   <div className="w-8 h-8 rounded-full bg-white/10"></div>
                   <div className="w-8 h-8 rounded-full bg-white/10"></div>
                </div>
             </div>
             <div className="w-3/4 h-8 bg-white/10 rounded mx-auto mb-8"></div>
             <div className="w-full h-24 bg-primary/30 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
