import { useState, useEffect } from "react";

// ── QUESTIONS ────────────────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    text: "Be honest — which one are you?",
    answers: [
      { text: "The person with 10 ideas and no idea which to chase", scores: { social: 2, affiliate: 1, freelancing: 1 } },
      { text: "The one who's good at things but hasn't found the right lane", scores: { homeservices: 2, freelancing: 1, realestate: 1 } },
      { text: "Someone who knows what they want but doesn't know how to get there", scores: { shopify: 2, sales: 1, daytrading: 1 } },
      { text: "The person who needs someone to just tell them what to do", scores: { shopify: 1, homeservices: 1, affiliate: 1 } },
    ],
  },
  {
    id: 2,
    text: "Someone who knows you well is describing you to a stranger. Which sounds most like you?",
    answers: [
      { text: '"Relentless — once they commit to something, that\'s it. It\'s happening."', scores: { sales: 2, homeservices: 2 } },
      { text: '"Always spotting angles — sees deals and opportunities before anyone else in the room"', scores: { daytrading: 2, realestate: 2 } },
      { text: '"A people person through and through — can walk into any room and make things happen"', scores: { sales: 2, realestate: 1 } },
      { text: '"Either buried in numbers or locked into a creative project — hard to pull away when focused"', scores: { daytrading: 2, freelancing: 2 } },
    ],
  },
  {
    id: 3,
    text: "Which skill feels most natural to you — not what you've been trained in, but what comes easiest without thinking?",
    answers: [
      { text: "Convincing people and building trust quickly", scores: { sales: 2, realestate: 2 } },
      { text: "Creating content or spotting trends", scores: { social: 2, affiliate: 2 } },
      { text: "Analyzing data, charts, or market patterns", scores: { daytrading: 2, affiliate: 1 } },
      { text: "Organizing systems and running efficient operations", scores: { shopify: 2, homeservices: 2 } },
    ],
  },
  {
    id: 4,
    text: "How do you feel about talking to strangers or clients?",
    answers: [
      { text: "I love it — conversations energize me", scores: { sales: 2, realestate: 2 } },
      { text: "I'm good at it when there's something at stake", scores: { sales: 1, homeservices: 2 } },
      { text: "I prefer written communication over calls or meetings", scores: { affiliate: 2, freelancing: 2 } },
      { text: "I'd rather work behind the scenes, no client contact needed", scores: { daytrading: 2, shopify: 1 } },
    ],
  },
  {
    id: 5,
    text: "What's your relationship with social media — be honest, not how you think you should use it?",
    answers: [
      { text: "I'm always online — I know what's trending before everyone else", scores: { social: 2, affiliate: 2 } },
      { text: "I use it but I'm not obsessed with it", scores: { shopify: 1, freelancing: 1 } },
      { text: "I post occasionally but don't think about growing an audience", scores: { sales: 1, realestate: 1 } },
      { text: "I barely use it — not really my thing", scores: { homeservices: 2, daytrading: 1 } },
    ],
  },
  {
    id: 6,
    text: "If you had to build income from scratch, what environment fits best?",
    answers: [
      { text: "Out in the world — meetings, calls, relationships", scores: { sales: 2, realestate: 2 } },
      { text: "Online — laptop, content, digital products", scores: { affiliate: 2, social: 2 } },
      { text: "Markets and data — finding edges others miss", scores: { daytrading: 2, affiliate: 1 } },
      { text: "On the ground — a service people always need", scores: { homeservices: 2, realestate: 1 } },
    ],
  },
  {
    id: 7,
    text: "When you picture your ideal workday — not a vacation, an actual productive day doing work you chose?",
    answers: [
      { text: "I'm out in the field making deals happen face-to-face", scores: { realestate: 2, homeservices: 2 } },
      { text: "I'm at my desk working on my own schedule — no boss, no clock", scores: { affiliate: 2, freelancing: 2 } },
      { text: "I'm on the phone or Zoom closing deals and stacking commissions", scores: { sales: 2, realestate: 1 } },
      { text: "I'm building or fixing something real with my hands", scores: { homeservices: 2, realestate: 1 } },
    ],
  },
  {
    id: 8,
    text: 'How comfortable are you hearing "no" multiple times before getting a "yes"?',
    answers: [
      { text: "Very comfortable — I expect lots of no's before a win", scores: { sales: 2, realestate: 1 } },
      { text: "Somewhat comfortable — I'd rather refine the process so results get more predictable", scores: { shopify: 2, affiliate: 2 } },
      { text: "Not very comfortable — I prefer work where people come to me for my skills", scores: { freelancing: 2, homeservices: 1 } },
      { text: "I prefer environments where results depend on strategy or analysis, not convincing people", scores: { daytrading: 2, affiliate: 1 } },
    ],
  },
  {
    id: 9,
    text: "How patient are you when it comes to results — if you started something today and saw nothing for 60 days, what happens?",
    answers: [
      { text: "Very patient — I think long-term and play the slow game", scores: { realestate: 2, affiliate: 2 } },
      { text: "Moderately patient — I want to see progress within a few months", scores: { shopify: 2, freelancing: 1 } },
      { text: "I like fast feedback — I want to know quickly if something works", scores: { sales: 2, social: 1 } },
      { text: "I need to see results fast — waiting too long burns me out", scores: { homeservices: 2, daytrading: 1 } },
    ],
  },
  {
    id: 10,
    text: "If someone handed you a clear roadmap to follow, you'd feel...",
    answers: [
      { text: "Relieved — I just need to know the proven path and I'll execute it", scores: { shopify: 2, affiliate: 2 } },
      { text: "Motivated — I'd commit fully and trust the process", scores: { sales: 2, homeservices: 1 } },
      { text: "Excited — I'd start immediately and figure out the rest as I go", scores: { homeservices: 2, sales: 1 } },
      { text: "Supported — I do my best work when I have a mentor or coach in my corner", scores: { freelancing: 2, realestate: 1 } },
    ],
  },
  {
    id: 11,
    text: "How do you feel about learning technical skills like coding, SEO, or analytics?",
    answers: [
      { text: "I'm into it — I actually enjoy learning tech stuff", scores: { affiliate: 2, shopify: 2 } },
      { text: "I'll learn what I have to, but I'd rather stay on the people side", scores: { sales: 2, realestate: 1 } },
      { text: "I like data and numbers — charts and systems are my thing", scores: { daytrading: 2, affiliate: 1 } },
      { text: "I prefer hands-on, practical skills I can apply immediately", scores: { homeservices: 2, realestate: 1 } },
    ],
  },
  {
    id: 12,
    text: "How comfortable are you with financial risk?",
    answers: [
      { text: "I'm a calculated risk-taker — big moves, big rewards", scores: { daytrading: 2, realestate: 2 } },
      { text: "I like risk when I control the outcome", scores: { sales: 2, homeservices: 1 } },
      { text: "I prefer low upfront cost, low risk, learn as I go", scores: { affiliate: 2, social: 2 } },
      { text: "I want stable income — risk makes me anxious", scores: { freelancing: 2, homeservices: 1 } },
    ],
  },
  {
    id: 13,
    text: "Your biggest financial goal right now — not the dream answer, what actually drives your decisions today?",
    answers: [
      { text: "Build serious wealth through ownership and equity over time", scores: { realestate: 2, daytrading: 1 } },
      { text: "High monthly cash flow, even if I have to work hard for it", scores: { sales: 2, homeservices: 2 } },
      { text: "Build something I can eventually sell or scale big", scores: { shopify: 2, realestate: 1 } },
      { text: "Consistent income I control, not tied to a 9-to-5", scores: { freelancing: 2, affiliate: 2 } },
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
    text: "How do you feel about working with a team or hiring people?",
    answers: [
      { text: "I want to grow a real operation with employees eventually", scores: { homeservices: 2, realestate: 1 } },
      { text: "I prefer to stay solo — I work best alone", scores: { daytrading: 2, freelancing: 2 } },
      { text: "I'm open to it once the money is there", scores: { shopify: 2, sales: 1 } },
      { text: "I'd rather outsource or automate than manage people", scores: { affiliate: 2, shopify: 1 } },
    ],
  },
];

