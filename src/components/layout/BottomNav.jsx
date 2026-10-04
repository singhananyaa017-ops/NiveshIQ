import React from 'react';
import { Home, PieChart, Target, Sparkles, User } from 'lucide-react';

export function BottomNav({ activeTab, onTabChange, onOpenPersona }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      <button
        onClick={() => onTabChange('dashboard')}
        className={`flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium ${
          activeTab === 'dashboard' ? 'text-teal-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => onTabChange('portfolio')}
        className={`flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium ${
          activeTab === 'portfolio' ? 'text-teal-700 font-bold' : 'text-slate-500'
        }`}
      >
        <PieChart className="w-5 h-5 mb-0.5" />
        <span>Portfolio</span>
      </button>

      <button
        onClick={() => onTabChange('goals')}
        className={`flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium ${
          activeTab === 'goals' ? 'text-teal-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Target className="w-5 h-5 mb-0.5" />
        <span>Goals</span>
      </button>

      <button
        onClick={() => onTabChange('insights')}
        className={`flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium ${
          activeTab === 'insights' ? 'text-teal-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Sparkles className="w-5 h-5 mb-0.5 text-teal-600" />
        <span>AI Copilot</span>
      </button>

      <button
        onClick={onOpenPersona}
        className="flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium text-slate-500"
      >
        <User className="w-5 h-5 mb-0.5" />
        <span>Persona</span>
      </button>
    </div>
  );
}
