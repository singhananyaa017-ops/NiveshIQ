import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 py-2 px-3 rounded-lg border border-slate-200">
        <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
        <span>
          <strong>Decision support only:</strong> NiveshIQ provides educational context and does not guarantee returns or execute transactions autonomously.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 text-xs text-slate-600 flex items-start gap-3">
      <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 shrink-0 mt-0.5">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div>
        <span className="font-semibold text-slate-800">Financial Safety & Responsible AI: </span>
        NiveshIQ provides educational decision support based on the information available. It does not predict markets or guarantee returns. Final investment decisions remain 100% with you.
      </div>
    </div>
  );
}
