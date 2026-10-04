import React from 'react';
import { Shield, Sparkles, User, TrendingDown, Bell, Layers, Target, Compass, RefreshCw } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function Navbar({ activeTab, onTabChange, onOpenPersona, onOpenDemoGuide, marketData, userData, onResetData }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">NiveshIQ</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                  AI Co-Pilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Contextual Financial Intelligence</p>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('portfolio')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Portfolio & SIPs
            </button>
            <button
              onClick={() => onTabChange('goals')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'goals'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Goals
            </button>
            <button
              onClick={() => onTabChange('insights')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'insights'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Intelligence
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Market Ticker Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50/90 border border-rose-200 text-xs text-rose-800">
              <TrendingDown className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span className="font-semibold">NIFTY 50:</span>
              <span className="font-bold">{marketData.niftyToday}%</span>
              <span className="text-[10px] text-rose-600/80 font-medium">({marketData.marketDropFromHigh}% from ATH)</span>
            </div>

            {/* 60s Demo Guide Quick Button */}
            <button
              onClick={onOpenDemoGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg transition shadow-xs"
              title="Open 60-90s Evaluation Demo Flow"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo Guide</span>
            </button>

            {/* Persona Quick Pill */}
            <button
              onClick={onOpenPersona}
              className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-left"
              title="View Aarav Sharma Persona Profile"
            >
              <div className="text-right hidden sm:block leading-tight">
                <div className="text-xs font-bold text-slate-800">{userData.persona.name}</div>
                <div className="text-[10px] text-slate-500">Moderate • 10+ yrs</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                AS
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
