import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X, Zap, TrendingUp, Crown, ArrowRight, Users, Clock, ShieldCheck } from "lucide-react";

const STARTER_PRICE = 499;
const BUSINESS_PRICE = 999;
const PREMIUM_PRICE = 1999;

const packages = [
  {
    id: "starter",
    icon: Zap,
    badge: null,
    name: "Starter",
    tagline: "Stop losing clients to competitors who have a website.",
    price: STARTER_PRICE,
    priceNote: "one-time",
    roi: "One new client pays for this 3× over.",
    psychNote: "Most businesses without a website lose 60% of prospects before a single conversation.",
    color: "border-border",
    btnVariant: "outline" as const,
    includes: [
      { text: "1–3 pages (Home, Services, Contact)", good: true },
      { text: "Mobile-friendly — looks great on every phone", good: true },
      { text: "Contact form so leads can reach you instantly", good: true },
      { text: "Basic SEO so Google can find you", good: true },
      { text: "Ready in 3 business days", good: true },
      { text: "Google Maps & analytics", good: false },
      { text: "Advanced lead capture", good: false },
      { text: "AI chatbot / booking system", good: false },
    ],
    cta: "Get My Starter Site",
    highlight: false,
  },
  {
    id: "business",
    icon: TrendingUp,
    badge: "MOST POPULAR — Best Value",
    name: "Business",
    tagline: "The complete online presence that turns strangers into paying clients.",
    price: BUSINESS_PRICE,
    priceNote: "one-time",
    roi: "Clients judge your business by your website. This one passes every test.",
    psychNote: "86% of our clients who chose Business said they wished they started here instead of somewhere cheaper.",
    color: "border-primary",
    btnVariant: "default" as const,
    includes: [
      { text: "5–7 pages — everything a real business needs", good: true },
      { text: "Professional design clients trust on sight", good: true },
      { text: "Contact & lead capture forms", good: true },
      { text: "Google Maps embedded section", good: true },
      { text: "Basic analytics to track visitors", good: true },
      { text: "Ready in 5 business days", good: true },
      { text: "SEO-optimized for local search", good: true },
      { text: "AI chatbot / booking system (add-on available)", good: false },
    ],
    cta: "Get My Business Site",
    highlight: true,
  },
  {
    id: "premium",
    icon: Crown,
    badge: "FULL POWER",
    name: "Premium",
    tagline: "Built for businesses ready to dominate their market.",
    price: PREMIUM_PRICE,
    priceNote: "starting at",
    roi: "Includes automation tools that work for you while you sleep.",
    psychNote: "Premium clients with AI chatbot add-on report capturing leads even on weekends and after hours.",
    color: "border-border",
    btnVariant: "outline" as const,
    includes: [
      { text: "Fully custom design — nothing off the shelf", good: true },
      { text: "AI chatbot to capture leads 24/7 (add-on)", good: true },
      { text: "CRM/system integration (add-on)", good: true },
      { text: "Booking & appointment system (add-on)", good: true },
      { text: "Advanced lead capture funnels", good: true },
      { text: "Priority support — direct line to your team", good: true },
      { text: "Everything in Business, and more", good: true },
      { text: "Custom timeline based on scope", good: true },
    ],
    cta: "Get My Premium Site",
    highlight: false,
  },
];

const objections = [
  {
    q: "Is $499 really worth it for a small business?",
    a: "Think about it this way: if your website brings in just one new client, it's already paid for itself — usually several times over. And it works 24/7, never takes a day off, and never asks for a raise.",
  },
  {
    q: "What makes Business worth $500 more than Starter?",
    a: "The Business package is the difference between a website and a sales machine. More pages means more trust. Lead forms mean more contacts. Google Maps means local buyers find you. Analytics means you can see what's working. Most clients recoup the difference in their first month.",
  },
  {
    q: "Why would I need Premium?",
    a: "If you want automation — a chatbot capturing leads while you sleep, a booking system so clients book without calling you, or a CRM that logs every inquiry — Premium is built for that. It pays for itself fast when you stop losing after-hours leads.",
  },
  {
    q: "Do I pay before you start?",
    a: "No. You submit your order, we review it with you first, then arrange payment once everything is confirmed. No surprises.",
  },
];

