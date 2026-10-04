import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Target, 
  PieChart, 
  Activity, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ArrowLeft, 
  Info, 
  AlertCircle,
  TrendingDown,
  Clock,
  Compass,
  Check,
  Tag
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { Badge, Button, Card } from '../common/UIComponents';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { REASON_OPTIONS } from './ReasonCheckModal';

export function DecisionGuardIntervention({
  selectedAction = 'pause',
  selectedReason = null,
  userData,
  onProceedToSimulator,
  onBackToReasonCheck,
  onClose
}) {
  const [isWhyExpanded, setIsWhyExpanded] = useState(false);
  const { persona, portfolio, sip, goal, market, explainability } = userData;

  const actionText = selectedAction === 'pause' ? 'pausing' : selectedAction === 'reduce' ? 'reducing' : 'modifying';

  // Find human readable reason label if provided
  const reasonObj = REASON_OPTIONS.find(r => r.id === selectedReason);
  const reasonLabel = reasonObj ? reasonObj.label : selectedReason ? 'Other' : null;

  // Tailored synthesis based on selectedReason
  let synthesisTitle = "NiveshIQ Contextual Synthesis";
  let synthesisQuote = `"Because your investment horizon is long (${goal.yearsRemaining} years), pausing your SIP during a short-term market decline could reduce the amount invested over time and may slow your progress toward your goal."`;
  let synthesisSubtext = "*Based on historical rupee-cost averaging dynamics in diversified Indian mutual funds.";
  let highlightedAlternative = null;

  if (selectedReason === 'market_fear') {
    synthesisTitle = "Context: Market Volatility & Rupee-Cost Averaging";
    synthesisQuote = `"Market drops are uncomfortable, but historical data shows NIFTY 50 recovered from 100% of similar 5–10% dips. Continuing your SIP allows you to accumulate mutual fund units at lower NAVs, turning volatility into a mathematical advantage."`;
    synthesisSubtext = `*Historical reference: 18 of 18 pullbacks recovered over the last 15 years.`;
    highlightedAlternative = "Staying invested or reducing rather than pausing captures lower unit purchase costs.";
  } else if (selectedReason === 'need_cash') {
    synthesisTitle = "Context: Short-Term Liquidity Support";
    synthesisQuote = `"If you need cash for upcoming expenses, an all-or-nothing pause isn't the only option. Reducing your monthly SIP to ₹7,500 frees up immediate cash while preserving 87% of your compounding trajectory for your Home Down Payment."`;
    synthesisSubtext = `*Middle ground: Preserves monthly liquidity without breaking the investment habit.`;
    highlightedAlternative = "Recommended Alternative: Reduce SIP to ₹7,500/mo or pause for just 1 month.";
  } else if (selectedReason === 'lost_confidence') {
    synthesisTitle = "Context: Long-Term Goal Trajectory";
    synthesisQuote = `"You've already built ₹8,42,600 (34% of your ₹25 Lakh goal) and are firmly on track. With 10 years remaining, short-term quarterly fluctuations do not determine your final outcome—staying consistent does."`;
    synthesisSubtext = `*Goal tracking: Home Down Payment remains fully achievable by ${goal.targetYear}.`;
    highlightedAlternative = "Your 10-year horizon provides ample room to absorb economic and market cycles.";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[95vh]">
        
        {/* Top Hero Co-Pilot Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">NiveshIQ</h2>
                  <span className="bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-spin" /> AI Decision Support
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">Your contextual financial co-pilot</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition text-xs font-semibold"
            >
              Exit
            </button>
          </div>

          {/* Main Contextual Hook */}
          <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-sm sm:text-base font-semibold text-slate-100 flex items-start gap-2">
              <TrendingDown className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                You're considering {actionText} your SIP while markets are down <strong className="text-rose-300">{Math.abs(market.marketDropFromHigh)}%</strong> from their recent high.
              </span>
            </p>

            {reasonLabel && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-200 border border-teal-400/30">
                <Tag className="w-3 h-3" />
                {reasonLabel}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Section: Here's what we considered */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600" />
                Here's what we considered
              </h3>
              <span className="text-[11px] text-slate-500">4 Contextual Dimensions</span>
            </div>

            {/* 4 Multi-Factor Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Card 1: Your Goal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition space-y-1">
                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                  <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <span>1. Your Goal</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">{goal.title}</div>
                <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
                  <span>Horizon: <strong className="text-slate-800">{goal.yearsRemaining} years</strong></span>
                  <span>Target: <strong className="text-slate-800">₹25L</strong></span>
                </div>
              </div>

              {/* Card 2: Your Portfolio */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition space-y-1">
                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                  <div className="p-1 rounded-md bg-blue-100 text-blue-700">
                    <PieChart className="w-3.5 h-3.5" />
                  </div>
                  <span>2. Your Portfolio</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">Moderate Risk Profile</div>
                <div className="text-xs text-slate-600 pt-1">
                  Diversified across equity (75%) + debt & gold (25%)
                </div>
              </div>

              {/* Card 3: Market Context */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition space-y-1">
                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                  <div className="p-1 rounded-md bg-amber-100 text-amber-700">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span>3. Market Context</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">NIFTY 50: -2.1% Today</div>
                <div className="text-xs text-slate-600 pt-1">
                  Current volatility is elevated; NAV units are cheaper.
                </div>
              </div>

              {/* Card 4: Your SIP */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition space-y-1">
                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                  <span>4. Your SIP</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">{formatINR(sip.monthlyAmount)} / month</div>
                <div className="text-xs text-slate-600 pt-1">
                  Currently active • 38 consecutive monthly debits
                </div>
              </div>

            </div>
          </div>

          {/* AI Core Insight Callout (Dynamically Tailored) */}
          <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-blue-500/10 border-2 border-teal-300 p-4 sm:p-5 relative overflow-hidden space-y-2">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      {synthesisTitle}
                    </span>
                    <Badge variant="primary" size="xs">Non-Predictive</Badge>
                  </div>
                  {reasonLabel && (
                    <span className="text-[11px] text-teal-700 font-bold bg-teal-100/80 px-2 py-0.5 rounded-md">
                      Tailored to: {reasonLabel}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                  {synthesisQuote}
                </p>
                {highlightedAlternative && (
                  <div className="p-2.5 rounded-lg bg-white/80 border border-teal-200 text-xs font-semibold text-teal-900 flex items-center gap-2 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{highlightedAlternative}</span>
                  </div>
                )}
                <p className="text-xs text-slate-600 italic">
                  {synthesisSubtext}
                </p>
              </div>
            </div>
          </div>

          {/* Expandable Section: "Why am I seeing this?" */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70">
            <button
              id="btn-expand-why"
              onClick={() => setIsWhyExpanded(!isWhyExpanded)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-100/80 transition"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Why am I seeing this? (Explainable AI)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-teal-700 font-semibold">
                <span>{isWhyExpanded ? 'Collapse' : 'Expand explanation'}</span>
                {isWhyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {isWhyExpanded && (
              <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-3 border-t border-slate-200/80 bg-white animate-in fade-in duration-150">
                <p className="font-semibold text-slate-900">NiveshIQ evaluated five transparent criteria:</p>
                <ul className="space-y-2 text-slate-600 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span><strong>Your investment horizon ({goal.yearsRemaining} yrs):</strong> Long-term investors mathematically benefit from buying units during downturns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span><strong>Your current SIP amount ({formatINR(sip.monthlyAmount)}):</strong> Configured to hit your ₹25 Lakh corpus target by {goal.targetYear}.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span><strong>Your goal target (₹25,00,000):</strong> Pausing interrupts compounding and creates a capital shortfall.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span><strong>Your portfolio risk profile (Moderate):</strong> Equity portion already cushioned with debt allocations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span><strong>Current market movement (NIFTY -2.1%):</strong> Elevated volatility often leads to emotional rather than analytical decisions.</span>
                  </li>
                </ul>

                {/* Small tailored reason line */}
                {reasonLabel && (
                  <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Tailored to your reason: <strong>{reasonLabel}</strong></span>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 italic mt-2">
                  NiveshIQ does not predict the market or make the decision for you. It serves strictly as an explainable decision-support layer.
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onBackToReasonCheck}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Reason Check</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="btn-open-simulator"
              onClick={onProceedToSimulator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <span>See Goal Impact Projection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
