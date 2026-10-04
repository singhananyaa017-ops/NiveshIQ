import React from 'react';
import { X, Play, CheckCircle2, Sparkles, ArrowRight, Compass, HelpCircle } from 'lucide-react';
import { Badge, Button } from './UIComponents';

export function DemoWalkthroughGuide({
  isOpen,
  onClose,
  currentStep,
  onJumpToStep,
  onResetDemo
}) {
  if (!isOpen) return null;

  const demoSteps = [
    {
      num: 1,
      title: "Dashboard Overview",
      desc: "Observe market volatility banner (-2.1% Nifty, -8.4% from ATH), Aarav's ₹15k SIP & ₹25L Goal.",
      actionLabel: "Go to Dashboard",
      stepKey: "dashboard"
    },
    {
      num: 2,
      title: "Trigger SIP Review",
      desc: "Click 'Review my SIP' on the contextual alert banner.",
      actionLabel: "Open SIP Options",
      stepKey: "step2_options"
    },
    {
      num: 3,
      title: "Select 'Pause SIP'",
      desc: "User selects 'Pause SIP' - NiveshIQ intervenes before finalization.",
      actionLabel: "Trigger NiveshIQ",
      stepKey: "step2_reason"
    },
    {
      num: 4,
      title: "AI Reasoning & Explainability",
      desc: "Examine 4 contextual factors, synthesis callout, and expand 'Why am I seeing this?'.",
      actionLabel: "Inspect Intervention",
      stepKey: "step3_intervention"
    },
    {
      num: 5,
      title: "Impact Simulator",
      desc: "Compare Keep (₹15k) vs Reduce (₹7.5k) vs Pause (₹0) and review 'Want a middle ground?'.",
      actionLabel: "Open Simulator",
      stepKey: "step4_simulator"
    },
    {
      num: 6,
      title: "Decision Summary & Reflection",
      desc: "Confirm 'Reduce SIP' or 'Smart Pause' and review non-intrusive decision receipt.",
      actionLabel: "View Summary",
      stepKey: "step5_summary"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">NiveshIQ 60–90s Demo Guide</h3>
                <Badge variant="primary" size="xs" className="bg-teal-500/20 text-teal-200 border-teal-400/30">
                  Evaluator Mode
                </Badge>
              </div>
              <p className="text-xs text-slate-300">Click any step to demonstrate the precise product journey</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="p-5 overflow-y-auto space-y-3">
          {demoSteps.map((step) => (
            <div
              key={step.num}
              onClick={() => {
                onJumpToStep(step.stepKey);
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 transition cursor-pointer flex items-start gap-3 group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-teal-600 group-hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 transition">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-teal-900 transition">
                    {step.title}
                  </h4>
                  <span className="text-[11px] text-teal-700 font-semibold group-hover:underline flex items-center gap-1">
                    <span>Jump</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onResetDemo();
              onClose();
            }}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
          >
            Reset Demo Data to Initial State
          </button>

          <Button
            size="sm"
            variant="dark"
            onClick={onClose}
          >
            Got it, Let's Demo
          </Button>
        </div>

      </div>
    </div>
  );
}
