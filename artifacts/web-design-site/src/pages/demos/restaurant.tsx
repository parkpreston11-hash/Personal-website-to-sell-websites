import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, ChevronLeft, Utensils } from "lucide-react";

const menu = [
  {
    category: "Starters",
    items: [
      { name: "Bruschetta al Pomodoro", desc: "Toasted sourdough, heirloom tomatoes, fresh basil, aged balsamic", price: "$14" },
      { name: "Burrata & Prosciutto", desc: "Creamy burrata, thin-sliced prosciutto, arugula, truffle oil", price: "$18" },
      { name: "Zuppa del Giorno", desc: "Chef's daily soup with housemade bread", price: "$12" },
    ],
  },
  {
    category: "Mains",
    items: [
      { name: "Rigatoni all'Amatriciana", desc: "Guanciale, San Marzano tomatoes, Pecorino Romano, fresh chili", price: "$26" },
      { name: "Branzino al Forno", desc: "Whole roasted sea bass, lemon, capers, cherry tomatoes, white wine", price: "$38" },
      { name: "Bistecca Fiorentina", desc: "28-day dry-aged T-bone, rosemary butter, roasted potatoes", price: "$54" },
      { name: "Risotto ai Funghi", desc: "Wild mushroom, aged Parmigiano, truffle shavings, white wine", price: "$28" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Tiramisù Classico", desc: "Housemade with espresso, mascarpone, Savoiardi biscuits", price: "$11" },
      { name: "Panna Cotta", desc: "Vanilla bean, mixed berry coulis, mint", price: "$10" },
    ],
  },
];

export default function RestaurantDemo() {
  return (
    <div className="min-h-screen bg-[#0e0c09] text-white font-sans">
      {/* Demo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium flex items-center justify-center gap-3 sticky top-0 z-50">
        <span>Demo Website — Built by WebCraft Studio</span>
        <Link href="/">
          <span className="underline underline-offset-2 cursor-pointer hover:opacity-80 flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back to WebCraft
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="absolute top-10 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#c9a96e]" />
          <span className="text-xl font-bold tracking-widest uppercase text-white">Bella Vista</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-white/70">
          <a href="#menu" className="hover:text-[#c9a96e] transition-colors">Menu</a>
          <a href="#about" className="hover:text-[#c9a96e] transition-colors">About</a>
          <a href="#reserve" className="hover:text-[#c9a96e] transition-colors">Reserve</a>
        </div>
        <a href="#reserve">
          <button className="border border-[#c9a96e] text-[#c9a96e] px-6 py-2 text-sm uppercase tracking-widest hover:bg-[#c9a96e] hover:text-black transition-all">
            Reserve a Table
          </button>
        </a>
      </nav>

      {/* Hero */}
      <div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1208 0%, #0e0c09 50%, #1a1208 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <div className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-6 font-medium">Est. 2018 · Florence, Italy</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none tracking-tight">
            Bella <span className="text-[#c9a96e] italic font-light">Vista</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
            Authentic Italian cuisine crafted from generations of family tradition, served in the heart of the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#reserve">
              <button className="bg-[#c9a96e] text-black px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-[#b8954f] transition-colors">
                Reserve a Table
              </button>
            </a>
            <a href="#menu">
              <button className="border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest hover:border-white transition-colors">
                View Menu
              </button>
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
          {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />)}
        </div>
      </div>

      {/* About */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-4">Our Story</div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">A Kitchen Built on Tradition</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              For over 20 years, Chef Marco Romano has been bringing the soul of Tuscany to every plate. Trained under his grandmother in a small village outside Siena, Marco carries forward recipes passed down through four generations.
            </p>
            <p className="text-white/60 leading-relaxed">
              We source our ingredients from local farms and import specialty items directly from Italy — because the best food starts with the best ingredients.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Years of Excellence", value: "20+" },
              { label: "Dishes on Menu", value: "40+" },
              { label: "5-Star Reviews", value: "1,200+" },
              { label: "Private Events", value: "500+" },
            ].map((s, i) => (
              <div key={i} className="border border-white/10 p-6 text-center">
                <div className="text-3xl font-bold text-[#c9a96e] mb-1">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 bg-[#0a0807] px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-4">Our Menu</div>
            <h2 className="text-4xl font-bold">Seasonal Selections</h2>
          </div>
          {menu.map((section) => (
            <div key={section.category} className="mb-12">
              <h3 className="text-[#c9a96e] uppercase tracking-widest text-sm font-bold mb-6 border-b border-[#c9a96e]/20 pb-3">
                {section.category}
              </h3>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{item.name}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                    <div className="text-[#c9a96e] font-bold text-lg shrink-0">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-4">Reservations</div>
          <h2 className="text-4xl font-bold">Book Your Table</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold mb-1">Call Us</div>
              <div className="text-white/60">(555) 890-1234</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold mb-1">Hours</div>
              <div className="text-white/60">Tue–Sun: 5pm – 10pm</div>
            </div>
          </div>
          <div className="flex items-start gap-4 md:col-span-2">
            <MapPin className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold mb-1">Location</div>
              <div className="text-white/60">128 Vine Street, Downtown District</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="bg-[#c9a96e] text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-[#b8954f] transition-colors w-full md:w-auto">
            Make a Reservation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/30 text-sm">
        © 2025 Bella Vista Restaurant · Website by WebCraft Studio
      </footer>
    </div>
  );
}
