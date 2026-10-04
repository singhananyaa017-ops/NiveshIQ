import React, { useState } from 'react';
import { INITIAL_USER_DATA } from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { PortfolioView } from './components/supporting/PortfolioView';
import { GoalsView } from './components/supporting/GoalsView';
import { AIInsightsView } from './components/supporting/AIInsightsView';
import { SIPDecisionModal } from './components/flow/SIPDecisionModal';
import { ReasonCheckModal } from './components/flow/ReasonCheckModal';
import { DecisionGuardIntervention } from './components/flow/DecisionGuardIntervention';
import { ImpactSimulator } from './components/flow/ImpactSimulator';
import { DecisionSummary } from './components/flow/DecisionSummary';
import { PersonaModal } from './components/common/PersonaModal';
import { DemoWalkthroughGuide } from './components/common/DemoWalkthroughGuide';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { formatINR } from './utils/formatters';

export function App() {
  // Main state
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'portfolio' | 'goals' | 'insights'
  
  // Flow state
  const [activeFlowStep, setActiveFlowStep] = useState(null); // null | 'step2_options' | 'step2_reason' | 'step3_intervention' | 'step4_simulator' | 'step5_summary'
  const [selectedFlowAction, setSelectedFlowAction] = useState('pause'); // 'pause' | 'reduce' | 'keep'
  const [selectedReason, setSelectedReason] = useState('market_fear'); // 'market_fear' | 'need_cash' | 'lost_confidence' | 'other' | null
  
  // Modals state
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);

  // Live Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, duration = 4500) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  // Handlers for Decision Flow
  const handleStartSIPFlow = () => {
    setSelectedFlowAction('pause');
    setActiveFlowStep('step2_options');
  };

  const handleTriggerReasonCheck = (action) => {
    setSelectedFlowAction(action);
    setActiveFlowStep('step2_reason');
  };

  const handleSelectReasonAndProceed = (reason) => {
    setSelectedReason(reason);
    setActiveFlowStep('step3_intervention');
  };

  const handleProceedToSimulator = () => {
    setActiveFlowStep('step4_simulator');
  };

  const handleSelectFinalDecision = (decisionType) => {
    setSelectedFlowAction(decisionType);
    setActiveFlowStep('step5_summary');
  };

  const handleConfirmAndReturnToDashboard = (finalDecision, pauseDuration = 1, autoResumeDate = '10th November 2026') => {
    // Update local prototype state
    if (finalDecision === 'keep') {
      setUserData(prev => ({
        ...prev,
        sip: {
          ...prev.sip,
          status: 'Active',
          monthlyAmount: 15000,
          pauseDuration: null,
          autoResumeDate: null
        }
      }));
      showToast('✨ Decision recorded: Continuing ₹15,000 monthly SIP with disciplined compounding!');
    } else if (finalDecision === 'reduce') {
      setUserData(prev => ({
        ...prev,
        sip: {
          ...prev.sip,
          status: 'Reduced',
          monthlyAmount: 7500,
          pauseDuration: null,
          autoResumeDate: null
        }
      }));
      showToast('⚖️ Decision recorded: SIP reduced to ₹7,500/month. Trajectory preserved at 87% pace.');
    } else if (finalDecision === 'pause') {
      setUserData(prev => ({
        ...prev,
        sip: {
          ...prev.sip,
          status: 'Paused',
          monthlyAmount: 0,
          pauseDuration: pauseDuration,
          autoResumeDate: autoResumeDate
        }
      }));
      showToast(`⏸️ Smart Pause activated: Paused for ${pauseDuration} mo. Auto-resumes on ${autoResumeDate}.`);
    }

    // Close flow and return to dashboard
    setActiveFlowStep(null);
    setActiveTab('dashboard');
  };

  const handleResumeSIPNow = () => {
    setUserData(prev => ({
      ...prev,
      sip: {
        ...prev.sip,
        status: 'Active',
        monthlyAmount: 15000,
        pauseDuration: null,
        autoResumeDate: null
      }
    }));
    showToast('✨ SIP resumed! Automatic ₹15,000 monthly debits restored on schedule.');
  };

  const handleResetDemoData = () => {
    setUserData(INITIAL_USER_DATA);
    setSelectedReason('market_fear');
    setActiveFlowStep(null);
    setActiveTab('dashboard');
    showToast('🔄 Demo data reset to initial state.');
  };

  const handleJumpToDemoStep = (stepKey) => {
    if (stepKey === 'dashboard') {
      setActiveFlowStep(null);
      setActiveTab('dashboard');
    } else {
      setActiveFlowStep(stepKey);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900 selection:bg-teal-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPersona={() => setIsPersonaOpen(true)}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
        marketData={userData.market}
        userData={userData}
        onResetData={handleResetDemoData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Active Tab Views */}
        {activeTab === 'dashboard' && (
          <Dashboard
            userData={userData}
            onStartSIPDecisionFlow={handleStartSIPFlow}
            onResumeSIPNow={handleResumeSIPNow}
            onNavigateToPortfolio={() => setActiveTab('portfolio')}
            onNavigateToGoals={() => setActiveTab('goals')}
            onNavigateToInsights={() => setActiveTab('insights')}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioView
            userData={userData}
            onTriggerSIPChange={handleStartSIPFlow}
            onResumeSIPNow={handleResumeSIPNow}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsView
            userData={userData}
            onTriggerSIPChange={handleStartSIPFlow}
          />
        )}

        {activeTab === 'insights' && (
          <AIInsightsView
            userData={userData}
            onTriggerSIPChange={handleStartSIPFlow}
          />
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPersona={() => setIsPersonaOpen(true)}
      />

      {/* ========================================================================= */}
      {/* DECISION FLOW MODALS (Screens 2 -> 2b -> 3 -> 4 -> 5) */}
      {/* ========================================================================= */}
      
      {/* Screen 2: SIP Options Screen */}
      <SIPDecisionModal
        isOpen={activeFlowStep === 'step2_options'}
        onClose={() => setActiveFlowStep(null)}
        onTriggerDecisionGuard={handleTriggerReasonCheck}
        currentSIPAmount={userData.sip.monthlyAmount || 15000}
        reducedSIPAmount={userData.sip.reducedAmount || 7500}
        goalTitle={userData.goal.title}
      />

      {/* Screen 2b: Reason Check Step */}
      <ReasonCheckModal
        isOpen={activeFlowStep === 'step2_reason'}
        selectedAction={selectedFlowAction}
        onSelectReasonAndProceed={handleSelectReasonAndProceed}
        onBack={() => setActiveFlowStep('step2_options')}
        onClose={() => setActiveFlowStep(null)}
      />

      {/* Screen 3: DecisionGuard Hero AI Intervention */}
      {activeFlowStep === 'step3_intervention' && (
        <DecisionGuardIntervention
          selectedAction={selectedFlowAction}
          selectedReason={selectedReason}
          userData={userData}
          onProceedToSimulator={handleProceedToSimulator}
          onBackToReasonCheck={() => setActiveFlowStep('step2_reason')}
          onClose={() => setActiveFlowStep(null)}
        />
      )}

      {/* Screen 4: Impact Simulator */}
      {activeFlowStep === 'step4_simulator' && (
        <ImpactSimulator
          userData={userData}
          onSelectFinalDecision={handleSelectFinalDecision}
          onBackToIntervention={() => setActiveFlowStep('step3_intervention')}
          onClose={() => setActiveFlowStep(null)}
        />
      )}

      {/* Screen 5: Decision Summary & Confirmation */}
      {activeFlowStep === 'step5_summary' && (
        <DecisionSummary
          decisionType={selectedFlowAction}
          userData={userData}
          onConfirmAndReturnToDashboard={handleConfirmAndReturnToDashboard}
          onClose={() => setActiveFlowStep(null)}
        />
      )}

      {/* Persona Profile Modal */}
      <PersonaModal
        isOpen={isPersonaOpen}
        onClose={() => setIsPersonaOpen(false)}
        persona={userData.persona}
        sip={userData.sip}
        goal={userData.goal}
      />

      {/* Evaluator 60-90s Demo Guide Modal */}
      <DemoWalkthroughGuide
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        currentStep={activeFlowStep || activeTab}
        onJumpToStep={handleJumpToDemoStep}
        onResetDemo={handleResetDemoData}
      />

      {/* Interactive Live Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