// ── CAREERS ──────────────────────────────────────────────────────────────────
const careers = {
  daytrading: {
    name: "Day Trading Stocks",
    emoji: "📈",
    color: "#22c55e",
    tagline: "Master the market. Trade your way to freedom.",
    whyYou: "Your answers reveal someone who is analytically wired, comfortable working alone, and drawn to environments where skill and strategy — not people skills or physical labor — determine the outcome. Day trading is one of the few paths where your income is a direct reflection of how sharp your thinking is. You scored high on patience, data orientation, and risk tolerance, which are exactly the traits that separate profitable traders from the ones who wash out in month two. The learning curve is real, but for someone with your profile, it's a curve worth climbing.",
    opportunity: "Day trading is one of the few paths where your income is limited only by your capital and your edge — not by clients, hours, or inventory. Consistently profitable traders using prop firm funding can access $100K–$500K in buying power and keep a significant cut of the profits. Top retail traders document $10K–$100K+ months. The learning curve is real and the washout rate is high — but those who develop a genuine edge and iron discipline build an income stream that runs entirely on their own terms, from anywhere in the world, with no boss and no ceiling.",
    coreUrl: "https://whop.com/ascend-career-guidance/day-trading-stocks-standard",
    proUrl: "https://whop.com/ascend-career-guidance/day-trading-stocks-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Day Trading Stocks. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Day Trading Stocks. Everything in Core plus bonus resources, templates, and tools.",
  },
  realestate: {
    name: "Real Estate",
    emoji: "🏠",
    color: "#ef4444",
    tagline: "The biggest wealth builder in history. Get in.",
    whyYou: "Your answers point to someone who thinks in assets, not hours. You're drawn to things you can own, touch, and build equity in over time — and you have the patience to play a longer game than most people your age are willing to play. Real estate rewards exactly that combination: strategic thinking, relationship-building, and the discipline to stay in when others panic. Whether it's wholesaling, flipping, or building a rental portfolio, you have the profile of someone who doesn't just participate in the market — you become the market.",
    opportunity: "Real estate has created more millionaires than any other asset class in history, and that's not an accident. A single rental property can generate $500–$2,000/month in passive cash flow. Flips routinely produce $20K–$80K in profit per deal. Wholesalers move contracts for $5K–$30K without ever owning the property. And the leverage available through conventional financing means you can control a $300K asset with $30K down — something no other investment class allows at that scale.",
    coreUrl: "https://whop.com/ascend-career-guidance/real-estate-standard",
    proUrl: "https://whop.com/ascend-career-guidance/real-estate-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Real Estate. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Real Estate. Everything in Core plus bonus resources, templates, and tools.",
  },
  homeservices: {
    name: "Home Services",
    emoji: "🔧",
    color: "#06b6d4",
    tagline: "Real work. Real money. No algorithm required.",
    whyYou: "You're a doer. Your answers show someone who gets energy from tangible results, prefers action over theory, and wants to see the direct connection between effort and income. Home services — pressure washing, detailing, lawn care, HVAC, cleaning, handyman work — is one of the most underestimated wealth-building paths available today. You don't need a degree, a large following, or a complex tech stack. You need a skill, a few tools, and the work ethic to show up. Based on your profile, you have all three.",
    opportunity: "The home services industry generates over $600 billion annually in the US alone — and it's almost entirely local, meaning the big platforms can't compete with you directly. A solo pressure washing operator can clear $800–$2,000 in a single day. A small cleaning company with three employees can generate $30K–$60K per month. The barrier to entry is low, the margins are high, and demand never disappears. People always need things cleaned, fixed, and maintained — recession or not.",
    coreUrl: "https://whop.com/ascend-career-guidance/home-services-standard",
    proUrl: "https://whop.com/ascend-career-guidance/home-services-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Home Services. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Home Services. Everything in Core plus bonus resources, templates, and tools.",
  },
  shopify: {
    name: "Shopify Dropshipping",
    emoji: "📦",
    color: "#f97316",
    tagline: "Build a product brand without touching inventory.",
    whyYou: "Your answers reveal someone who is systems-oriented, comfortable with online tools, and motivated by building something scalable from scratch. Dropshipping lets you run a real e-commerce business without warehousing a single product. You test, you optimize, you scale what works — and you cut what doesn't. You scored high on patience with process, comfort with digital environments, and desire to build something you can eventually own or sell. That's the exact profile that separates operators who build real brands from the ones who quit after their first failed ad.",
    opportunity: "E-commerce is a $6 trillion global market and dropshipping removes the biggest barrier — inventory risk. Successful Shopify operators run 30–60% profit margins on winning products. A store doing $50K/month in revenue with a 40% margin nets $20K — and the business itself becomes an asset you can sell for 2–4x annual profit. The operators at the top aren't just selling products; they're building brands with loyal audiences, email lists, and repeat customers that compound in value over time.",
    coreUrl: "https://whop.com/ascend-career-guidance/shopify-dropshipping-standard",
    proUrl: "https://whop.com/ascend-career-guidance/shopify-dropshipping-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Shopify Dropshipping. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Shopify Dropshipping. Everything in Core plus bonus resources, templates, and tools.",
  },
  sales: {
    name: "High Ticket Sales",
    emoji: "💰",
    color: "#f59e0b",
    tagline: "Close deals. Stack commissions. No ceiling.",
    whyYou: "You light up around people. Your answers show someone who is naturally persuasive, energized by high-stakes conversations, and motivated by the direct link between performance and pay. High ticket sales is one of the only careers where your income is almost entirely determined by how good you are — not your degree, not your resume, not your network. Closers who master the craft make $10K–$50K per month working remotely on commission. Based on your profile, you have the natural wiring. The roadmap will give you the skill.",
    opportunity: "The demand for skilled remote closers has never been higher. Coaches, course creators, agencies, and SaaS companies are all looking for people who can get on a call and convert. Top closers working on a 10–15% commission structure close $100K–$500K in deals per month — keeping $10K–$75K for themselves. Unlike most careers, there's no income cap, no seniority ladder, and no waiting for a promotion. You perform, you earn. The best closers are always hired, always needed, and always paid well.",
    coreUrl: "https://whop.com/ascend-career-guidance/high-ticket-sales-standard",
    proUrl: "https://whop.com/ascend-career-guidance/high-ticket-sales-premium-c7",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for High Ticket Sales. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for High Ticket Sales. Everything in Core plus bonus resources, templates, and tools.",
  },
  affiliate: {
    name: "Affiliate Marketing",
    emoji: "🔗",
    color: "#8b5cf6",
    tagline: "Build once. Earn repeatedly. Sleep well.",
    whyYou: "Your answers point to someone who values independence, thinks strategically, and is willing to put in work upfront for payoffs that compound over time. Affiliate marketing is the closest thing to a legitimate passive income model that actually works — but only for people with the patience to build it right. You scored high on comfort with digital environments, long-term thinking, and preference for systems over people management. That's the exact profile that builds content channels, email lists, and SEO assets that generate income months and years after the work is done.",
    opportunity: "Affiliate marketers earn commissions promoting other companies' products — without customer service, inventory, or product creation. Top affiliates in competitive niches earn $10K–$100K+ per month from content they created years ago. A single high-ranking blog post or YouTube video can generate five figures annually on autopilot. The business model scales infinitely and requires nothing more than a laptop and consistent output. Once your content machine is built, it runs whether you're working or not.",
    coreUrl: "https://whop.com/ascend-career-guidance/affiliate-marketing-standard",
    proUrl: "https://whop.com/ascend-career-guidance/affiliate-marketing-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Affiliate Marketing. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Affiliate Marketing. Everything in Core plus bonus resources, templates, and tools.",
  },
  social: {
    name: "Social Media Marketing",
    emoji: "📱",
    color: "#ec4899",
    tagline: "Turn attention into income. On your terms.",
    whyYou: "You have an intuitive feel for what people respond to online — and that's rarer than most people realize. Your answers show someone who is naturally plugged in, trend-aware, and capable of creating content or managing platforms with real strategic intent. Social media marketing is one of the fastest paths from zero to income for someone with your profile because you're already doing half the work instinctively. The roadmap teaches you how to monetize what comes naturally.",
    opportunity: "Brands spend over $200 billion per year on social media marketing — and most of them desperately need people who actually understand how the platforms work. A solo social media manager with five clients can charge $1,500–$5,000 per client per month, generating $7,500–$25,000 monthly from home. Content creators with audiences of 50K–100K routinely earn $5K–$20K per month through brand deals, products, and affiliate partnerships. The barrier to entry is your phone and your creative instinct — both of which you already have.",
    coreUrl: "https://whop.com/ascend-career-guidance/social-media-marketing-standard",
    proUrl: "https://whop.com/ascend-career-guidance/social-media-marketing-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Social Media Marketing. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Social Media Marketing. Everything in Core plus bonus resources, templates, and tools.",
  },
  freelancing: {
    name: "Creative Freelancing",
    emoji: "✏️",
    color: "#a78bfa",
    tagline: "Get paid for what you're already good at.",
    whyYou: "Your answers reveal someone with a strong creative identity and the discipline to develop a skill to a level where people will pay serious money for it. Creative freelancing — whether that's design, copywriting, video editing, web development, or photography — rewards depth of craft and the ability to deliver results for clients. You scored high on preference for independent work, skill-based income, and building something that reflects your personal brand. The best freelancers don't just do work — they become the go-to person in a specific niche.",
    opportunity: "Skilled freelancers are among the highest-paid independent workers in the world. A copywriter charging $5,000 per project and closing four clients per month earns $20K. A video editor retaining three agency clients at $3,000/month earns $9K working 20 hours a week. A web developer with a focused niche can charge $8,000–$25,000 per project. The ceiling is determined entirely by your skill level and positioning — and unlike a salary, there's no one to ask for a raise. You just raise your rates.",
    coreUrl: "https://whop.com/ascend-career-guidance/creative-freelancing-standard",
    proUrl: "https://whop.com/ascend-career-guidance/creative-freelancing-premium",
    corePrice: "$34.99",
    proPrice: "$47.99",
    coreDesc: "90-Day Roadmap for Creative Freelancing. Includes course access, PowerPoint presentation, and audio walkthrough.",
    proDesc: "Premium 90-Day Roadmap for Creative Freelancing. Everything in Core plus bonus resources, templates, and tools.",
  },
};


