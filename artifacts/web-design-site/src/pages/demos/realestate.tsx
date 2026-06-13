import { useState } from "react";
import { Link } from "wouter";
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Star,
  BedDouble,
  Bath,
  Square,
  Award,
  TrendingUp,
  Shield,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const listings = [
  {
    address: "1 Sutton Place",
    neighborhood: "Sutton Place, Manhattan",
    price: "$4,850,000",
    beds: 5,
    baths: 5,
    sqft: "4,200",
    gradient: "from-[#0f2f45] via-[#1a4a6e] to-[#0a1f30]",
    tag: "Exclusive Listing",
    tagColor: "bg-[#c9a96e] text-black",
    desc: "Iconic pre-war residence with panoramic East River views, private terrace, and original architectural details.",
  },
  {
    address: "88 Central Park West",
    neighborhood: "Upper West Side, Manhattan",
    price: "$3,200,000",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    gradient: "from-[#1a1208] via-[#2d2010] to-[#0f0c06]",
    tag: "Just Listed",
    tagColor: "bg-white text-black",
    desc: "Stunning park-facing co-op with chef's kitchen, library, and white-glove doorman building.",
  },
  {
    address: "412 Tribeca Loft",
    neighborhood: "Tribeca, Manhattan",
    price: "$6,100,000",
    beds: 3,
    baths: 3,
    sqft: "3,800",
    gradient: "from-[#1a0a0a] via-[#2d1010] to-[#100606]",
    tag: "Featured",
    tagColor: "bg-[#c9a96e] text-black",
    desc: "Rare full-floor loft conversion with soaring ceilings, exposed brick, and private keyed elevator.",
  },
  {
    address: "22 Hudson Yards",
    neighborhood: "Hudson Yards, Manhattan",
    price: "$8,500,000",
    beds: 4,
    baths: 4,
    sqft: "4,900",
    gradient: "from-[#050d1a] via-[#0a1a30] to-[#020810]",
    tag: "Penthouse",
    tagColor: "bg-[#c9a96e] text-black",
    desc: "Penthouse residence with 270° city views, private roof terrace, and resort-caliber building amenities.",
  },
];

const stats = [
  { value: "$1.2B+", label: "Career Sales Volume" },
  { value: "500+", label: "Transactions Closed" },
  { value: "#1", label: "Agent in Her Market" },
  { value: "18 yrs", label: "NYC Market Experience" },
];

const awards = [
  "Wall Street Journal Top Agent",
  "Forbes Real Estate Council",
  "RealTrends America's Best",
  "NYRS Platinum Club",
  "Five Star Professional Award",
];

const whys = [
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    desc: "Ashley's proprietary data analysis gives clients an unfair advantage — knowing what a property is truly worth before anyone else does.",
  },
  {
    icon: Shield,
    title: "Discretion Guaranteed",
    desc: "High-profile transactions require high-trust representation. Every deal is handled with complete confidentiality.",
  },
  {
    icon: Award,
    title: "Elite Network",
    desc: "Access to off-market listings, private buyer pools, and a global network of ultra-high-net-worth clients no platform can replicate.",
  },
];

const testimonials = [
  {
    name: "James R.",
    title: "Private Equity Partner",
    text: "Ashley sold our Central Park West apartment in 9 days, $420,000 over ask. She is, quite simply, the best in the business. We won't work with anyone else.",
    stars: 5,
  },
  {
    name: "Priya & Daniel M.",
    title: "Buyers — Tribeca",
    text: "We had been searching for two years. Ashley found us an off-market loft that hadn't been listed publicly. It was exactly what we dreamed of. Extraordinary.",
    stars: 5,
  },
  {
    name: "Sophia L.",
    title: "CEO, Tech Founder",
    text: "Ashley doesn't just sell real estate — she engineers outcomes. She navigated our complex relocation with zero stress. Highest possible recommendation.",
    stars: 5,
  },
];

