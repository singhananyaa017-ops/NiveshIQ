export const INITIAL_USER_DATA = {
  persona: {
    name: "Aarav Sharma",
    age: 28,
    role: "Software Engineer",
    monthlyIncome: 95000,
    experienceLevel: "Beginner / Intermediate",
    riskProfile: "Moderate",
    investmentHorizon: "10+ years",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    joinDate: "March 2022",
  },
  portfolio: {
    totalValue: 842600,
    investedValue: 710000,
    totalReturns: 132600,
    totalReturnsPct: 18.68,
    todayChangeAmount: -20220,
    todayChangePct: -2.4,
    assetAllocation: [
      { name: "Large Cap & Flexi Cap", percentage: 55, value: 463430, color: "#0D9488" },
      { name: "Mid & Small Cap", percentage: 20, value: 168520, color: "#2563EB" },
      { name: "Debt & Arbitrage", percentage: 20, value: 168520, color: "#64748B" },
      { name: "Gold / Commodities", percentage: 5, value: 42130, color: "#F59E0B" },
    ],
    funds: [
      {
        id: "f1",
        name: "Parag Parikh Flexi Cap Fund",
        category: "Flexi Cap",
        nav: 74.20,
        todayChange: -2.3,
        sipAmount: 7000,
        currentValue: 395000,
        status: "Active"
      },
      {
        id: "f2",
        name: "Mirae Asset Large Cap Fund",
        category: "Large Cap",
        nav: 104.85,
        todayChange: -1.9,
        sipAmount: 5000,
        currentValue: 282600,
        status: "Active"
      },
      {
        id: "f3",
        name: "HDFC Short Term Debt Fund",
        category: "Short Duration Debt",
        nav: 29.40,
        todayChange: +0.02,
        sipAmount: 3000,
        currentValue: 165000,
        status: "Active"
      }
    ]
  },
  sip: {
    status: "Active", // "Active" | "Reduced" | "Paused"
    monthlyAmount: 15000,
    reducedAmount: 7500,
    nextDebitDate: "10th October 2026",
    debitBank: "HDFC Bank (••4821)",
    sipHistoryCount: 38, // months active
    consecutiveSuccessful: 38,
  },
  goal: {
    id: "g1",
    title: "Home Down Payment",
    category: "Real Estate",
    targetAmount: 2500000,
    currentAccumulated: 842600,
    progressPct: 34,
    targetYear: 2036,
    yearsRemaining: 10,
    monthlyRequired: 14200,
    onTrackStatus: "On Track",
  },
  market: {
    niftyToday: -2.1,
    sensexToday: -1.95,
    indiaVix: 18.4,
    vixChange: "+14.2%",
    volatilityLevel: "Elevated Volatility",
    marketDropFromHigh: -8.4,
    marketCommentary: "Global macro headwinds and FII profit-booking trigger a temporary pullback in benchmark indices.",
    historicalContext: "Over the last 15 years, NIFTY 50 experienced 18 pullbacks of 5-10%. In 100% of these historical instances, systematic rupee-cost averaging investors accumulated higher units at discount.",
  },
  scenarios: {
    keep: {
      id: "keep",
      title: "Keep Current SIP",
      monthlyAmount: 15000,
      description: "Maintain systematic rupee cost averaging during market dip",
      projectedCorpus10Yr: 3120000,
      goalAchievementPct: 125,
      timelineYears: 7.5,
      unitAccumulationPace: "Optimal (Buying extra units on dip)",
      pros: ["Maximizes Rupee Cost Averaging", "Goal achieved ~2.5 yrs ahead of deadline", "Maintains emotional discipline"],
      statusTag: "Strongest Progress",
      tagColor: "emerald"
    },
    reduce: {
      id: "reduce",
      title: "Reduce SIP (50%)",
      monthlyAmount: 7500,
      description: "Moderate middle-ground: reduce cash outflow while preserving investing habit",
      projectedCorpus10Yr: 2180000,
      goalAchievementPct: 87,
      timelineYears: 11.2,
      unitAccumulationPace: "Moderate",
      pros: ["Preserves ₹7,500/mo liquidity", "Keeps compounding active", "Avoids complete detachment"],
      statusTag: "Slower Progress",
      tagColor: "amber"
    },
    pause: {
      id: "pause",
      title: "Pause SIP (0%)",
      monthlyAmount: 0,
      description: "Halt all fresh investments until market sentiment recovers",
      projectedCorpus10Yr: 1540000,
      goalAchievementPct: 61,
      timelineYears: 14.8,
      unitAccumulationPace: "Halted",
      pros: ["Immediate ₹15,000 cash retention"],
      statusTag: "Slower Still",
      tagColor: "rose"
    }
  },
  explainability: {
    factors: [
      {
        icon: "Target",
        label: "Your Goal",
        value: "Home Down Payment (₹25L in 10 yrs)",
        detail: "Long investment horizon gives ample time to absorb short-term cycles."
      },
      {
        icon: "Shield",
        label: "Your Risk Profile",
        value: "Moderate (Equity: 75% | Debt: 25%)",
        detail: "Portfolio is already structured to dampen extreme volatility."
      },
      {
        icon: "TrendingDown",
        label: "Market Context",
        value: "NIFTY 50 is down 2.1% today (-8.4% from peak)",
        detail: "Market dips allow SIPs to accumulate more mutual fund units at lower NAVs."
      },
      {
        icon: "RefreshCw",
        label: "Active SIP",
        value: "₹15,000 / month across 3 verified funds",
        detail: "Consistent 38-month track record creates compounding momentum."
      }
    ],
    whyPoints: [
      "Your 10-year investment horizon is well-suited to absorb short-term corrections.",
      "Pausing during market declines eliminates the primary mathematical advantage of SIP: Rupee-Cost Averaging.",
      "NiveshIQ does NOT predict future stock prices or execute changes automatically.",
      "The final decision rests 100% with you."
    ]
  }
};
