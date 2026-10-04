import React from 'react';
import { Layers, TrendingDown, TrendingUp, SlidersHorizontal, AlertCircle, CheckCircle2, ChevronRight, Shield, PlayCircle } from 'lucide-react';
import { formatINR, formatPercent } from '../../utils/formatters';
import { Badge, Card, Button } from '../common/UIComponents';

export function PortfolioView({ userData, onTriggerSIPChange, onResumeSIPNow }) {
  const { portfolio, sip } = userData;
  const isPaused = sip.status === 'Paused';

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio & Mutual Fund Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500">Track mutual funds, asset weights, and active SIP schedules</p>
        </div>

        <div className="flex items-center gap-2">
          {isPaused && onResumeSIPNow && (
            <button
              onClick={onResumeSIPNow}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Resume SIP</span>
            </button>
          )}
          <Button
            size="sm"
            variant="primary"
            onClick={onTriggerSIPChange}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
            Manage Active SIP
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Total Portfolio Value</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatINR(portfolio.totalValue)}</div>
          <div className="text-xs text-rose-600 font-semibold mt-1">Today: {portfolio.todayChangePct}% ({formatINR(portfolio.todayChangeAmount)})</div>
        </Card>

        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Total Invested Amount</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatINR(portfolio.investedValue)}</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">Overall Returns: +{portfolio.totalReturnsPct}% ({formatINR(portfolio.totalReturns)})</div>
        </Card>

        <Card className={`p-5 ${isPaused ? 'bg-rose-50/40 border-rose-200' : 'bg-teal-50/40 border-teal-200'}`}>
          <div className={`text-xs font-semibold ${isPaused ? 'text-rose-800' : 'text-teal-800'}`}>
            {isPaused ? 'SIP Status (Smart Paused)' : 'Current Active SIP'}
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {isPaused ? 'Paused (₹0/mo)' : `${formatINR(sip.monthlyAmount)} / mo`}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {isPaused ? `Auto-resumes on ${sip.autoResumeDate || '10th November 2026'}` : `Next debit: ${sip.nextDebitDate}`}
          </div>
        </Card>
      </div>

      {/* Fund Holdings Table */}
      <Card className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Fund Holdings & SIP Allocation</h3>
          <span className="text-xs text-slate-500">3 verified schemes</span>
        </div>

        <div className="space-y-3">
          {portfolio.funds.map((fund) => (
            <div key={fund.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{fund.name}</span>
                  <Badge variant="default" size="xs">{fund.category}</Badge>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Current NAV: ₹{fund.nav}</span>
                  <span className={fund.todayChange < 0 ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'}>
                    {formatPercent(fund.todayChange)} today
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-500">Current Value</div>
                  <div className="text-sm font-bold text-slate-900">{formatINR(fund.currentValue)}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-500">SIP Commitment</div>
                  <div className={`text-sm font-bold ${isPaused ? 'text-slate-400 line-through' : 'text-teal-700'}`}>
                    {formatINR(fund.sipAmount)}/mo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
