
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="m19 8-2 2V8"/><path d="m5 8 2 2V8"/><path d="m15 16-2 2v-2"/><path d="m9 16-2 2v-2"/></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Local SEO Strategist <span className="text-blue-600">Pro</span></h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-slate-500">Expert Insights</span>
            <span className="text-sm font-medium text-slate-500">Policy Compliant</span>
            <span className="text-sm font-medium text-slate-500">GBP Verified</span>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Local SEO Strategist Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
