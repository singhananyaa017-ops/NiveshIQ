import React from 'react';
import { Sparkles, Shield, Cpu, Compass, Layers, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Badge, Card, Button } from '../common/UIComponents';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export function AIInsightsView({ userData, onTriggerSIPChange }) {
  const { explainability } = userData;

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">NiveshIQ AI Intelligence Hub</h1>
            <Badge variant="ai" size="xs">Transparent Architecture</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">How NiveshIQ generates contextual decision-support without black-box automation</p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={onTriggerSIPChange}
        >
          Test SIP Decision Flow
        </Button>
      </div>

      {/* 4 Pillars of NiveshIQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {explainability.factors.map((factor, idx) => (
          <Card key={idx} className="p-5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{factor.label}</span>
                <h4 className="text-sm font-bold text-slate-900">{factor.value}</h4>
              </div>
            </div>
            <p className="text-xs text-slate-600 pl-10 leading-relaxed">
              {factor.detail}
            </p>
          </Card>
        ))}
      </div>

      {/* Explainable AI Principles */}
      <Card className="p-6 bg-slate-900 text-white space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white">NiveshIQ Explainability & Safety Guardrails</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 1. No Black-Box Recommendations
            </div>
            <p className="text-slate-400">All logic cites tangible factors: timeline, target, and rupee-cost averaging mechanics.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 2. User Remains the Final Decider
            </div>
            <p className="text-slate-400">NiveshIQ never blocks, forces, or executes financial transactions unilaterally.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3. Non-Deterministic Language
            </div>
            <p className="text-slate-400">Uses compliant phrases ("may", "could", "illustrative") avoiding false return promises.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 4. Contextual Decision Moment
            </div>
            <p className="text-slate-400">Appears right before the decision is committed, minimizing emotional panic selling.</p>
          </div>
        </div>
      </Card>

      <DisclaimerBanner />

    </div>
  );
}
