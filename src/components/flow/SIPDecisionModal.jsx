import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  PauseCircle, 
  MinusCircle, 
  CheckCircle, 
  Sparkles, 
  Info, 
  ShieldAlert,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { Badge, Button } from '../common/UIComponents';

export function SIPDecisionModal({ 
  isOpen, 
  onClose, 
  onTriggerDecisionGuard, 
  currentSIPAmount = 15000,
  reducedSIPAmount = 7500,
  goalTitle = "Home Down Payment"
}) {
  const [selectedOption, setSelectedOption] = useState('pause'); // default to 'pause' for instant intuitive flow
  const [customPauseDuration, setCustomPauseDuration] = useState('3_months');

  if (!isOpen) return null;

  const handleContinue = () => {
    // If user clicks "See what this means" or confirms option
    onTriggerDecisionGuard(selectedOption);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Change your SIP?</h2>
              <p className="text-xs text-slate-500">Manage your systematic investment plan settings</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Current SIP Summary Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Active SIP</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {formatINR(currentSIPAmount)}<span className="text-sm font-normal text-slate-500"> / month</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Allocated across 3 funds for <strong className="text-slate-800">{goalTitle}</strong>
              </p>
            </div>
            <Badge variant="success" size="sm">Active</Badge>
          </div>

          {/* Options Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Choose an action:
            </label>

            {/* Option 1: Pause SIP */}
            <div 
              id="option-pause-sip"
              onClick={() => setSelectedOption('pause')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedOption === 'pause'
                  ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-500/10 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                selectedOption === 'pause' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
              }`}>
                <PauseCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">Pause SIP</span>
                  <span className="text-xs font-semibold text-slate-500">₹0 / month</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Temporarily stop monthly debits. Your existing investments remain invested.
                </p>
                {selectedOption === 'pause' && (
                  <div className="mt-3 pt-3 border-t border-rose-100 flex items-center gap-2 text-xs text-rose-700 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Selected: Stop upcoming debit on 10th October</span>
                  </div>
                )}
              </div>
            </div>

            {/* Option 2: Reduce SIP */}
            <div 
              id="option-reduce-sip"
              onClick={() => setSelectedOption('reduce')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedOption === 'reduce'
                  ? 'border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/10 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                selectedOption === 'reduce' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
              }`}>
                <MinusCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">Reduce SIP Amount</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {formatINR(reducedSIPAmount)} / month (-50%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Lower your monthly commitment by 50% while continuing disciplined compounding.
                </p>
              </div>
            </div>

            {/* Option 3: Keep SIP */}
            <div 
              id="option-keep-sip"
              onClick={() => setSelectedOption('keep')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedOption === 'keep'
                  ? 'border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/10 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                selectedOption === 'keep' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'
              }`}>
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">Keep SIP Unchanged</span>
                  <span className="text-xs font-semibold text-emerald-700">{formatINR(currentSIPAmount)} / month</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Continue your systematic investment plan on schedule.
                </p>
              </div>
            </div>

          </div>

          {/* ⚡ PRE-FINALIZATION INTERVENTION TRIGGER BOX */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 via-slate-50 to-indigo-50 border border-teal-200 text-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>
                {selectedOption === 'pause' ? 'Before you pause your SIP...' : selectedOption === 'reduce' ? 'Before you reduce your SIP...' : 'Before finalizing...'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              NiveshIQ has prepared a personalized goal & market impact overview based on your 10-year horizon.
            </p>
          </div>

        </div>

        {/* Modal Footer / Action CTA */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2"
          >
            Cancel & Go Back
          </button>

          <button
            id="btn-see-what-this-means"
            onClick={handleContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-700/20 hover:shadow-lg transition-all active:scale-98"
          >
            <span>See what this means</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
