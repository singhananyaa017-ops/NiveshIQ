import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Target, 
  Activity, 
  Sparkles, 
  Info, 
  AlertTriangle,
  MinusCircle,
  PauseCircle,
  Home,
  Clock,
  Calendar,
  HelpCircle,
  Play
} from 'lucide-react';
import { formatINR, formatInLakhs } from '../../utils/formatters';
import { Badge, Button } from '../common/UIComponents';

export function DecisionSummary({
  decisionType = 'keep', // 'keep' | 'reduce' | 'pause'
  userData,
  onConfirmAndReturnToDashboard,
  onClose
}) {
  const [isConfirmedInPrototype, setIsConfirmedInPrototype] = useState(false);
  const [pauseDurationMonths, setPauseDurationMonths] = useState(1); // default to 1 month
  const { persona, sip, goal, market } = userData;

  const handleConfirmAction = () => {
    setIsConfirmedInPrototype(true);
  };

  // Smart pause auto-resume calculations
  const monthlySIP = 15000;
  const capitalNotInvested = monthlySIP * pauseDurationMonths;
  // Estimated compounding impact over 10 years at ~12% CAGR
  const projectedShortfall = Math.round(capitalNotInvested * Math.pow(1.12, 10));

  const resumeDates = {
    1: '10th November 2026',
    2: '10th December 2026',
    3: '10th January 2027'
  };
  const autoResumeDate = resumeDates[pauseDurationMonths] || '10th November 2026';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col">
        
        {/* ========================================================================= */}
        {/* BRANCH 1: KEEP SIP */}
        {/* ========================================================================= */}
        {decisionType === 'keep' && (
          <div>
            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <Badge variant="success" size="sm" className="mb-2 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                Decision Reviewed
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                You've chosen to continue your {formatINR(sip.monthlyAmount)} monthly SIP.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Discipline maintained during temporary market volatility.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Target Goal:</span>
                  <span className="font-bold text-slate-900">{goal.title} ({formatINR(goal.targetAmount)})</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Monthly SIP Amount:</span>
                  <span className="font-bold text-emerald-700">{formatINR(sip.monthlyAmount)} / month</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Market Context:</span>
                  <span className="font-bold text-slate-700">NIFTY 50 -2.1% (Accumulating at lower NAVs)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">AI Reasoning:</span>
                  <span className="font-bold text-teal-800">Rupee-Cost Averaging Preserved</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>NiveshIQ Summary: </strong>
                  By choosing to stay invested, your automatic debits will continue on <strong>{sip.nextDebitDate}</strong>, locking in lower purchase prices for long-term compounding.
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-back-to-dashboard-keep"
                  onClick={() => onConfirmAndReturnToDashboard('keep')}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 2: REDUCE SIP */}
        {/* ========================================================================= */}
        {decisionType === 'reduce' && (
          <div>
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-teal-950 text-white p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-3">
                <MinusCircle className="w-8 h-8" />
              </div>
              <Badge variant="warning" size="sm" className="mb-2 bg-amber-500/20 text-amber-300 border-amber-400/30">
                SIP Reduction Selected
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Your decision is still yours.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                NiveshIQ simply helped you understand the context before proceeding.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Current Monthly SIP:</span>
                  <span className="line-through text-slate-400 font-semibold">{formatINR(sip.monthlyAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">New Monthly SIP Amount:</span>
                  <span className="font-extrabold text-amber-800 text-base">{formatINR(sip.reducedAmount)} / month (-50%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Estimated Goal Trajectory:</span>
                  <span className="font-bold text-slate-800">87% Progress (~11.2 yrs)</span>
                </div>
              </div>

              {!isConfirmedInPrototype ? (
                <div className="space-y-3 pt-2">
                  <button
                    id="btn-confirm-reduce"
                    onClick={handleConfirmAction}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm in prototype</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    Prototype mode: No real banking transaction occurs.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SIP reduced to {formatINR(sip.reducedAmount)}/month successfully updated in prototype!</span>
                  </div>
                  <button
                    id="btn-back-to-dashboard-reduced"
                    onClick={() => onConfirmAndReturnToDashboard('reduce')}
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    <span>Return to Dashboard</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 3: SMART PAUSE WITH AUTO-RESUME */}
        {/* ========================================================================= */}
        {decisionType === 'pause' && (
          <div>
            <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center mx-auto mb-3">
                <PauseCircle className="w-8 h-8" />
              </div>
              <Badge variant="danger" size="sm" className="mb-2 bg-rose-500/20 text-rose-300 border-rose-400/30">
                Smart Pause Configuration
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                You're choosing to pause your SIP.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                Select a pause duration with automatic resumption to preserve your long-term investing habit.
              </p>
            </div>

            <div className="p-6 space-y-4">
              
              {/* Duration Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    Select Pause Duration:
                  </span>
                  <span className="text-slate-500 font-normal">Auto-resumes on {autoResumeDate}</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[1, 2, 3].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setPauseDurationMonths(duration)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center justify-center gap-0.5 ${
                        pauseDurationMonths === duration
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/10 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-sm">{duration} {duration === 1 ? 'Month' : 'Months'}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Resume {duration === 1 ? 'Nov' : duration === 2 ? 'Dec' : 'Jan'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic "Cost of Waiting" Estimate */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Cost of Waiting Estimate:</span>
                </div>
                <p className="leading-relaxed font-medium">
                  Pausing {pauseDurationMonths} month{pauseDurationMonths > 1 ? 's' : ''} ≈ <strong className="text-slate-900">{formatINR(capitalNotInvested)} less invested</strong> and <strong className="text-amber-900">~{formatINR(projectedShortfall)} lower projected corpus</strong>.
                </p>
                <div className="text-[10px] text-amber-800/80 italic pt-0.5">
                  Illustrative, not a guarantee. Assumes an illustrative 12% annualized return over 10 years.
                </div>
              </div>

              {/* Smart Auto-Resume Acknowledgement */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between text-slate-800 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    Auto-Resume Scheduled:
                  </span>
                  <span className="text-teal-700 font-bold">{autoResumeDate}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Your monthly ₹15,000 debit will automatically restart on {autoResumeDate}. You can resume anytime earlier from the dashboard.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="btn-continue-pause"
                  onClick={() => onConfirmAndReturnToDashboard('pause', pauseDurationMonths, autoResumeDate)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirm Smart Pause ({pauseDurationMonths} mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
