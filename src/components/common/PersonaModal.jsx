import React from 'react';
import { X, User, Briefcase, IndianRupee, Target, Shield, Clock } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function PersonaModal({ isOpen, onClose, persona, sip, goal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 text-xl font-bold">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{persona.name}</h3>
                <span className="bg-teal-500/20 text-teal-300 text-xs px-2.5 py-0.5 rounded-full border border-teal-500/30">
                  Target Persona
                </span>
              </div>
              <p className="text-slate-300 text-sm">{persona.age} yrs • {persona.role}</p>
            </div>
          </div>
        </div>

        {/* Persona Details */}
        <div className="p-6 space-y-4 text-sm text-slate-700 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-teal-600" />
                Monthly Income
              </div>
              <div className="text-base font-bold text-slate-900">{formatINR(persona.monthlyIncome)}</div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Risk Profile
              </div>
              <div className="text-base font-bold text-slate-900">{persona.riskProfile}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Investment Horizon
              </div>
              <div className="text-base font-bold text-slate-900">{persona.investmentHorizon}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Target className="w-3.5 h-3.5 text-rose-600" />
                Primary Goal
              </div>
              <div className="text-base font-bold text-slate-900">₹25L (Home)</div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-900 mb-2">Current Psychological Situation</h4>
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
              Markets have fallen 2.1% today (-8.4% from all-time highs). Aarav opened the app feeling anxious after hearing negative news headlines, and is tempted to pause his ₹15,000 monthly SIP to "prevent further losses".
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Persona Role: </span>
            Aarav is an ambitious young earner whose biggest risk is emotional exit during short-term corrections. NiveshIQ intervenes precisely when he taps "Pause SIP".
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition"
          >
            Close Persona
          </button>
        </div>
      </div>
    </div>
  );
}
