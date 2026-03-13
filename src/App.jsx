import { useState, useEffect, useRef } from "react";

const questions = [
  {
    id: 1,
    text: "When you picture your ideal workday, which vibe fits best?",
    answers: [
      { text: "Out in the field making deals happen face-to-face", scores: { realestate: 2, homeservices: 2 } },
      { text: "At my desk working on my own schedule — no boss, no clock", scores: { affiliate: 2, freelancing: 2 } },
      { text: "On the phone or Zoom closing deals and stacking commissions", scores: { sales: 2, realestate: 1 } },
      { text: "Building or fixing something real with my hands", scores: { homeservices: 2, realestate: 1 } },
    ],
  },
  {
    id: 2,
    text: "Your biggest financial goal right now is:",
    answers: [
      { text: "Passive income — make money while I sleep", scores: { affiliate: 2, shopify: 2 } },
      { text: "High monthly cash flow, even if I have to work hard for it", scores: { sales: 2, homeservices: 2 } },
      { text: "Build something I can eventually sell or scale big", scores: { shopify: 2, realestate: 1 } },
      { text: "Consistent income I control, not tied to a 9-to-5", scores: { freelancing: 2, affiliate: 1 } },
    ],
  },
  {
    id: 3,
    text: "How comfortable are you with financial risk?",
    answers: [
      { text: "I'm a calculated risk-taker — big moves, big rewards", scores: { daytrading: 2, realestate: 2 } },
      { text: "I like risk when I control the outcome", scores: { sales: 2, homeservices: 1 } },
      { text: "I prefer low upfront cost, low risk, learn as I go", scores: { affiliate: 2, social: 2 } },
      { text: "I want stable income — risk makes me anxious", scores: { freelancing: 2, homeservices: 1 } },
    ],
  },
  {
    id: 4,
    text: "Which skill feels most natural to you?",
    answers: [
      { text: "Convincing people and building trust quickly", scores: { sales: 2, realestate: 2 } },
      { text: "Creating content or spotting trends", scores: { social: 2, affiliate: 2 } },
      { text: "Analyzing data, charts, or market patterns", scores: { daytrading: 2, affiliate: 1 } },
      { text: "Organizing systems and running efficient operations", scores: { shopify: 2, homeservices: 2 } },
    ],
  },
  {
    id: 5,
    text: "What's your relationship with social media?",
    answers: [
      { text: "I'm always online — I know what's trending before everyone else", scores: { social: 2, affiliate: 2 } },
      { text: "I use it but I'm not obsessed with it", scores: { shopify: 1, freelancing: 1 } },
      { text: "I post occasionally but don't think about growing an audience", scores: { sales: 1, realestate: 1 } },
      { text: "I barely use it — not really my thing", scores: { homeservices: 2, daytrading: 1 } },
    ],
  },
  {
    id: 6,
    text: "How do you feel about talking to strangers or clients?",
    answers: [
      { text: "I love it — conversations energize me", scores: { sales: 2, realestate: 2 } },
      { text: "I'm good at it when there's something at stake", scores: { sales: 1, homeservices: 2 } },
      { text: "I prefer written communication over calls or meetings", scores: { affiliate: 2, freelancing: 2 } },
      { text: "I'd rather work behind the scenes, no client contact needed", scores: { daytrading: 2, shopify: 1 } },
    ],
  },
  {
    id: 7,
    text: "If someone handed you a clear roadmap to follow, you'd feel…",
    answers: [
      { text: "Relieved — I just need to know the proven path and I'll execute it", scores: { shopify: 2, affiliate: 2 } },
      { text: "Skeptical — I'd want to understand why each step works before committing", scores: { daytrading: 2, realestate: 1 } },
      { text: "Excited — I'd start immediately and figure out the rest as I go", scores: { sales: 2, homeservices: 2 } },
      { text: "Dependent — I'd rather have someone guiding me through it", scores: { freelancing: 2, social: 1 } },
    ],
  },
  {
    id: 8,
    text: "How do you feel about learning technical skills like coding, SEO, or analytics?",
    answers: [
      { text: "I'm into it — I actually enjoy learning tech stuff", scores: { affiliate: 2, shopify: 2 } },
      { text: "I'll learn what I have to, but I'd rather stay on the people side", scores: { sales: 2, realestate: 1 } },
      { text: "I like data and numbers — charts and systems are my thing", scores: { daytrading: 2, affiliate: 1 } },
      { text: "I prefer hands-on, practical skills I can apply immediately", scores: { homeservices: 2, realestate: 1 } },
    ],
  },
  {
    id: 9,
    text: "How patient are you when it comes to results?",
    answers: [
      { text: "Very patient — I think long-term and play the slow game", scores: { realestate: 2, affiliate: 2 } },
      { text: "Moderately patient — I want to see progress within a few months", scores: { shopify: 2, freelancing: 1 } },
      { text: "I like fast feedback — I want to know quickly if something works", scores: { sales: 2, social: 1 } },
      { text: "I need to see results fast — waiting too long burns me out", scores: { homeservices: 2, daytrading: 1 } },
    ],
  },
  {
    id: 10,
    text: "When you've made money before, what felt the best about it?",
    answers: [
      { text: "Knowing it could keep coming in without me doing more work", scores: { affiliate: 2, shopify: 2 } },
      { text: "The gap between what I paid and what I got — that spread felt like a win", scores: { realestate: 2, daytrading: 2 } },
      { text: "Getting paid because I was the best person for that specific thing", scores: { freelancing: 2, homeservices: 1 } },
      { text: "Having a client or business depend on me every single month", scores: { sales: 2, social: 2 } },
    ],
  },
  {
    id: 11,
    text: "How do you feel about managing a team or hiring workers?",
    answers: [
      { text: "I want to grow a real operation with employees eventually", scores: { homeservices: 2, realestate: 1 } },
      { text: "I prefer to stay solo — I work best alone", scores: { daytrading: 2, freelancing: 2 } },
      { text: "I'm open to it once the money is there", scores: { shopify: 2, sales: 1 } },
      { text: "I'd rather outsource or automate than manage people", scores: { affiliate: 2, shopify: 1 } },
    ],
  },
  {
    id: 12,
    text: "Which of these feels closest to where you're at right now?",
    answers: [
      { text: "I'm creative, make content, and have some kind of online presence", scores: { social: 2, affiliate: 2 } },
      { text: "I'm handy, technical, and already doing skilled work", scores: { homeservices: 2, realestate: 1 } },
      { text: "I'm a hustler — I've sold things or convinced people to do stuff", scores: { sales: 2, shopify: 1 } },
      { text: "I'm analytical — I've tracked budgets, markets, or data before", scores: { daytrading: 2, realestate: 1 } },
    ],
  },
  {
    id: 13,
    text: "When you imagine telling people what you do, what feeling do you want them to have?",
    answers: [
      { text: "That you move freely and aren't tied down to anything or anyone", scores: { affiliate: 2, freelancing: 2 } },
      { text: "That you built something real that employs people and runs itself", scores: { homeservices: 2, shopify: 2 } },
      { text: "That you're someone serious players in your city call when they need things done", scores: { realestate: 2, sales: 2 } },
      { text: "That you figured out how money actually works while everyone else was clocking in", scores: { daytrading: 2, affiliate: 1 } },
    ],
  },
  {
    id: 14,
    text: "How much startup money are you realistically working with?",
    answers: [
      { text: "Little to none — I need a path that's nearly free to start", scores: { social: 2, affiliate: 2 } },
      { text: "A few hundred dollars — I can invest a little", scores: { shopify: 2, homeservices: 1 } },
      { text: "A few thousand — I'm willing to put in some real capital", scores: { daytrading: 2, realestate: 1 } },
      { text: "I have access to credit or capital and I'm ready to invest", scores: { realestate: 2, shopify: 1 } },
    ],
  },
  {
    id: 15,
    text: "What's your biggest fear about choosing a career path?",
    answers: [
      { text: "Picking something that takes forever and never pays off", scores: { sales: 2, homeservices: 2 } },
      { text: "Getting stuck working for someone else forever", scores: { freelancing: 2, affiliate: 2 } },
      { text: "Losing money on something that doesn't work", scores: { daytrading: 1, shopify: 1 } },
      { text: "Not being good enough at something to succeed", scores: { freelancing: 1, social: 1 } },
    ],
  },
];

