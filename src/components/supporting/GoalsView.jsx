import React from 'react';
import { Target, Calendar, ArrowRight, ShieldCheck, TrendingUp, CheckCircle } from 'lucide-react';
import { formatINR, formatInLakhs } from '../../utils/formatters';
import { Badge, Card, Button } from '../common/UIComponents';

export function GoalsView({ userData, onTriggerSIPChange }) {
  const { goal, sip } = userData;

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Goals Tracker</h1>
          <p className="text-xs sm:text-sm text-slate-500">Track target corpus milestones and monthly commitment health</p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={onTriggerSIPChange}
        >
          Adjust Goal SIP
        </Button>
      </div>

      {/* Primary Goal Highlight Card */}
      <Card className="p-6 border-2 border-teal-300 bg-gradient-to-b from-teal-50/20 to-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-600 text-white shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{goal.title}</h3>
                <Badge variant="primary" size="xs">Primary Goal</Badge>
              </div>
              <p className="text-xs text-slate-500">Category: {goal.category} • Target Date: Dec {goal.targetYear}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-500">Target Corpus</div>
            <div className="text-2xl font-extrabold text-slate-900">{formatInLakhs(goal.targetAmount)}</div>
          </div>
        </div>

        {/* Progress Bar & Key Numbers */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Accumulated: {formatINR(goal.currentAccumulated)} ({goal.progressPct}%)</span>
            <span>Remaining: {formatINR(goal.targetAmount - goal.currentAccumulated)}</span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
              style={{ width: `${goal.progressPct}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">Investment Horizon</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">{goal.yearsRemaining} Years Remaining</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">Required Monthly SIP</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">~{formatINR(goal.monthlyRequired)}/mo</div>
          </div>
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
            <div className="text-xs text-teal-800">Current SIP Allocated</div>
            <div className="text-base font-bold text-teal-900 mt-0.5">{formatINR(sip.monthlyAmount)}/mo</div>
          </div>
        </div>
      </Card>

    </div>
  );
}