// ── LOGO ──────────────────────────────────────────────────────────────────────
function Logo({ style={} }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, ...style }}>
      <img src="/logo.png" alt="Ascend Modern Career Guidance" style={{ height: 44, width: "auto", objectFit: "contain" }} />
    </div>
  );
}

// ── SCORE ENGINE ─────────────────────────────────────────────────────────────
function computeScores(answers) {
  const scores = { shopify: 0, social: 0, affiliate: 0, sales: 0, realestate: 0, daytrading: 0, freelancing: 0, homeservices: 0 };
  answers.forEach((ansIdx, qIdx) => {
    if (ansIdx === null) return;
    const ans = questions[qIdx].answers[ansIdx];
    Object.entries(ans.scores).forEach(([k, v]) => { scores[k] += v; });
  });
  return scores;
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_o4yiriq";
const EMAILJS_TEMPLATE_ID = "template_jiyto9h";
const EMAILJS_PUBLIC_KEY  = "7U6WgajbV4yWB8WaX";

async function sendNotification(name, email, careerName) {
  return new Promise((resolve) => {
    const send = () => {
      try {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name, from_email: email, career_result: careerName, reply_to: email,
        }).then(resolve).catch(() => resolve());
      } catch(e) { resolve(); }
    };
    if (window.emailjs) { send(); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = send;
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');family=Source+Sans+3:wght@400;500;600@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');display=swap');`;

const S = {
  bg: "#020617",
  bgCard: "#0b1220",
  border: "rgba(255,255,255,0.07)",
  text: "#f8fafc",
  muted: "#94a3b8",
  dim: "#475569",
  accent: "#3b82f6",
  // display font = Syne (bold geometric sans), body = DM Sans
  display: "'Oswald', sans-serif",
  body: "'Source Sans 3', sans-serif",
};

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onStart }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { setTimeout(() => setIn(true), 60); }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", position: "relative", overflow: "hidden" }}>
      {/* ambient bg */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)", filter: "blur(48px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(48px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 700, width: "100%", textAlign: "center", opacity: in_ ? 1 : 0, transform: in_ ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        <Logo />
        {/* eyebrow */}
        <div style={{ fontFamily: S.body, fontSize: 12, color: S.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 22 }}>
          Stop Guessing Your Future
        </div>

        {/* headline */}
        <h1 style={{ fontFamily: S.display, fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 800, lineHeight: 0.95, color: S.text, margin: "0 0 32px", letterSpacing: "-0.02em" , textTransform: "uppercase" }}>
          Start Your<br />
          <span style={{ color: S.accent }}>Ascent</span>
        </h1>

        <p style={{ fontFamily: S.body, fontSize: 17, lineHeight: 1.65, color: S.muted, maxWidth: 500, margin: "0 auto 44px" }}>
          15 targeted questions. Walk away with a clear, data-backed career path matched to your strengths, risk tolerance, and lifestyle goals.
        </p>

        {/* stats */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: 48, flexWrap: "wrap" }}>
          {[["15 Questions", true], ["8 Paths", true], ["Free", true], ["2 Min", false]].map(([label, divider]) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: S.body, fontSize: 14, color: S.dim, padding: "0 16px" }}>{label}</span>
              {divider && <span style={{ width: 1, height: 14, background: S.border }} />}
            </div>
          ))}
        </div>

        <button onClick={onStart}
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: 12, padding: "18px 52px", fontSize: 16, fontFamily: S.body, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", boxShadow: "0 0 48px rgba(59,130,246,0.38), 0 8px 32px rgba(0,0,0,0.4)", transition: "transform 0.15s, box-shadow 0.15s" }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 64px rgba(59,130,246,0.52), 0 12px 40px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 48px rgba(59,130,246,0.38), 0 8px 32px rgba(0,0,0,0.4)"; }}>
          Begin Your Ascent →
        </button>
      </div>
    </div>
  );
}

