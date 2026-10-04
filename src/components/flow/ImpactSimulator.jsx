import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  X,
  Layers,
  Clock,
  IndianRupee,
  MinusCircle,
  PauseCircle,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { formatINR, formatInLakhs } from '../../utils/formatters';
import { Badge, Button, Card } from '../common/UIComponents';

export function ImpactSimulator({
  userData,
  onSelectFinalDecision,
  onBackToIntervention,
  onClose
}) {
  const { goal, scenarios, sip } = userData;
  const [selectedScenarioId, setSelectedScenarioId] = useState('reduce'); // default to highlighting middle ground

  const selectedScenario = scenarios[selectedScenarioId] || scenarios.reduce;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[96vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToIntervention}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              title="Back to NiveshIQ synthesis"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">What could this decision change?</h2>
              <p className="text-xs text-slate-500">10-Year Home Down Payment Goal Projection</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulator Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Target Milestone Summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 text-white shadow-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Goal Target</div>
              <div className="text-xl sm:text-2xl font-black text-white">{formatInLakhs(goal.targetAmount)} <span className="text-sm font-normal text-slate-300">({goal.title})</span></div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Horizon Deadline</div>
              <div className="text-base sm:text-lg font-bold text-teal-300">Year {goal.targetYear} ({goal.yearsRemaining} yrs left)</div>
            </div>
          </div>

          {/* 3 Scenario Comparison Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-teal-600" />
                Comparative Goal Trajectories
              </span>
              <span className="text-[11px] text-slate-500 font-medium italic">Click any card to inspect</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Scenario 1: Keep SIP */}
              <div 
                id="scenario-card-keep"
                onClick={() => setSelectedScenarioId('keep')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedScenarioId === 'keep'
                    ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase">KEEP SIP</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Strongest
                    </span>
                  </div>

                  <div className="text-xl font-black text-slate-900">
                    {formatINR(scenarios.keep.monthlyAmount)}<span className="text-xs font-medium text-slate-500">/mo</span>
                  </div>

                  {/* Visual Bar representation */}
                  <div className="my-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Est. 10y Corpus</span>
                      <span className="text-emerald-700 font-bold">{formatInLakhs(scenarios.keep.projectedCorpus10Yr)}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    Estimated progress: <strong className="text-emerald-800">Strongest</strong>. Accumulates more mutual fund units at lower NAVs during the current dip.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>On track to reach ₹25L in ~{scenarios.keep.timelineYears} yrs</span>
                </div>
              </div>

              {/* Scenario 2: Reduce SIP */}
              <div 
                id="scenario-card-reduce"
                onClick={() => setSelectedScenarioId('reduce')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedScenarioId === 'reduce'
                    ? 'border-amber-500 bg-amber-50/25 ring-2 ring-amber-500/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase">REDUCE SIP</span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Slower
                    </span>
                  </div>

                  <div className="text-xl font-black text-slate-900">
                    {formatINR(scenarios.reduce.monthlyAmount)}<span className="text-xs font-medium text-slate-500">/mo</span>
                  </div>

                  {/* Visual Bar representation */}
                  <div className="my-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Est. 10y Corpus</span>
                      <span className="text-amber-800 font-bold">{formatInLakhs(scenarios.reduce.projectedCorpus10Yr)}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    Estimated progress: <strong className="text-amber-900">Slower</strong>. Provides cashflow relief while retaining compounding momentum.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-800 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline extends to ~{scenarios.reduce.timelineYears} yrs</span>
                </div>
              </div>

              {/* Scenario 3: Pause SIP */}
              <div 
                id="scenario-card-pause"
                onClick={() => setSelectedScenarioId('pause')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedScenarioId === 'pause'
                    ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-500/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase">PAUSE SIP</span>
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      Slower still
                    </span>
                  </div>

                  <div className="text-xl font-black text-slate-900">
                    {formatINR(scenarios.pause.monthlyAmount)}<span className="text-xs font-medium text-slate-500">/mo</span>
                  </div>

                  {/* Visual Bar representation */}
                  <div className="my-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Est. 10y Corpus</span>
                      <span className="text-rose-700 font-bold">{formatInLakhs(scenarios.pause.projectedCorpus10Yr)}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    Estimated progress: <strong className="text-rose-800">Slower still</strong>. Pauses all fresh capital and misses dip unit accumulation.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-rose-700 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Est. shortfall: ~{formatInLakhs(goal.targetAmount - scenarios.pause.projectedCorpus10Yr)}</span>
                </div>
              </div>

            </div>
          </div>

          {/* 🌟 "Want a middle ground?" Highlighted Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-teal-500/10 to-indigo-500/10 border-2 border-amber-300 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Want a middle ground?</h4>
              </div>
              <Badge variant="warning" size="xs">Balanced Alternative</Badge>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              If cashflow is tight, reducing to <strong className="text-slate-900">₹7,500/month</strong> retains 87% of your goal progress trajectory while freeing up ₹7,500 in monthly liquidity.
            </p>
          </div>

          {/* Legal Non-Guarantee Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>Illustrative projection — not a guarantee.</strong> Projections assume an illustrative 12% annualized return on equity and 7% on debt over a 10-year horizon. Mutual fund investments are subject to market risks.
            </div>
          </div>

        </div>

        {/* Footer Actions: Clear 3-Way Choice */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Primary Action: Reduce SIP instead */}
            <button
              id="cta-reduce-instead"
              onClick={() => onSelectFinalDecision('reduce')}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MinusCircle className="w-4 h-4" />
              <span>Reduce SIP instead (₹7,500)</span>
            </button>

            {/* Secondary Action: Keep my SIP */}
            <button
              id="cta-keep-sip"
              onClick={() => onSelectFinalDecision('keep')}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Keep my SIP (₹15,000)</span>
            </button>
          </div>

          {/* Tertiary Action: Pause anyway */}
          <div className="text-center pt-1">
            <button
              id="cta-pause-anyway"
              onClick={() => onSelectFinalDecision('pause')}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition underline underline-offset-4"
            >
              Pause anyway (₹0/month)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
