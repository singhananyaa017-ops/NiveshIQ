import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  TrendingDown, 
  Wallet, 
  HeartCrack, 
  MoreHorizontal,
  X 
} from 'lucide-react';
import { Badge, Button } from '../common/UIComponents';

export const REASON_OPTIONS = [
  {
    id: 'market_fear',
    label: 'Market is scaring me',
    icon: TrendingDown,
    description: 'Concerned about recent drops & market headlines'
  },
  {
    id: 'need_cash',
    label: 'I need cash soon',
    icon: Wallet,
    description: 'Upcoming expenses or temporary liquidity crunch'
  },
  {
    id: 'lost_confidence',
    label: "I'm losing confidence",
    icon: HeartCrack,
    description: 'Doubtful about goal progress or portfolio returns'
  },
  {
    id: 'other',
    label: 'Something else',
    icon: MoreHorizontal,
    description: 'Personal preference or general portfolio rebalancing'
  }
];

export function ReasonCheckModal({
  isOpen,
  selectedAction = 'pause',
  onSelectReasonAndProceed,
  onBack,
  onClose
}) {
  const [selectedReason, setSelectedReason] = useState('market_fear');

  if (!isOpen) return null;

  const actionText = selectedAction === 'pause' ? 'pausing' : 'reducing';

  const handleContinue = () => {
    onSelectReasonAndProceed(selectedReason);
  };

  const handleSkip = () => {
    onSelectReasonAndProceed(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Why are you {actionText}?</h2>
                <Badge variant="ai" size="xs">Context Check</Badge>
              </div>
              <p className="text-xs text-slate-500">Helps NiveshIQ provide relevant guidance</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Chips */}
        <div className="p-6 space-y-3">
          <p className="text-xs text-slate-600 font-medium">
            Select what best describes your primary consideration right now:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {REASON_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedReason === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedReason(opt.id)}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-500/10 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {opt.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 underline underline-offset-2 transition"
            >
              Skip reason check
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-700/20 transition-all active:scale-98"
          >
            <span>Continue to NiveshIQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
