export default function GlobalLoading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin"></div>
        <p className="text-accent-gold font-medium animate-pulse tracking-widest uppercase">లోడ్ అవుతోంది...</p>
      </div>
    </div>
  );
}