const careers = {
  shopify: {
    name: "Shopify Dropshipping",
    emoji: "📦",
    color: "#3b82f6",
    tagline: "The Builder Who Moves Fast",
    description: "You're a systems thinker who moves fast and loves the thrill of building something from scratch. Shopify dropshipping lets you run a real product business without holding inventory — pure leverage, pure execution.",
    steps: ["Pick a niche and winning product", "Set up your Shopify store", "Launch your first ad campaign", "Optimize and scale what works"],
    ctaUrl: "#",
  },
  social: {
    name: "Social Media Marketing",
    emoji: "📱",
    color: "#8b5cf6",
    tagline: "The Connector Who Creates Culture",
    description: "You have a natural ability to read rooms, create energy, and communicate ideas in ways that land. Social media marketing turns that instinct into income — and brands will pay serious money for someone who truly gets it.",
    steps: ["Choose one platform to dominate", "Build your own presence first", "Land your first client or brand deal", "Package your services and scale"],
    ctaUrl: "#",
  },
  affiliate: {
    name: "Affiliate Marketing",
    emoji: "🔗",
    color: "#06b6d4",
    tagline: "The Strategist Who Earns While Sleeping",
    description: "You're methodical, patient, and you love finding the angle no one else sees. Affiliate marketing rewards your ability to understand people and craft messaging that converts — building income streams that run on autopilot.",
    steps: ["Choose a profitable niche", "Build a content channel (blog, YouTube, or newsletter)", "Integrate affiliate offers", "Grow traffic and compound your earnings"],
    ctaUrl: "#",
  },
  sales: {
    name: "High Ticket Sales",
    emoji: "💰",
    color: "#f59e0b",
    tagline: "The Closer Who Earns What They Deserve",
    description: "You're magnetic, persuasive, and you understand people on an instinctive level. High ticket sales is one of the few skills where your earning potential is genuinely unlimited — and the best closers never have to look for work.",
    steps: ["Study persuasion and sales psychology", "Get placed on a remote sales team", "Close your first high-ticket deal", "Build your reputation and raise your rates"],
    ctaUrl: "#",
  },
  realestate: {
    name: "Real Estate",
    emoji: "🏠",
    color: "#10b981",
    tagline: "The Owner Who Builds Generational Wealth",
    description: "You think in assets, not hours. Real estate aligns with your desire to own something real, build equity over time, and create wealth that outlasts you. Whether it's wholesaling, flipping, or rentals — this is your lane.",
    steps: ["Learn your local market inside and out", "Get your license or find a wholesale deal", "Close your first transaction", "Reinvest and build your portfolio"],
    ctaUrl: "#",
  },
  daytrading: {
    name: "Day Trading",
    emoji: "📈",
    color: "#ef4444",
    tagline: "The Analyst Who Sees the Matrix",
    description: "You're analytical, independent, and you thrive under pressure. Day trading rewards pattern recognition, discipline, and the ability to act without emotion — skills that come naturally to people like you.",
    steps: ["Learn market fundamentals and chart reading", "Paper trade until consistently profitable", "Start small with real capital", "Develop your personal system and edge"],
    ctaUrl: "#",
  },
  freelancing: {
    name: "Creative Freelancing",
    emoji: "✏️",
    color: "#f97316",
    tagline: "The Craftsman Who Builds a Personal Empire",
    description: "You have a rare combination: creative talent and the drive to build something on your own terms. Creative freelancing lets you do the work you love while earning what you're worth — and the best freelancers evolve into agencies.",
    steps: ["Identify your core skill and niche it down", "Build a portfolio of 3–5 strong pieces", "Land your first paying client", "Raise your rates and build recurring revenue"],
    ctaUrl: "#",
  },
  homeservices: {
    name: "Home Services",
    emoji: "🔧",
    color: "#84cc16",
    tagline: "The Builder Who Prefers Real Results",
    description: "You're a doer. You prefer tangible results over abstract theories, and you build momentum by taking action. Home services — detailing, pressure washing, HVAC, landscaping — let you start fast, scale smart, and own your income.",
    steps: ["Pick one service and learn it completely", "Get basic equipment and insurance", "Land your first 5 clients", "Reinvest into equipment and hire help"],
    ctaUrl: "#",
  },
};