const neighborhoods = [
  "Tribeca", "SoHo", "West Village", "Upper East Side",
  "Upper West Side", "Sutton Place", "Hudson Yards", "Midtown East",
];

export default function RealEstateDemo() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: "#080808", color: "#f5f0e8" }}>

      {/* Demo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium flex items-center justify-center gap-3 relative z-[100]">
        <span>Demo Website — Built by WebCraft Studio</span>
        <Link href="/">
          <span className="underline underline-offset-2 cursor-pointer hover:opacity-80 flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back to WebCraft
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-5"
        style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
        <div>
          <div className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-semibold mb-0.5">Ashley Monroe</div>
          <div className="text-white font-bold text-lg tracking-tight leading-none">Premier Properties</div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: "rgba(245,240,232,0.55)" }}>
          {["Listings", "About", "Results", "Neighborhoods", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-[#c9a96e] transition-colors tracking-wide">{item}</a>
          ))}
        </div>
        <a href="#contact">
          <button className="px-6 py-2.5 text-sm font-bold tracking-wide uppercase"
            style={{ border: "1px solid #c9a96e", color: "#c9a96e", background: "transparent" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "#c9a96e"; (e.target as HTMLElement).style.color = "#080808"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#c9a96e"; }}>
            Contact Ashley
          </button>
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden" style={{ background: "#080808" }}>
        {/* Background grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(201,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
        {/* Radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)"
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 items-center w-full py-24">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div style={{ width: 32, height: 1, background: "#c9a96e" }} />
              <span className="text-[#c9a96e] text-xs uppercase tracking-[0.5em] font-bold">Manhattan's #1 Luxury Agent</span>
            </div>
            <h1 className="font-black leading-none mb-8" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#f5f0e8" }}>
              Real Estate<br />
              <span style={{ color: "#c9a96e", fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.02em" }}>Redefined.</span>
            </h1>
            <p style={{ color: "rgba(245,240,232,0.55)", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: 480 }} className="mb-10">
              For 18 years, Ashley Monroe has represented Manhattan's most discerning buyers and sellers — closing over $1.2 billion in luxury transactions with unrivaled precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#listings">
                <button className="px-8 py-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                  style={{ background: "#c9a96e", color: "#080808" }}>
                  View Listings <ArrowUpRight className="w-4 h-4" />
                </button>
              </a>
              <a href="#contact">
                <button className="px-8 py-4 text-sm font-medium tracking-wide"
                  style={{ border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.7)" }}>
                  Schedule Consultation
                </button>
              </a>
            </div>
          </div>

          {/* Right: Agent card */}
          <div className="hidden md:block">
            <div className="relative" style={{ maxWidth: 400, marginLeft: "auto" }}>
              {/* Main card */}
              <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#111 0%,#1a1a1a 100%)", border: "1px solid rgba(201,169,110,0.2)" }}>
                {/* Photo area */}
                <div className="relative h-72 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#0f1923 0%,#1a3a52 60%,#0f2f45 100%)" }}>
                  <div className="text-center">
                    <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black"
                      style={{ background: "rgba(201,169,110,0.15)", border: "2px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}>
                      AM
                    </div>
                    <div className="text-white font-bold text-xl">Ashley Monroe</div>
                    <div style={{ color: "#c9a96e" }} className="text-xs uppercase tracking-widest mt-1">Licensed Real Estate Broker</div>
                    <div className="flex gap-1 justify-center mt-3">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />)}
                    </div>
                  </div>
                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16" style={{
                    background: "linear-gradient(135deg, transparent 50%, rgba(201,169,110,0.3) 50%)"
                  }} />
                </div>
                {/* Stats strip */}
                <div className="grid grid-cols-3 divide-x" style={{ borderTop: "1px solid rgba(201,169,110,0.15)", divideColor: "rgba(201,169,110,0.15)" }}>
                  {[
                    { val: "$1.2B", label: "Volume" },
                    { val: "500+", label: "Sold" },
                    { val: "#1", label: "Ranked" },
                  ].map((s, i) => (
                    <div key={i} className="py-4 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(201,169,110,0.12)" : "none" }}>
                      <div style={{ color: "#c9a96e" }} className="font-black text-xl">{s.val}</div>
                      <div style={{ color: "rgba(245,240,232,0.4)" }} className="text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl flex items-center gap-3"
                style={{ background: "#c9a96e", color: "#080808" }}>
                <Award className="w-5 h-5" />
                <div>
                  <div className="font-black text-xs uppercase tracking-wider">WSJ Top Agent</div>
                  <div className="text-xs opacity-70">2021 · 2022 · 2023 · 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(201,169,110,0.5)" }}>
          <span className="text-xs uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)" }} />
        </div>
      </section>

      {/* ─── AWARDS STRIP ─── */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)" }}
        className="py-5 px-6 md:px-14">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(201,169,110,0.5)" }}>Recognized by</span>
          {awards.map((a, i) => (
            <span key={i} className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(245,240,232,0.35)" }}>{a}</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="py-20 px-6 md:px-14" style={{ background: "#080808" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: "1px solid rgba(201,169,110,0.12)" }}>
          {stats.map((s, i) => (
            <div key={i} className="py-10 px-8 text-center" style={{ borderRight: i < 3 ? "1px solid rgba(201,169,110,0.12)" : "none", background: "#0a0a0a" }}>
              <div className="font-black mb-2" style={{ fontSize: "2.8rem", color: "#c9a96e", lineHeight: 1 }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LISTINGS ─── */}
      <section id="listings" className="py-24 px-6 md:px-14" style={{ background: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
                <span className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-bold">Active Listings</span>
              </div>
              <h2 className="font-black" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#f5f0e8", lineHeight: 1.1 }}>
                Exceptional<br />Properties
              </h2>
            </div>
            <a href="#contact" className="hidden md:flex items-center gap-2 text-sm font-semibold" style={{ color: "#c9a96e" }}>
              View All Listings <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Featured listing (large) */}
          <div className="mb-6 rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
            <div className="grid md:grid-cols-2">
              <div className={`h-72 md:h-full bg-gradient-to-br ${listings[0].gradient} relative flex items-end p-8`}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(201,169,110,0.6) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
                <span className={`relative text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${listings[0].tagColor}`}>
                  {listings[0].tag}
                </span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between" style={{ background: "#0f0f0f" }}>
                <div>
                  <div className="text-3xl font-black mb-1" style={{ color: "#c9a96e" }}>{listings[0].price}</div>
                  <div className="text-white font-bold text-xl mb-1">{listings[0].address}</div>
                  <div className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(245,240,232,0.4)" }}>{listings[0].neighborhood}</div>
                  <p className="leading-relaxed mb-6" style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.95rem" }}>{listings[0].desc}</p>
                  <div className="flex gap-5 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{listings[0].beds} bd</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" />{listings[0].baths} ba</span>
                    <span className="flex items-center gap-1.5"><Square className="w-4 h-4" />{listings[0].sqft} sf</span>
                  </div>
                </div>
                <button className="mt-8 px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 self-start"
                  style={{ border: "1px solid #c9a96e", color: "#c9a96e" }}>
                  Schedule Showing <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid of remaining listings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {listings.slice(1).map((l, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ border: "1px solid rgba(201,169,110,0.1)", background: "#0f0f0f" }}>
                <div className={`h-48 bg-gradient-to-br ${l.gradient} relative flex items-end p-4`}
                  style={{ transition: "opacity 0.3s" }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(201,169,110,0.6) 1px,transparent 0)", backgroundSize: "24px 24px" }} />
                  <span className={`relative text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${l.tagColor}`}>
                    {l.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-black text-xl mb-0.5" style={{ color: "#c9a96e" }}>{l.price}</div>
                  <div className="text-white font-semibold mb-0.5">{l.address}</div>
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,240,232,0.35)" }}>{l.neighborhood}</div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(245,240,232,0.45)" }}>{l.desc}</p>
                  <div className="flex gap-4 text-xs" style={{ color: "rgba(245,240,232,0.4)", borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: "0.75rem" }}>
                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{l.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{l.baths}</span>
                    <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5" />{l.sqft} sf</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-28 px-6 md:px-14" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          {/* Photo column */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0f1923 0%,#1a3a52 60%,#0f2f45 100%)", aspectRatio: "4/5" }}>
              <div className="h-full flex flex-col items-center justify-center text-center p-10">
                <div className="w-36 h-36 rounded-full mb-6 flex items-center justify-center text-5xl font-black"
                  style={{ background: "rgba(201,169,110,0.12)", border: "2px solid rgba(201,169,110,0.35)", color: "#c9a96e" }}>
                  AM
                </div>
                <div className="text-white font-black text-2xl mb-1">Ashley Monroe</div>
                <div style={{ color: "#c9a96e" }} className="text-xs uppercase tracking-[0.35em] mb-4">Licensed Real Estate Broker</div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />)}
                </div>
                <div className="flex gap-4" style={{ color: "rgba(201,169,110,0.6)" }}>
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-[#c9a96e] transition-colors" />
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-[#c9a96e] transition-colors" />
                  <Linkedin className="w-5 h-5 cursor-pointer hover:text-[#c9a96e] transition-colors" />
                </div>
              </div>
            </div>
            {/* Gold line accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl hidden md:block"
              style={{ border: "1px solid rgba(201,169,110,0.2)", zIndex: -1 }} />
            {/* Floating credential */}
            <div className="absolute top-6 -right-4 px-4 py-3 rounded-xl hidden md:block"
              style={{ background: "#c9a96e", color: "#080808" }}>
              <div className="font-black text-xs uppercase tracking-wider">DRE #1982301</div>
              <div className="text-xs opacity-60">Licensed · Bonded · Insured</div>
            </div>
          </div>

          {/* Bio column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
              <span className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-bold">About Ashley</span>
            </div>
            <h2 className="font-black mb-6" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: "#f5f0e8", lineHeight: 1.15 }}>
              Manhattan's Most<br />Trusted Name in<br />Luxury Real Estate
            </h2>
            <div className="space-y-4 mb-8" style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.8, fontSize: "1rem" }}>
              <p>
                Ashley Monroe entered Manhattan real estate in 2006 — a market that doesn't forgive amateurs. What followed was 18 years of relentless study, strategic networking, and an unwavering commitment to her clients that made her one of the most decorated agents in New York.
              </p>
              <p>
                Her approach is rooted in data, driven by discretion, and defined by results. Whether navigating a $500K starter purchase or a $12M trophy penthouse, every client receives the same obsessive attention to detail.
              </p>
              <p>
                Ashley has been featured in the Wall Street Journal, named to the RealTrends America's Best Agents list four years running, and holds the record for the fastest luxury closing in Tribeca's history — 72 hours from listed to signed.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "Buyer & Seller Representation",
                "Off-Market Access",
                "Relocation Specialist",
                "Investment Portfolio",
                "Estate & Trust Sales",
                "1031 Exchange Expert",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#c9a96e" }} />
                  <span style={{ color: "rgba(245,240,232,0.65)" }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#contact">
              <button className="px-8 py-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                style={{ background: "#c9a96e", color: "#080808" }}>
                Work With Ashley <ArrowUpRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY ASHLEY ─── */}
      <section id="results" className="py-24 px-6 md:px-14" style={{ background: "#080808", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
              <span className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-bold">The Difference</span>
              <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
            </div>
            <h2 className="font-black" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: "#f5f0e8" }}>
              Why Discerning Clients<br />Choose Ashley Monroe
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
            {whys.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-10" style={{
                background: "#0a0a0a",
                borderRight: i < 2 ? "1px solid rgba(201,169,110,0.1)" : "none"
              }}>
                <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#c9a96e" }} />
                </div>
                <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEIGHBORHOODS ─── */}
      <section id="neighborhoods" className="py-16 px-6 md:px-14" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <span className="text-xs uppercase tracking-[0.4em] font-bold shrink-0" style={{ color: "rgba(201,169,110,0.5)" }}>Markets Served</span>
          {neighborhoods.map((n, i) => (
            <span key={i} className="text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-all"
              style={{ border: "1px solid rgba(201,169,110,0.15)", color: "rgba(245,240,232,0.55)" }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = "#c9a96e"; el.style.color = "#c9a96e"; }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = "rgba(201,169,110,0.15)"; el.style.color = "rgba(245,240,232,0.55)"; }}>
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 md:px-14" style={{ background: "#080808", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
            <span className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-bold">Client Testimonials</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl"
                style={{ background: "#0f0f0f", border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "rgba(245,240,232,0.65)" }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: "1px solid rgba(201,169,110,0.1)", paddingTop: "1.25rem" }}>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs" style={{ color: "rgba(201,169,110,0.7)" }}>{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 px-6 md:px-14" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "#c9a96e" }} />
              <span className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] font-bold">Get in Touch</span>
            </div>
            <h2 className="font-black mb-6" style={{ fontSize: "clamp(2rem,3vw,2.8rem)", color: "#f5f0e8", lineHeight: 1.2 }}>
              Ready to Make<br />Your Next Move?
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: "rgba(245,240,232,0.5)", fontSize: "1rem" }}>
              Whether you're buying, selling, or simply exploring your options — a 30-minute conversation with Ashley can change everything. Schedule yours today.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Direct Line", val: "(212) 555-0091" },
                { icon: Mail, label: "Email", val: "ashley@premierprops.com" },
                { icon: MapPin, label: "Office", val: "550 Madison Avenue, Suite 2800, New York" },
              ].map(({ icon: Icon, label, val }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                    <Icon className="w-4 h-4" style={{ color: "#c9a96e" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "rgba(201,169,110,0.5)" }}>{label}</div>
                    <div className="font-semibold text-white text-sm">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(201,169,110,0.12)" }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#c9a96e" }} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">Message Received</h3>
                <p style={{ color: "rgba(245,240,232,0.5)" }} className="text-sm">Ashley will personally respond within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-bold text-white text-lg mb-6">Schedule a Consultation</h3>
                {[
                  { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                  { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                  { key: "phone", label: "Phone Number", placeholder: "(212) 555-0000", type: "tel" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(201,169,110,0.7)" }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={(formData as any)[key]}
                      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: "#080808",
                        border: "1px solid rgba(201,169,110,0.2)",
                        color: "#f5f0e8",
                        borderRadius: 8,
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(201,169,110,0.7)" }}>How Can Ashley Help?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell Ashley what you're looking for..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{
                      background: "#080808",
                      border: "1px solid rgba(201,169,110,0.2)",
                      color: "#f5f0e8",
                      borderRadius: 8,
                    }}
                  />
                </div>
                <button type="submit" className="w-full py-4 text-sm font-bold uppercase tracking-widest"
                  style={{ background: "#c9a96e", color: "#080808" }}>
                  Send Message
                </button>
                <p className="text-center text-xs" style={{ color: "rgba(245,240,232,0.25)" }}>
                  Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-14" style={{ background: "#050505", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-black text-white">Ashley Monroe · Premier Properties</div>
            <div className="text-xs mt-1" style={{ color: "rgba(245,240,232,0.25)" }}>Licensed Real Estate Broker · DRE #1982301 · New York</div>
          </div>
          <div className="text-xs" style={{ color: "rgba(245,240,232,0.2)" }}>
            © 2025 Premier Properties. Website by <span style={{ color: "rgba(201,169,110,0.5)" }}>WebCraft Studio</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
