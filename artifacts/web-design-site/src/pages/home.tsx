import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Building2, 
  Home as HomeIcon, 
  LayoutTemplate, 
  Target, 
  ShoppingCart, 
  BotMessageSquare, 
  Database, 
  CalendarDays,
  CheckCircle2,
  Star,
  ExternalLink,
  Utensils,
  Scissors,
  Key
} from "lucide-react";

const services = [
  { icon: Building2, title: "Business Websites", desc: "Professional sites that build trust and credibility." },
  { icon: HomeIcon, title: "Real Estate Websites", desc: "Showcase properties and capture buyer leads." },
  { icon: LayoutTemplate, title: "Landing Pages", desc: "High-converting single pages for campaigns." },
  { icon: Target, title: "Lead Generation", desc: "Optimized funnels to turn visitors into clients." },
  { icon: ShoppingCart, title: "E-commerce Websites", desc: "Beautiful online stores that drive sales." },
  { icon: BotMessageSquare, title: "AI Chatbot Integration", desc: "Automate support and capture leads 24/7." },
  { icon: Database, title: "CRM/System Connection", desc: "Seamless integration with your business tools." },
  { icon: CalendarDays, title: "Booking Setup", desc: "Allow clients to schedule appointments easily." }
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Professional Websites Built to Grow Your Business
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We create modern, high-converting websites for businesses, creators, and professionals.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/quote" data-testid="hero-cta-quote">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-primary/20">
                Get Your Quote
              </Button>
            </Link>
            <Link href="/packages" data-testid="hero-cta-pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 border-2">
                View Packages
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border"
          >
            {[
              "100+ Websites Sold",
              "5-Star Satisfaction",
              "Fast Delivery",
              "Custom Business Designs"
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <span className="text-sm md:text-base font-semibold text-foreground/80">{stat}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
            <p className="text-muted-foreground text-lg">Comprehensive digital solutions tailored to your industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card key={i} className="border-border/50 bg-background hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{s.desc}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">Choose the perfect package for your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Starter Website</CardTitle>
                <div className="text-4xl font-bold mt-4">$499</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {["1–3 pages", "Mobile-friendly design", "Contact form", "Basic SEO", "3-day delivery"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/quote?package=starter" className="w-full">
                  <Button variant="outline" className="w-full h-12 text-base border-2">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Business (Popular) */}
            <Card className="flex flex-col border-primary shadow-xl relative scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">Business Website</CardTitle>
                <div className="text-4xl font-bold mt-4">$999</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {["5–7 pages", "Professional design", "Contact/lead form", "Google Maps section", "Basic analytics", "5-day delivery"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/quote?package=business" className="w-full">
                  <Button className="w-full h-12 text-base shadow-md">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Premium Website</CardTitle>
                <div className="text-4xl font-bold mt-4">$1,999+</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {["Custom design", "AI chatbot option", "CRM connection option", "Booking system", "Advanced lead capture", "Priority support"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/quote?package=premium" className="w-full">
                  <Button variant="outline" className="w-full h-12 text-base border-2">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-secondary/30 border-y">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">Powerful Add-Ons</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { n: "AI Chatbot", p: "$299" },
              { n: "CRM Connect", p: "$499" },
              { n: "Booking", p: "$199" },
              { n: "Extra Page", p: "$99" },
              { n: "Branding", p: "$149" },
              { n: "Maintenance", p: "$99/mo" }
            ].map((addon, i) => (
              <div key={i} className="bg-background border rounded-xl p-4 text-center shadow-sm">
                <div className="font-semibold mb-1">{addon.n}</div>
                <div className="text-primary font-bold">{addon.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Sarah Jenkins", biz: "Real Estate Agent", text: "WebCraft completely transformed my online presence. I'm getting more leads than ever before." },
              { name: "Michael Chen", biz: "Restaurant Owner", text: "The new website is beautiful and the menu is so easy to read on mobile. Highly recommended!" },
              { name: "David Miller", biz: "Financial Consultant", text: "Professional, fast, and responsive. They built exactly what I needed to build trust with my clients." }
            ].map((t, i) => (
              <Card key={i} className="bg-background border-none shadow-md">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <CardDescription className="text-base text-foreground/80 italic">"{t.text}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.biz}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Websites Section */}
      <section id="demos" className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Live Examples
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See What We Can Build for You</h2>
            <p className="text-muted-foreground text-lg">
              These are real, fully functional demo websites — click any one to open and browse it like a real client would.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">

            {/* Restaurant Demo */}
            <div className="group rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div
                className="h-52 relative flex items-end p-5"
                style={{ background: "linear-gradient(135deg, #1a1208 0%, #2d2010 50%, #1a1208 100%)" }}
              >
                <div className="absolute inset-0 opacity-15"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg,#c9a96e 0,#c9a96e 1px,transparent 0,transparent 50%)", backgroundSize: "32px 32px" }} />
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/20 border border-[#c9a96e]/30 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">Bella Vista</div>
                    <div className="text-white/50 text-xs mt-0.5">Italian Restaurant</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 bg-background flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Restaurant</div>
                <h3 className="font-bold text-xl mb-2">Fine Dining Website</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  A full restaurant site with a seasonal menu, about section, online reservation CTA, and a premium dark aesthetic that commands attention.
                </p>
                <Link href="/demo/restaurant" data-testid="link-demo-restaurant">
                  <Button className="w-full mt-5 gap-2 group-hover:shadow-lg transition-shadow">
                    Open Demo <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Barber Demo */}
            <div className="group rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div
                className="h-52 relative flex items-end p-5"
                style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 60%, #0d0d0d 100%)" }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.4) 1px,transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">Prestige Cuts</div>
                    <div className="text-white/50 text-xs mt-0.5">Barbershop</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 bg-background flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Barber / Salon</div>
                <h3 className="font-bold text-xl mb-2">Barbershop Website</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  A sleek, modern barbershop site with services & pricing, team profiles, booking CTA, and a bold all-black design that builds instant credibility.
                </p>
                <Link href="/demo/barber" data-testid="link-demo-barber">
                  <Button className="w-full mt-5 gap-2 group-hover:shadow-lg transition-shadow">
                    Open Demo <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Real Estate Demo */}
            <div className="group rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div
                className="h-52 relative flex items-end p-5"
                style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a3a52 60%, #0f2f45 100%)" }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.3) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#7dc4e4]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">Premier Properties</div>
                    <div className="text-white/50 text-xs mt-0.5">Real Estate Agent</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 bg-background flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Real Estate</div>
                <h3 className="font-bold text-xl mb-2">Realtor Agent Website</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  A professional real estate agent site with active property listings, agent bio, trust stats, and a polished navy design that converts visitors into leads.
                </p>
                <Link href="/demo/realestate" data-testid="link-demo-realestate">
                  <Button className="w-full mt-5 gap-2 group-hover:shadow-lg transition-shadow">
                    Open Demo <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              Want a site like these? <Link href="/quote" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">Get your quote in 2 minutes.</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to get your website built?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12 text-lg">
            <div className="font-semibold text-primary">hello@webcraftstudio.com</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="font-semibold">(555) 123-4567</div>
          </div>
          <Link href="/quote">
            <Button size="lg" className="h-16 px-10 text-xl shadow-xl shadow-primary/20">Start Your Project Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
