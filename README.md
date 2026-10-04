# FinLit DecisionGuard 🛡️
> **Contextual AI Financial Co-Pilot for Critical Decision Moments**  
> *Built for FinLit Ventures Product Challenge*

---

## 🎯 Executive Summary & Problem Context

During market volatility, retail investors often react emotionally by pausing SIPs, reducing contributions, or exiting equity positions. Traditional fintech platforms are retrospective—providing dashboards and backward-looking analytics after emotional damage has occurred.

**FinLit DecisionGuard** is an AI-powered decision-support layer that intervenes at the **exact critical moment**—before a financial action is finalized. Rather than acting as a black-box advisor or blocking user intent, DecisionGuard synthesizes the investor's goal horizon, portfolio diversification, and historical market dynamics to illuminate trade-offs, offer balanced alternatives, and keep the user in full control.

---

## 👤 Target Persona: Aarav Sharma
- **Age / Occupation:** 28, Software Engineer (Bangalore)
- **Monthly Income:** ₹95,000
- **Risk Profile & Horizon:** Moderate | 10+ Years
- **Primary Goal:** ₹25,00,000 for Home Down Payment (Current progress: 34% / ₹8,42,600)
- **Active Monthly SIP:** ₹15,000/month across 3 diversified funds
- **Trigger Scenario:** Market drops -2.1% today (-8.4% from all-time highs); Aarav feels anxious and attempts to pause his SIP.

---

## 🚀 60–90 Second Demo Journey

| Step | Screen | User Action & Experience |
|---|---|---|
| **1** | **Dashboard** | Sees portfolio (₹8,42,600, -2.4% today) and market alert: *"NIFTY 50 -2.1% today (-8.4% from ATH) • Review impact on long-term SIP"*. Clicks **"Review my SIP"**. |
| **2** | **SIP Decision Screen** | Modal appears: *"Change your SIP?"*. User selects **"Pause SIP"**. Instead of immediate confirmation, DecisionGuard prompts: *"Before you pause your SIP... See what this means"*. Clicks **"See what this means"**. |
| **3** | **DecisionGuard AI Intervention (Hero)** | Co-pilot interface synthesizes 4 dimensions (Goal, Portfolio, Market Context, Active SIP) and highlights: *"Because your investment horizon is long (10 yrs), pausing during a short-term decline could reduce accumulated units and slow progress."* User expands **"Why am I seeing this?"** to inspect transparent criteria. Clicks **"See Goal Impact Projection"**. |
| **4** | **Impact Simulator** | Side-by-side comparison of **Keep SIP (₹15,000)** vs **Reduce SIP (₹7,500)** vs **Pause SIP (₹0)** with illustrative 10-year goal trajectories. Highlights **"Want a middle ground?"** suggesting a 50% reduction to preserve cashflow while maintaining compounding. User clicks **"Reduce SIP instead (₹7,500)"** (or "Keep my SIP"). |
| **5** | **Decision Summary** | Confirmation state: *"SIP reduction selected — Your decision is still yours. DecisionGuard simply helped you understand the context before proceeding."* Clicks **"Confirm in prototype"** → Returns to Dashboard with live updated status and toast. |

---

## 🧠 Explainable AI & Financial Guardrails

1. **Non-Deterministic, Educational Language:** Uses compliant terms (*"could"*, *"may"*, *"illustrative projection"*) and clearly flags all forecasts as non-guaranteed.
2. **Zero Black-Box Recommendations:** Every insight directly links to user-specific inputs (10-year horizon, ₹25L target, rupee-cost averaging mechanics).
3. **User Autonomy:** The AI never makes or executes unilateral decisions; it serves strictly as a transparent decision-support layer.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18 + Vite 6
- **Styling:** Tailwind CSS + Bespoke FinTech Design System
- **Icons:** Lucide React
- **State:** Local reactive state with live prototype updates
- **Number Formatting:** Standard Indian Numbering System (`₹8,42,600`, `₹25 Lakhs`)

---


   ## 🔗 Live Demo
   https://nivesh-iq-flax.vercel.app/

   ## Run locally
   npm install
   npm run dev
   Then open http://localhost:5173