// ── tiny helpers ────────────────────────────────────────────────────────────
function useAnimateIn(trigger) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (trigger) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    }
  }, [trigger]);
  return visible;
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onStart }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ambient orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
        {/* grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div style={{
        position: "relative",
        maxWidth: 720,
        width: "100%",
        textAlign: "center",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 100, padding: "6px 16px",
          marginBottom: 40,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Career Diagnostic</span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(44px, 7vw, 80px)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#f8fafc",
          margin: "0 0 28px",
          letterSpacing: "-0.02em",
        }}>
          Discover the Career<br />
          <span style={{ color: "#3b82f6", fontStyle: "italic" }}>Path That Fits You</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18,
          lineHeight: 1.7,
          color: "#94a3b8",
          maxWidth: 520,
          margin: "0 auto 52px",
        }}>
          Ascend analyzes how you approach work, pressure, and growth to identify the modern career path where you'll thrive.
        </p>

        {/* stats row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 52 }}>
          {[["15", "Questions"], ["8", "Career Paths"], ["~5 min", "Duration"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f8fafc" }}>{val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475569" }}>{label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "18px 44px",
            fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 0 40px rgba(59,130,246,0.35), 0 8px 32px rgba(0,0,0,0.4)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 60px rgba(59,130,246,0.5), 0 12px 40px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 40px rgba(59,130,246,0.35), 0 8px 32px rgba(0,0,0,0.4)"; }}
        >
          Take the Career Quiz →
        </button>
      </div>
    </div>
  );
}

// ── compute scores from answers array ────────────────────────────────────────
function computeScores(answers) {
  const scores = { shopify: 0, social: 0, affiliate: 0, sales: 0, realestate: 0, daytrading: 0, freelancing: 0, homeservices: 0 };
  answers.forEach((ansIdx, qIdx) => {
    if (ansIdx === null) return;
    const ans = questions[qIdx].answers[ansIdx];
    Object.entries(ans.scores).forEach(([k, v]) => { scores[k] += v; });
  });
  return scores;
}

// ── QUIZ ──────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  // answers[i] = selected answer index for question i, or null
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState("forward"); // "forward" | "back"

  const q = questions[current];
  const selected = answers[current];
  const progress = (current / questions.length) * 100;

  function selectAnswer(idx) {
    if (animating) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function handleNext() {
    if (selected === null || animating) return;
    setAnimating(true);
    setDirection("forward");
    setVisible(false);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        onComplete(computeScores(answers));
      } else {
        setCurrent(c => c + 1);
        setVisible(true);
        setAnimating(false);
      }
    }, 280);
  }

  function handleBack() {
    if (current === 0 || animating) return;
    setAnimating(true);
    setDirection("back");
    setVisible(false);

    setTimeout(() => {
      setCurrent(c => c - 1);
      setVisible(true);
      setAnimating(false);
    }, 280);
  }

  const translateOut = direction === "forward" ? "-16px" : "16px";
  const translateIn = direction === "forward" ? "16px" : "-16px";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
    }}>
      {/* bg glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 680 }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475569", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Question {current + 1} of {questions.length}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 48, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            borderRadius: 4,
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 12px rgba(59,130,246,0.6)",
          }} />
        </div>

        {/* question */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : `translateY(${translateOut})`,
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px, 3.5vw, 30px)",
            fontWeight: 600,
            color: "#f8fafc",
            lineHeight: 1.35,
            marginBottom: 36,
            letterSpacing: "-0.01em",
          }}>
            {q.text}
          </h2>

          {/* answers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.answers.map((ans, i) => {
              const isSelected = selected === i;
              const letters = ["A", "B", "C", "D"];
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  style={{
                    background: isSelected ? "rgba(59,130,246,0.15)" : "rgba(11,18,32,0.8)",
                    border: isSelected ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "18px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    textAlign: "left",
                    transition: "all 0.18s ease",
                    transform: isSelected ? "translateX(4px)" : "translateX(0)",
                    boxShadow: isSelected ? "0 0 0 1px rgba(59,130,246,0.3), 0 4px 24px rgba(59,130,246,0.1)" : "none",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(11,18,32,0.8)"; } }}
                >
                  <div style={{
                    minWidth: 28, height: 28,
                    borderRadius: 7,
                    background: isSelected ? "#3b82f6" : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, fontWeight: 700,
                    color: isSelected ? "#fff" : "#475569",
                    transition: "all 0.18s",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    {letters[i]}
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: isSelected ? "#f8fafc" : "#94a3b8",
                    transition: "color 0.18s",
                  }}>
                    {ans.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* bottom nav row */}
          <div style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 16,
          }}>
            {/* back — secondary link style, hidden on Q1 */}
            {current > 0 && (
              <button
                onClick={handleBack}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#475569",
                  padding: "14px 4px",
                  letterSpacing: "0.01em",
                  transition: "color 0.15s",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(71,85,105,0.4)",
                  textUnderlineOffset: 3,
                }}
                onMouseEnter={e => { e.target.style.color = "#94a3b8"; }}
                onMouseLeave={e => { e.target.style.color = "#475569"; }}
              >
                ← Back
              </button>
            )}

            {/* next — always visible, grayed when nothing selected */}
            <button
              onClick={handleNext}
              disabled={selected === null}
              style={{
                background: selected !== null
                  ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                  : "rgba(255,255,255,0.06)",
                color: selected !== null ? "#fff" : "#334155",
                border: "none",
                borderRadius: 10,
                padding: "14px 36px",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: selected !== null ? "pointer" : "not-allowed",
                letterSpacing: "0.02em",
                boxShadow: selected !== null ? "0 4px 20px rgba(59,130,246,0.4)" : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (selected !== null) { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 28px rgba(59,130,246,0.5)"; } }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = selected !== null ? "0 4px 20px rgba(59,130,246,0.4)" : "none"; }}
            >
              {current + 1 === questions.length ? "See My Results" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOADING ───────────────────────────────────────────────────────────────────
function Loading({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = ["Analyzing your responses…", "Mapping career alignments…", "Generating your result…"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 33) setPhase(0);
    else if (progress < 66) setPhase(1);
    else setPhase(2);
  }, [progress]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        {/* spinner */}
        <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 40px" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)" }} />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#3b82f6",
            animation: "spin 1s linear infinite",
          }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>✦</span>
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#94a3b8", marginBottom: 32, minHeight: 24 }}>{phases[phase]}</p>
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", transition: "width 0.1s linear", boxShadow: "0 0 12px rgba(59,130,246,0.6)" }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results({ scores }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  useEffect(() => {
    if (mounted) {
      const t = setTimeout(() => setStep(1), 400);
      const t2 = setTimeout(() => setStep(2), 800);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [mounted]);

  const topKey = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
  const career = careers[topKey];
  const allScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const maxScore = allScores[0][1] || 1;

  const careerNames = {
    shopify: "Shopify", social: "Social Media", affiliate: "Affiliate",
    sales: "High Ticket Sales", realestate: "Real Estate",
    daytrading: "Day Trading", freelancing: "Freelancing", homeservices: "Home Services",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
      {/* bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${career.color}18 0%, transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
        {/* header label */}
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          textAlign: "center", marginBottom: 16,
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Your Best Path Right Now</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#64748b" }}>
            Based on how you approach work, growth, and risk — your strongest alignment is:
          </p>
        </div>

        {/* main result card */}
        <div style={{
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          background: "#0b1220",
          border: `1px solid ${career.color}33`,
          borderRadius: 20,
          padding: "48px 40px",
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 0 60px ${career.color}15, 0 20px 60px rgba(0,0,0,0.4)`,
          textAlign: "center",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${career.color}, transparent)` }} />

          <div style={{ fontSize: 56, marginBottom: 20, lineHeight: 1 }}>{career.emoji}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: career.color, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
            {career.tagline}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: "#f8fafc",
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}>
            {career.name}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.7, color: "#94a3b8", maxWidth: 520, margin: "0 auto" }}>
            {career.description}
          </p>
        </div>

        {/* roadmap */}
        <div style={{
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          <div style={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 36px 40px", marginBottom: 32 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
              Starter Roadmap — Preview
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {career.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
                  {/* line */}
                  {i < career.steps.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 40, width: 2, height: "calc(100% - 8px)", background: "rgba(255,255,255,0.06)" }} />
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `${career.color}20`,
                    border: `1px solid ${career.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, zIndex: 1,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 16, fontWeight: 700, color: career.color,
                    marginBottom: i < career.steps.length - 1 ? 0 : 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ paddingTop: 10, paddingBottom: i < career.steps.length - 1 ? 24 : 0 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                      Step {i + 1}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#f8fafc", fontWeight: 500 }}>
                      {step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* score breakdown */}
          <div style={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 36px", marginBottom: 32 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
              Your Alignment Scores
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {allScores.map(([key, val]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748b", width: 110, flexShrink: 0 }}>
                    {careerNames[key]}
                  </div>
                  <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(val / maxScore) * 100}%`,
                      background: key === topKey ? `linear-gradient(90deg, ${career.color}, ${career.color}aa)` : "rgba(255,255,255,0.12)",
                      borderRadius: 4,
                      transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.3s",
                      boxShadow: key === topKey ? `0 0 10px ${career.color}60` : "none",
                    }} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: key === topKey ? career.color : "#475569", fontWeight: key === topKey ? 700 : 400, width: 24, textAlign: "right" }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: `linear-gradient(135deg, ${career.color}15 0%, rgba(11,18,32,0.9) 100%)`,
            border: `1px solid ${career.color}30`,
            borderRadius: 20,
            padding: "40px 36px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🗺️</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#f8fafc", marginBottom: 12, fontWeight: 700 }}>
              Unlock the Full 90-Day Roadmap
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#64748b", marginBottom: 32, lineHeight: 1.6 }}>
              Get the complete step-by-step system built specifically for {career.name} — with daily actions, tools, and income milestones.
            </p>
            <a
              href={career.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: `linear-gradient(135deg, ${career.color} 0%, ${career.color}cc 100%)`,
                color: "#fff",
                textDecoration: "none",
                borderRadius: 12,
                padding: "18px 40px",
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow: `0 0 40px ${career.color}40, 0 8px 32px rgba(0,0,0,0.4)`,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Unlock the Full 90-Day Roadmap →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── EMAIL GATE ────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_o4yiriq";
const EMAILJS_TEMPLATE_ID = "template_jiyto9h";
const EMAILJS_PUBLIC_KEY  = "7U6WgajbV4yWB8WaX";

async function sendNotification(name, email, careerName) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = async () => {
      try {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          career_result: careerName,
          reply_to: email,
        });
      } catch (err) {
        console.error("EmailJS error:", err);
      }
      resolve();
    };
    script.onerror = () => resolve();
    // If already loaded, use directly
    if (window.emailjs) {
      document.head.removeChild ? null : null;
      try {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          career_result: careerName,
          reply_to: email,
        }).then(resolve).catch(() => resolve());
      } catch(e) { resolve(); }
    } else {
      document.head.appendChild(script);
    }
  });
}