const trust = [
  { icon: Users, stat: "100+", label: "Businesses launched" },
  { icon: ShieldCheck, stat: "5-Star", label: "Customer satisfaction" },
  { icon: Clock, stat: "3–5 days", label: "Average delivery" },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-8 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Choose Your Package
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Every Day Without a Website<br className="hidden md:block" />
            <span className="text-primary"> Is a Day Clients Choose Someone Else.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Pick the package that fits where your business is today. All three are built to pay for themselves — the question is how fast.
          </p>
          <div className="flex justify-center gap-8 mt-10 flex-wrap">
            {trust.map(({ icon: Icon, stat, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">{stat}</strong> {label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                data-testid={`card-package-${pkg.id}`}
                className={`relative rounded-2xl border-2 ${pkg.color} ${pkg.highlight ? "shadow-2xl shadow-primary/20 scale-[1.03] z-10 bg-background" : "bg-background shadow-md"} flex flex-col overflow-hidden transition-all`}
              >
                {pkg.badge && (
                  <div className={`text-center text-xs font-bold uppercase tracking-widest py-2.5 ${pkg.highlight ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`}>
                    {pkg.badge}
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pkg.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-xl">{pkg.name}</div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.tagline}</p>

                  {/* Price */}
                  <div className="mb-2">
                    {pkg.id === "premium" && (
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{pkg.priceNote}</div>
                    )}
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black">${pkg.price.toLocaleString()}</span>
                      {pkg.id !== "premium" && <span className="text-muted-foreground text-sm mb-2">one-time</span>}
                      {pkg.id === "premium" && <span className="text-muted-foreground text-sm mb-2">+</span>}
                    </div>
                  </div>

                  {/* ROI note */}
                  <div className="bg-primary/8 border border-primary/15 rounded-xl p-3 mb-6">
                    <p className="text-xs text-primary font-semibold leading-relaxed">{pkg.roi}</p>
                  </div>

                  {/* Includes */}
                  <div className="space-y-2.5 flex-1 mb-7">
                    {pkg.includes.map((item, i) => (
                      <div key={i} className={`flex items-start gap-2.5 text-sm ${item.good ? "text-foreground" : "text-muted-foreground/50"}`}>
                        {item.good
                          ? <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          : <X className="w-4 h-4 shrink-0 mt-0.5" />
                        }
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social proof nudge */}
                  <div className="text-xs text-muted-foreground italic mb-5 border-t border-border pt-4">
                    {pkg.psychNote}
                  </div>

                  <Link href={`/quote?package=${pkg.id}`} data-testid={`link-get-${pkg.id}`}>
                    <Button variant={pkg.btnVariant} size="lg" className={`w-full h-12 text-base gap-2 ${pkg.highlight ? "shadow-lg shadow-primary/25" : ""}`}>
                      {pkg.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Not sure which to pick? <Link href="/quote" className="text-primary font-semibold underline underline-offset-2">Start the quote builder</Link> — it helps you figure it out in 2 minutes.
        </p>
      </section>

      {/* Side-by-side comparison table */}
      <section className="py-20 px-4 md:px-8 bg-secondary/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How They Stack Up</h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 font-semibold text-muted-foreground">Feature</th>
                  <th className="p-5 text-center font-bold">Starter<br /><span className="text-primary font-black text-lg">$499</span></th>
                  <th className="p-5 text-center font-bold bg-primary/5 border-x border-primary/20">Business<br /><span className="text-primary font-black text-lg">$999</span></th>
                  <th className="p-5 text-center font-bold">Premium<br /><span className="text-primary font-black text-lg">$1,999+</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Number of pages", "1–3", "5–7", "Unlimited"],
                  ["Mobile-friendly design", "✓", "✓", "✓"],
                  ["Contact form", "✓", "✓", "✓"],
                  ["Basic SEO", "✓", "✓", "✓"],
                  ["Google Maps section", "—", "✓", "✓"],
                  ["Analytics setup", "—", "✓", "✓"],
                  ["Lead capture forms", "—", "✓", "✓"],
                  ["AI Chatbot (add-on)", "—", "Available", "Available"],
                  ["Booking system (add-on)", "—", "Available", "Available"],
                  ["CRM connection (add-on)", "—", "Available", "Available"],
                  ["Priority support", "—", "—", "✓"],
                  ["Delivery time", "3 days", "5 days", "Custom"],
                ].map(([feature, starter, business, premium], i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                    <td className="p-4 pl-5 font-medium">{feature}</td>
                    <td className="p-4 text-center text-muted-foreground">{starter}</td>
                    <td className="p-4 text-center font-semibold bg-primary/5 border-x border-primary/20 text-foreground">{business}</td>
                    <td className="p-4 text-center text-muted-foreground">{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Real Questions, Straight Answers</h2>
          <p className="text-center text-muted-foreground mb-12">No fluff. Here's what people actually ask before they buy.</p>
          <div className="space-y-4">
            {objections.map((o, i) => (
              <div key={i} className="border border-border rounded-2xl p-6">
                <div className="font-bold text-base mb-2 flex items-start gap-3">
                  <span className="text-primary font-black text-lg leading-none mt-0.5">Q</span>
                  {o.q}
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3">
                  <span className="font-black text-lg leading-none mt-0.5 text-foreground/30">A</span>
                  {o.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your competitors already have a website.</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            The best time to build yours was a year ago. The second best time is right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote?package=business" data-testid="cta-get-business">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-base font-bold gap-2">
                Start with Business — $999 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/quote?package=starter" data-testid="cta-get-starter">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Try Starter — $499
              </Button>
            </Link>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-6">No payment upfront. We review your order with you first.</p>
        </div>
      </section>

    </div>
  );
}