// ── QUIZ ──────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState("forward");

  const q = questions[current];
  const selected = answers[current];
  const progress = (current / questions.length) * 100;

  function selectAnswer(idx) {
    if (animating) return;
    const next = [...answers]; next[current] = idx; setAnswers(next);
  }

  function go(forward) {
    if (animating) return;
    if (forward && selected === null) return;
    if (!forward && current === 0) return;
    setAnimating(true); setDir(forward ? "forward" : "back"); setVisible(false);
    setTimeout(() => {
      if (forward && current + 1 >= questions.length) { onComplete(computeScores(answers)); return; }
      setCurrent(c => c + (forward ? 1 : -1));
      setVisible(true); setAnimating(false);
    }, 240);
  }

  const letters = ["A", "B", "C", "D"];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 24px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* scrollable content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 100, paddingTop: 48 }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 700 }}>
          <Logo style={{ marginBottom: 8 }} />
          {/* progress */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: S.body, fontSize: 12, color: S.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>Question {current + 1} of {questions.length}</div>
            <div style={{ fontFamily: S.display, fontSize: 20, fontWeight: 800, color: S.accent , textTransform: "uppercase" }}>{Math.round(progress)}%</div>
          </div>
          <div style={{ height: 2, background: S.border, borderRadius: 2, marginBottom: 44, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", transition: "width 0.5s ease", boxShadow: "0 0 8px rgba(59,130,246,0.7)" }} />
          </div>

          {/* question */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : `translateY(${dir === "forward" ? "-12px" : "12px"})`, transition: "opacity 0.24s ease, transform 0.24s ease" }}>
            <h2 style={{ fontFamily: S.display, fontSize: "clamp(22px, 3.8vw, 32px)", fontWeight: 800, color: S.text, lineHeight: 1.2, marginBottom: 32, letterSpacing: "-0.01em" , textTransform: "uppercase" }}>
              {q.text}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.answers.map((ans, i) => {
                const isSel = selected === i;
                return (
                  <button key={i} onClick={() => selectAnswer(i)}
                    style={{ background: isSel ? "rgba(59,130,246,0.13)" : "rgba(11,18,32,0.7)", border: isSel ? "1px solid rgba(59,130,246,0.55)" : `1px solid ${S.border}`, borderRadius: 12, padding: "17px 20px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 14, textAlign: "left", transition: "all 0.16s ease", transform: isSel ? "translateX(4px)" : "translateX(0)", boxShadow: isSel ? "0 0 0 1px rgba(59,130,246,0.25), 0 4px 20px rgba(59,130,246,0.1)" : "none" }}
                    onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; } }}
                    onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background = "rgba(11,18,32,0.7)"; e.currentTarget.style.borderColor = S.border; } }}>
                    <div style={{ minWidth: 26, height: 26, borderRadius: 7, background: isSel ? S.accent : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S.display, fontSize: 11, fontWeight: 800, color: isSel ? "#fff" : S.dim, flexShrink: 0, marginTop: 1, transition: "all 0.16s" , textTransform: "uppercase" }}>
                      {letters[i]}
                    </div>
                    <span style={{ fontFamily: S.body, fontSize: 15, lineHeight: 1.55, color: isSel ? S.text : S.muted, transition: "color 0.16s" }}>
                      {ans.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* sticky nav bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #020617 60%, transparent)", padding: "20px 24px 28px", zIndex: 100 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14 }}>
          {current > 0 && (
            <button onClick={() => go(false)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: S.body, fontSize: 15, fontWeight: 500, color: S.dim, padding: "13px 4px", textDecoration: "underline", textDecorationColor: "rgba(71,85,105,0.4)", textUnderlineOffset: 3, transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = S.muted}
              onMouseLeave={e => e.target.style.color = S.dim}>
              ← Back
            </button>
          )}
          <button onClick={() => go(true)} disabled={selected === null}
            style={{ background: selected !== null ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "rgba(255,255,255,0.07)", color: selected !== null ? "#fff" : "#334155", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 15, fontFamily: S.body, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed", letterSpacing: "0.02em", boxShadow: selected !== null ? "0 4px 20px rgba(59,130,246,0.4)" : "none", transition: "all 0.2s ease" }}
            onMouseEnter={e => { if (selected !== null) e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>
            {current + 1 === questions.length ? "See My Results" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LOADING ───────────────────────────────────────────────────────────────────
function Loading({ onDone }) {
  const [pct, setPct] = useState(0);
  const phases = ["Analyzing your responses…", "Mapping career alignments…", "Generating your result…"];
  const phase = pct < 33 ? 0 : pct < 66 ? 1 : 2;
  useEffect(() => {
    const t = setInterval(() => setPct(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100; } return p + 2; }), 40);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 36px" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: S.accent, animation: "spin 1s linear infinite" }} />
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✦</div>
        </div>
        <p style={{ fontFamily: S.body, fontSize: 15, color: S.muted, marginBottom: 28, minHeight: 22 }}>{phases[phase]}</p>
        <div style={{ height: 3, background: S.border, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", transition: "width 0.1s linear", boxShadow: "0 0 12px rgba(59,130,246,0.6)" }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// ── EMAIL GATE ────────────────────────────────────────────────────────────────
function EmailGate({ scores, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const topKey = Object.entries(scores).sort(([,a],[,b]) => b-a)[0][0];
  const careerName = careers[topKey].name;
  const valid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit() {
    if (!valid || loading) return;
    setLoading(true);
    await sendNotification(name.trim(), email.trim(), careerName);
    onSubmit();
  }

  const inp = { width: "100%", background: "rgba(11,18,32,0.9)", border: `1px solid ${S.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 15, fontFamily: S.body, color: S.text, outline: "none", boxSizing: "border-box", transition: "border 0.18s" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 480, width: "100%", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Logo />
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", fontSize: 22, marginBottom: 22 }}>🔍</div>
          <h2 style={{ fontFamily: S.display, fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 800, color: S.text, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.02em" , textTransform: "uppercase" }}>
            Your results are ready.
          </h2>
          <p style={{ fontFamily: S.body, fontSize: 15, color: S.dim, lineHeight: 1.6 }}>
            Enter your name and email to unlock your career path and get your free starter roadmap.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
          <input type="text" placeholder="First name" value={name} onChange={e => setName(e.target.value)} style={inp}
            onFocus={e => e.target.style.border = "1px solid rgba(59,130,246,0.5)"}
            onBlur={e => e.target.style.border = `1px solid ${S.border}`}
            onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inp}
            onFocus={e => e.target.style.border = "1px solid rgba(59,130,246,0.5)"}
            onBlur={e => e.target.style.border = `1px solid ${S.border}`}
            onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        <button onClick={handleSubmit} disabled={!valid || loading}
          style={{ width: "100%", background: valid ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "rgba(255,255,255,0.06)", color: valid ? "#fff" : "#334155", border: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontFamily: S.body, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", letterSpacing: "0.02em", boxShadow: valid ? "0 4px 20px rgba(59,130,246,0.4)" : "none", transition: "all 0.2s ease" }}>
          {loading ? "Sending…" : "Show My Results →"}
        </button>
        <p style={{ fontFamily: S.body, fontSize: 12, color: "#334155", textAlign: "center", marginTop: 14 }}>No spam. We'll send your results and that's it.</p>
      </div>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results({ scores }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 80);
    const t2 = setTimeout(() => setStep(2), 400);
    const t3 = setTimeout(() => setStep(3), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const sorted = Object.entries(scores).sort(([,a],[,b]) => b-a);
  const [topKey, topScore] = sorted[0];
  const [runnerKey, runnerScore] = sorted[1];
  const career = careers[topKey];
  const runner = careers[runnerKey];
  const maxScore = topScore || 1;

  const careerEmojis = { daytrading:"📈", realestate:"🏠", homeservices:"🔧", shopify:"📦", sales:"💰", affiliate:"🔗", social:"📱", freelancing:"✏️" };
  const barColors = { daytrading:"#22c55e", realestate:"#ef4444", homeservices:"#06b6d4", shopify:"#f97316", sales:"#f59e0b", affiliate:"#8b5cf6", social:"#ec4899", freelancing:"#a78bfa" };

  const fade = (s, delay=0) => ({ opacity: step >= s ? 1 : 0, transform: step >= s ? "translateY(0)" : "translateY(14px)", transition: `all 0.45s ease ${delay}s` });

  const card = (extra={}) => ({ background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 18, padding: "28px 32px", marginBottom: 14, ...extra });

  return (
    <div style={{ minHeight: "100vh", padding: "56px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "8%", right: "4%", width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${career.color}18 0%, transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "8%", left: "4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
        <Logo />

        {/* ── TOP RESULT CARD ── */}
        <div style={{ ...fade(1), ...card({ border: `1px solid ${career.color}35`, boxShadow: `0 0 56px ${career.color}14, 0 20px 56px rgba(0,0,0,0.4)`, marginBottom: 14, position: "relative", overflow: "hidden" }) }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${career.color}, transparent)` }} />
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>{careerEmojis[topKey]}</div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: S.body, fontSize: 11, color: career.color, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Your #1 Match</div>
              <h1 style={{ fontFamily: S.display, fontSize: "clamp(30px, 5.5vw, 50px)", fontWeight: 800, color: S.text, margin: "0 0 6px", lineHeight: 1.0, letterSpacing: "-0.02em" , textTransform: "uppercase" }}>{career.name}</h1>
              <p style={{ fontFamily: S.body, fontSize: 14, color: S.muted, margin: 0 }}>{career.tagline}</p>
            </div>
          </div>

          {/* ── CTA COMPARISON CARDS ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Core card */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "22px 22px 18px", position: "relative" }}>
              <div style={{ fontFamily: S.body, fontSize: 11, color: S.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Get Moving</div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: S.display, fontSize: 26, fontWeight: 800, color: S.text, textTransform: "uppercase" }}>Ascend </span>
                <span style={{ fontFamily: S.display, fontSize: 26, fontWeight: 800, color: career.color, textTransform: "uppercase" }}>Core</span>
              </div>
              <div style={{ fontFamily: S.body, fontSize: 13, color: S.muted, marginBottom: 16, lineHeight: 1.5 }}>Your 90-day roadmap and 30-minute audio industry deep dive — what you need to stop guessing and start moving.</div>
              <div style={{ borderTop: `1px solid ${S.border}`, marginBottom: 16 }} />
              <div style={{ fontFamily: S.display, fontSize: 30, fontWeight: 800, color: S.text, textTransform: "uppercase", marginBottom: 18 }}>{career.corePrice}</div>
              {[
                [true,  "90-Day Roadmap",         "Your exact plan from day one to first win"],
                [true,  "Audio Industry Deep Dive","How the industry actually works, in plain English"],
                [false, "Quick Start Plan",        "Your first moves, decided. No overthinking"],
                [false, "Visual Execution Map",    "The full picture, so you always know what's next"],
                [false, "Industry Language Guide", "Sound like you've been in it for years"],
              ].map(([inc, title, sub]) => (
                <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12, opacity: inc ? 1 : 0.35 }}>
                  <div style={{ fontSize: 13, color: inc ? career.color : S.dim, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>{inc ? "✓" : "✗"}</div>
                  <div>
                    <div style={{ fontFamily: S.body, fontSize: 14, fontWeight: 600, color: inc ? S.text : S.dim, lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontFamily: S.body, fontSize: 12, color: S.dim, lineHeight: 1.4, marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
              <a href={career.coreUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", marginTop: 18, background: "rgba(255,255,255,0.07)", border: `1px solid ${S.border}`, borderRadius: 9, padding: "13px", textAlign: "center", fontFamily: S.display, fontSize: 14, fontWeight: 700, color: S.text, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}>
                Get Ascend Core →
              </a>
            </div>

            {/* Pro card */}
            <div style={{ background: `${career.color}10`, border: `2px solid ${career.color}60`, borderRadius: 14, padding: "22px 22px 18px", position: "relative", boxShadow: `0 0 32px ${career.color}12` }}>
              <div style={{ position: "absolute", top: -1, right: 16, background: career.color, borderRadius: "0 0 8px 8px", padding: "4px 12px", fontFamily: S.display, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Most Popular</div>
              <div style={{ fontFamily: S.body, fontSize: 11, color: career.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Get There Faster</div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: S.display, fontSize: 26, fontWeight: 800, color: S.text, textTransform: "uppercase" }}>Ascend </span>
                <span style={{ fontFamily: S.display, fontSize: 26, fontWeight: 800, color: career.color, textTransform: "uppercase" }}>Pro</span>
              </div>
              <div style={{ fontFamily: S.body, fontSize: 13, color: S.muted, marginBottom: 16, lineHeight: 1.5 }}>The full toolkit built to boost your speed and productivity. Your 90-day roadmap, audio deep dive, quick start plan, execution map, and language guide — nothing left out.</div>
              <div style={{ borderTop: `1px solid ${career.color}30`, marginBottom: 16 }} />
              <div style={{ fontFamily: S.display, fontSize: 30, fontWeight: 800, color: S.text, textTransform: "uppercase", marginBottom: 18 }}>{career.proPrice}</div>
              {[
                [true, "90-Day Roadmap",          "Your exact plan from day one to first win"],
                [true, "Audio Industry Deep Dive", "How the industry actually works, in plain English"],
                [true, "Quick Start Plan",         "Your first moves, decided. No overthinking"],
                [true, "Visual Execution Map",     "The full picture, so you always know what's next"],
                [true, "Industry Language Guide",  "Sound like you've been in it for years"],
              ].map(([inc, title, sub]) => (
                <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, color: career.color, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</div>
                  <div>
                    <div style={{ fontFamily: S.body, fontSize: 14, fontWeight: 600, color: S.text, lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontFamily: S.body, fontSize: 12, color: S.dim, lineHeight: 1.4, marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
              <a href={career.proUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", marginTop: 18, background: career.color, border: "none", borderRadius: 9, padding: "13px", textAlign: "center", fontFamily: S.display, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: `0 4px 20px ${career.color}50`, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Get Ascend Pro →
              </a>
            </div>

          </div>
        </div>

        {/* ── WHY THIS IS YOUR PATH ── */}
        <div style={{ ...fade(2, 0), ...card() }}>
          <div style={{ fontFamily: S.body, fontSize: 11, color: career.color, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Why This Is Your Path</div>
          <p style={{ fontFamily: S.body, fontSize: 15, color: "#cbd5e1", lineHeight: 1.72, margin: 0 }}>{career.whyYou}</p>
        </div>

        {/* ── THE OPPORTUNITY ── */}
        <div style={{ ...fade(2, 0.07), ...card() }}>
          <div style={{ fontFamily: S.body, fontSize: 11, color: "#f59e0b", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>💰 The Opportunity</div>
          <p style={{ fontFamily: S.body, fontSize: 15, color: "#cbd5e1", lineHeight: 1.72, margin: 0 }}>{career.opportunity}</p>
        </div>

        {/* ── RUNNER UP ── */}
        <div style={{ ...fade(2, 0.13), ...card({ display: "flex", alignItems: "center", gap: 16 }) }}>
          <div style={{ fontSize: 30 }}>{careerEmojis[runnerKey]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: S.body, fontSize: 11, color: S.dim, letterSpacing: "0.11em", textTransform: "uppercase", marginBottom: 3 }}>Runner-Up</div>
            <div style={{ fontFamily: S.display, fontSize: 20, fontWeight: 800, color: barColors[runnerKey], letterSpacing: "-0.01em" , textTransform: "uppercase" }}>{runner.name}</div>
            <div style={{ fontFamily: S.body, fontSize: 12, color: S.dim, marginTop: 2 }}>{runner.tagline}</div>
          </div>
          <div style={{ fontFamily: S.display, fontSize: 28, fontWeight: 800, color: barColors[runnerKey], flexShrink: 0 , textTransform: "uppercase" }}>{runnerScore}</div>
        </div>

        {/* ── SCORE BREAKDOWN — sorted descending ── */}
        <div style={{ ...fade(3, 0), ...card() }}>
          <div style={{ fontFamily: S.body, fontSize: 11, color: S.dim, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 22 }}>📊 Score Breakdown</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {sorted.map(([key, val]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{careerEmojis[key]}</span>
                <div style={{ fontFamily: S.body, fontSize: 13, color: S.muted, width: 148, flexShrink: 0 }}>{careers[key].name}</div>
                <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: step >= 3 ? `${(val/maxScore)*100}%` : "0%", background: barColors[key], borderRadius: 3, transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.15s", boxShadow: key === topKey ? `0 0 8px ${barColors[key]}80` : "none" }} />
                </div>
                <div style={{ fontFamily: S.display, fontSize: 17, fontWeight: 800, color: key === topKey ? barColors[key] : S.dim, width: 22, textAlign: "right", flexShrink: 0 , textTransform: "uppercase" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DISCLAIMER ── */}
        <div style={{ ...fade(3, 0.15), background: "rgba(255,255,255,0.02)", border: `1px solid ${S.border}`, borderRadius: 12, padding: "18px 22px", marginBottom: 14 }}>
          <p style={{ fontFamily: S.body, fontSize: 12, color: S.dim, lineHeight: 1.65, margin: 0, textAlign: "center" }}>
            <strong style={{ color: "#475569" }}>Disclaimer:</strong> Ascend provides educational and informational content only. This is not a licensing course and does not constitute legal, financial, or professional advice. The roadmap is designed to help users become entry-ready, not to guarantee outcomes. Individual results vary and users are responsible for their own career decisions.
          </p>
        </div>

        {/* ── RETAKE ── */}
        <div style={{ textAlign: "center", marginTop: 28, ...fade(3, 0.1) }}>
          <button onClick={() => window.location.reload()}
            style={{ background: "none", border: `1px solid ${S.border}`, borderRadius: 8, padding: "11px 26px", fontFamily: S.body, fontSize: 13, color: S.dim, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.18)"; e.target.style.color = S.text; }}
            onMouseLeave={e => { e.target.style.borderColor = S.border; e.target.style.color = S.dim; }}>
            ↩ Retake the Quiz
          </button>
          <div style={{ fontFamily: S.body, fontSize: 11, color: "#1e293b", marginTop: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>Powered by Ascend · Modern Career Guidance</div>
        </div>

      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("hero");
  const [scores, setScores] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)" }}>
      <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #020617; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }`}</style>
      {screen === "hero"    && <Hero onStart={() => setScreen("quiz")} />}
      {screen === "quiz"    && <Quiz onComplete={s => { setScores(s); setScreen("gate"); }} />}
      {screen === "gate"    && <EmailGate scores={scores} onSubmit={() => setScreen("loading")} />}
      {screen === "loading" && <Loading onDone={() => setScreen("results")} />}
      {screen === "results" && <Results scores={scores} />}
    </div>
  );
}
