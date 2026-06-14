import { Link } from "wouter";
import { Phone, Clock, MapPin, Star, ChevronLeft, Scissors } from "lucide-react";

const services = [
  { name: "Classic Cut", desc: "Precision haircut with wash & style", price: "$35" },
  { name: "Fade & Taper", desc: "Skin fade, taper, or blended fade", price: "$40" },
  { name: "Beard Trim & Line-Up", desc: "Shape, trim, and define your beard", price: "$25" },
  { name: "Cut + Beard Combo", desc: "Full haircut and beard service", price: "$55" },
  { name: "Hot Towel Shave", desc: "Traditional straight-razor shave with hot towel", price: "$45" },
  { name: "Kids Cut (Under 12)", desc: "Haircut for the little ones", price: "$25" },
];

const team = [
  { name: "Marcus Webb", title: "Master Barber · 12 yrs", initials: "MW", color: "from-slate-700 to-slate-900" },
  { name: "Jordan Price", title: "Fade Specialist · 8 yrs", initials: "JP", color: "from-zinc-700 to-zinc-900" },
  { name: "Darius Cole", title: "Style Consultant · 6 yrs", initials: "DC", color: "from-neutral-700 to-neutral-900" },
];

export default function BarberDemo() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans">
      {/* Demo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium flex items-center justify-center gap-3 sticky top-0 z-50">
        <span>Demo Website — Built by WebStudioLaunch</span>
        <Link href="/">
          <span className="underline underline-offset-2 cursor-pointer hover:opacity-80 flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back to WebStudioLaunch
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <Scissors className="w-4 h-4 text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight">Prestige Cuts</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-white/60 font-medium">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#team" className="hover:text-white transition-colors">Our Barbers</a>
          <a href="#book" className="hover:text-white transition-colors">Book</a>
        </div>
        <a href="#book">
          <button className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/90 transition-colors">
            Book Now
          </button>
        </a>
      </nav>

      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-white/70">Walk-ins welcome · Mon–Sat 9am–7pm</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-6">
            Look Sharp.<br />
            <span className="text-white/25">Feel Confident.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl mb-10 leading-relaxed">
            Premium cuts and grooming for the modern man. No compromises. No rush. Just craft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#book">
              <button className="bg-white text-black px-8 py-4 rounded-lg font-bold text-base hover:bg-white/90 transition-colors w-full sm:w-auto">
                Book an Appointment
              </button>
            </a>
            <a href="#services">
              <button className="border border-white/20 text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-white/5 transition-colors w-full sm:w-auto">
                View Services & Pricing
              </button>
            </a>
          </div>
          <div className="flex items-center gap-2 mt-10">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            <span className="text-white/50 text-sm ml-1">4.9 · 800+ Reviews on Google</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="text-white/30 text-xs uppercase tracking-[0.4em] mb-3">The Menu</div>
            <h2 className="text-4xl font-black">Services & Pricing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-white/8 rounded-2xl p-5 hover:border-white/20 hover:bg-white/3 transition-all group"
              >
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{s.name}</div>
                  <div className="text-white/40 text-sm">{s.desc}</div>
                </div>
                <div className="text-white font-bold text-xl ml-4">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="text-white/30 text-xs uppercase tracking-[0.4em] mb-3">The Crew</div>
            <h2 className="text-4xl font-black">Meet Your Barbers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-white/8">
                <div className={`h-52 bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold">
                    {m.initials}
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-bold text-lg">{m.name}</div>
                  <div className="text-white/40 text-sm">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="py-24 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Get on the Calendar</div>
          <h2 className="text-4xl font-black mb-4">Book Your Appointment</h2>
          <p className="text-white/50 mb-10">Walk-ins are welcome, but booking ahead guarantees your spot.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Phone className="w-5 h-5 mb-3 text-white/40" />
              <div className="font-semibold mb-1">Call or Text</div>
              <div className="text-white/50 text-sm">(555) 456-7890</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Clock className="w-5 h-5 mb-3 text-white/40" />
              <div className="font-semibold mb-1">Hours</div>
              <div className="text-white/50 text-sm">Mon–Sat: 9am–7pm<br />Sun: 10am–4pm</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <MapPin className="w-5 h-5 mb-3 text-white/40" />
              <div className="font-semibold mb-1">Location</div>
              <div className="text-white/50 text-sm">304 Oak Avenue, Suite 2</div>
            </div>
          </div>
          <button className="bg-white text-black px-10 py-4 rounded-lg font-bold text-base hover:bg-white/90 transition-colors w-full md:w-auto">
            Book Online Now
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/25 text-sm">
        © 2025 Prestige Cuts Barbershop · Website by WebStudioLaunch
      </footer>
    </div>
  );
}
