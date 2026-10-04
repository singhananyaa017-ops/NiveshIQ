import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Target, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  PieChart, 
  Activity, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  CheckCircle2,
  PlayCircle,
  Clock
} from 'lucide-react';
import { formatINR, formatInLakhs, formatPercent } from '../../utils/formatters';
import { Badge, Card, Button } from '../common/UIComponents';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export function Dashboard({ 
  userData, 
  onStartSIPDecisionFlow, 
  onResumeSIPNow,
  onNavigateToPortfolio, 
  onNavigateToGoals, 
  onNavigateToInsights 
}) {
  const { persona, portfolio, sip, goal, market } = userData;

  const isPaused = sip.status === 'Paused';

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      
      {/* Top Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Good afternoon, {persona.name.split(' ')[0]} 👋
            </h1>
            <Badge variant="primary" size="xs">Self-Directed Investor</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Goal: <span className="font-semibold text-slate-700">{goal.title}</span> • Risk: <span className="font-semibold text-slate-700">{persona.riskProfile}</span> • Horizon: <span className="font-semibold text-slate-700">{persona.investmentHorizon}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Portfolio Health: <strong>Optimal Diversification</strong>
          </div>
        </div>
      </div>

      {/* ⚡ HERO VOLATILITY CONTEXTUAL INTERVENTION CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-teal-500/10 border-2 border-amber-300/80 shadow-md p-5 sm:p-6 transition-all hover:border-amber-400">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                Market volatility detected
              </span>
              <span className="text-xs font-bold text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200">
                NIFTY 50 {market.niftyToday}% Today ({market.marketDropFromHigh}% from ATH)
              </span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Markets are down today. Before you change your SIP, see how this decision could affect your long-term goal.
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Short-term dips trigger anxiety, but pausing rupee-cost averaging can disrupt your {goal.yearsRemaining}-year timeline for the <span className="font-semibold text-slate-800">{goal.title}</span>.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-center">
            <button
              id="cta-review-sip"
              onClick={onStartSIPDecisionFlow}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <span>Review my SIP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[11px] text-center text-slate-500 font-medium">
              NiveshIQ Decision Support
            </div>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Portfolio Value */}
        <Card className="p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-400" />
                Total Portfolio Value
              </span>
              <Badge variant="default" size="xs">Updated 2m ago</Badge>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatINR(portfolio.totalValue)}
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                {portfolio.todayChangePct}% ({formatINR(portfolio.todayChangeAmount)})
              </span>
              <span className="text-slate-500">Today</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Overall Returns: <strong className="text-emerald-700">+{portfolio.totalReturnsPct}%</strong></span>
            <button 
              onClick={onNavigateToPortfolio}
              className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1"
            >
              View Funds <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Card 2: Active Monthly SIP / Smart Paused Card */}
        <Card className={`p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between ${
          isPaused 
            ? 'border-rose-300 bg-gradient-to-b from-rose-50/40 to-white ring-1 ring-rose-300/30' 
            : 'border-teal-200 bg-gradient-to-b from-teal-50/30 to-white'
        }`}>
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Activity className={`w-4 h-4 ${isPaused ? 'text-rose-600' : 'text-teal-600'}`} />
                Monthly SIP Commitment
              </span>
              <Badge 
                variant={sip.status === 'Active' ? 'success' : sip.status === 'Reduced' ? 'warning' : 'danger'} 
                size="xs"
              >
                {sip.status === 'Active' ? '● Active' : sip.status === 'Reduced' ? '● Reduced' : '● Paused'}
              </Badge>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatINR(sip.monthlyAmount)}
              <span className="text-sm font-semibold text-slate-500 ml-1">/ month</span>
            </div>

            {isPaused ? (
              <div className="mt-2.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Paused · Auto-resumes on <strong>{sip.autoResumeDate || '10th November 2026'}</strong></span>
              </div>
            ) : (
              <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Next Auto-Debit: <strong className="text-slate-800">{sip.nextDebitDate}</strong>
              </p>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            {isPaused ? (
              <>
                <button
                  id="btn-resume-sip-now"
                  onClick={onResumeSIPNow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Resume now</span>
                </button>
                <button
                  onClick={onStartSIPDecisionFlow}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Settings
                </button>
              </>
            ) : (
              <>
                <span className="text-xs text-slate-500">
                  {sip.sipHistoryCount} straight months
                </span>
                <Button
                  id="btn-manage-sip"
                  size="sm"
                  variant="secondary"
                  onClick={onStartSIPDecisionFlow}
                  className="border-teal-300 text-teal-800 hover:bg-teal-50"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                  Manage / Pause
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Card 3: Primary Goal Progress */}
        <Card className="p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-rose-500" />
                Primary Goal
              </span>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {goal.onTrackStatus}
              </span>
            </div>

            <div className="text-xl font-bold text-slate-900">
              {goal.title}
            </div>

            <div className="flex items-baseline justify-between mt-1 text-xs text-slate-600">
              <span>Target: <strong className="text-slate-900">{formatInLakhs(goal.targetAmount)}</strong></span>
              <span>Horizon: <strong>{goal.yearsRemaining} yrs</strong></span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Accumulated: {formatINR(goal.currentAccumulated)}</span>
                <span className="text-teal-700 font-bold">{goal.progressPct}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progressPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Required: ~{formatINR(goal.monthlyRequired)}/mo</span>
            <button 
              onClick={onNavigateToGoals}
              className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1"
            >
              Goal Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

      </div>

      {/* Secondary Detailed Section: Market Context & Asset Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Market Context Brief */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Current Market Context & Volatility Index</h3>
                <p className="text-xs text-slate-500">Real-time macro intelligence observed by NiveshIQ</p>
              </div>
            </div>
            <Badge variant="warning" size="xs">India VIX: {market.indiaVix} ({market.vixChange})</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">NIFTY 50 Index</div>
              <div className="text-lg font-bold text-rose-600 flex items-center gap-1 mt-0.5">
                <TrendingDown className="w-4 h-4" /> {market.niftyToday}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1">24,380.50 pts</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Drawdown from High</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                {market.marketDropFromHigh}%
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">Discounted NAV territory</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Historical Pullback Trend</div>
              <div className="text-lg font-bold text-teal-700 mt-0.5">18 of 18 Recovered</div>
              <div className="text-[11px] text-slate-500 mt-1">15-year historical SIP recovery</div>
            </div>
          </div>

          {/* Context Explainer */}
          <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-teal-950">AI Context Observation: </strong>
              {market.historicalContext}
            </div>
          </div>
        </div>

        {/* Portfolio Asset Allocation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">Asset Allocation</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Balanced Mix</span>
            </div>

            <div className="space-y-3 mt-4">
              {portfolio.assetAllocation.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-700 font-medium">
                    <span>{item.name}</span>
                    <span className="font-bold text-slate-900">{item.percentage}% ({formatINR(item.value)})</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Moderate allocation cushions drawdown impact.</span>
          </div>
        </div>

      </div>

      {/* Quick Action Footer / Disclaimer */}
      <DisclaimerBanner />

    </div>
  );
}
