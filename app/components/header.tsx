export default function  HeaderApp() {
  return (
    <header className="border-b border-slate-800 bg-linear-to-r from-black-900/80 to-black backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_#2dd4bf]" />
            <span className="font-bold text-xl tracking-wider uppercase bg-linear-to-r from-teal-400 via-cyan-400 to-magenta-500 bg-clip-text text-transparent">
              Quick<span className="text-pink-500">Quote</span>
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="text-teal-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Histórico</a>
          </nav>
        </div>
      </header>
  );
}