function EmailGate({ scores, onSubmit }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const topKey    = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
  const careerName = careers[topKey].name;
  const valid     = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit() {
    if (!valid || loading) return;
    setLoading(true);
    setError("");
    await sendNotification(name.trim(), email.trim(), careerName);
    onSubmit({ name: name.trim(), email: email.trim() });
  }

  const inputStyle = {
    width: "100%",
    background: "rgba(11,18,32,0.9)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    color: "#f8fafc",
    outline: "none",
    transition: "border 0.18s",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "48px 24px",
      position: "relative",
    }}>
      {/* glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{
        position: "relative", width: "100%", maxWidth: 480,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        {/* lock icon */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
            fontSize: 24, marginBottom: 24,
          }}>🔍</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: "#f8fafc",
            lineHeight: 1.15, marginBottom: 12,
            letterSpacing: "-0.02em",
          }}>
            Your results are ready.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, color: "#64748b", lineHeight: 1.6,
          }}>
            Enter your name and email to unlock your career path and get your free starter roadmap.
          </p>
        </div>

        {/* form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
            onFocus={e => { e.target.style.border = "1px solid rgba(59,130,246,0.5)"; }}
            onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.1)"; }}
            onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            style={inputStyle}
            onFocus={e => { e.target.style.border = "1px solid rgba(59,130,246,0.5)"; }}
            onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.1)"; }}
            onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          />
          {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ef4444", margin: 0 }}>{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!valid || loading}
          style={{
            width: "100%",
            background: valid ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "rgba(255,255,255,0.06)",
            color: valid ? "#fff" : "#334155",
            border: "none",
            borderRadius: 10,
            padding: "16px",
            fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            cursor: valid ? "pointer" : "not-allowed",
            letterSpacing: "0.02em",
            boxShadow: valid ? "0 4px 20px rgba(59,130,246,0.4)" : "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { if (valid) e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}
        >
          {loading ? "Sending…" : "Show My Results →"}
        </button>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, color: "#334155",
          textAlign: "center", marginTop: 16, lineHeight: 1.5,
        }}>
          No spam. We'll send your results and that's it.
        </p>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]       = useState("hero"); // hero | quiz | gate | loading | results
  const [finalScores, setFinalScores] = useState(null);
  const [lead, setLead]           = useState(null);

  function handleQuizComplete(scores) {
    setFinalScores(scores);
    setScreen("gate");
  }

  function handleGateSubmit(leadData) {
    setLead(leadData);
    setScreen("loading");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {screen === "hero"    && <Hero onStart={() => setScreen("quiz")} />}
      {screen === "quiz"    && <Quiz onComplete={handleQuizComplete} />}
      {screen === "gate"    && <EmailGate scores={finalScores} onSubmit={handleGateSubmit} />}
      {screen === "loading" && <Loading onDone={() => setScreen("results")} />}
      {screen === "results" && <Results scores={finalScores} lead={lead} />}
    </div>
  );
}
