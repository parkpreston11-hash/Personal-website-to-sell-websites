import { Link } from "wouter";
import { Phone, Mail, MapPin, Star, ChevronLeft, Home, BedDouble, Bath, Square } from "lucide-react";

const listings = [
  {
    address: "412 Magnolia Drive",
    neighborhood: "Riverside Heights",
    price: "$875,000",
    beds: 4,
    baths: 3,
    sqft: "2,850",
    status: "For Sale",
    gradient: "from-sky-800 to-blue-900",
    tag: "New Listing",
  },
  {
    address: "88 Crestview Lane",
    neighborhood: "Elmwood Estates",
    price: "$1,150,000",
    beds: 5,
    baths: 4,
    sqft: "3,600",
    status: "For Sale",
    gradient: "from-indigo-800 to-slate-900",
    tag: "Featured",
  },
  {
    address: "23 Harbor Bluff Ct",
    neighborhood: "Waterfront District",
    price: "$2,200,000",
    beds: 6,
    baths: 5,
    sqft: "5,100",
    status: "For Sale",
    gradient: "from-teal-800 to-cyan-900",
    tag: "Luxury",
  },
];

const stats = [
  { value: "$180M+", label: "Sales Volume" },
  { value: "350+", label: "Homes Sold" },
  { value: "98%", label: "List-to-Sale Ratio" },
  { value: "12 yrs", label: "Market Experience" },
];

export default function RealEstateDemo() {
  return (
    <div className="min-h-screen bg-white text-[#0f1923] font-sans">
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
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#e8e4dc]">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-[#1a5276]" />
          <div>
            <div className="font-bold text-[#0f1923] text-lg leading-none tracking-tight">Premier Properties</div>
            <div className="text-[#1a5276] text-xs tracking-widest uppercase font-medium">Ashley Monroe · Realtor</div>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#5a6470]">
          <a href="#listings" className="hover:text-[#1a5276] transition-colors">Listings</a>
          <a href="#about" className="hover:text-[#1a5276] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#1a5276] transition-colors">Contact</a>
        </div>
        <a href="#contact">
          <button className="bg-[#1a5276] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154360] transition-colors">
            Schedule a Call
          </button>
        </a>
      </nav>

      {/* Hero */}
      <section
        className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f1923 0%, #1a3a52 60%, #0f2f45 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block bg-white/10 border border-white/20 text-white/70 text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-8">
            Licensed Real Estate Agent · Metro Area
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Your Dream Home<br />
            <span className="text-[#7dc4e4]">Starts Here.</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mb-10 leading-relaxed">
            With 12 years of experience and $180M+ in closed sales, Ashley Monroe delivers results that matter — for buyers and sellers alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#listings">
              <button className="bg-white text-[#0f1923] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#f0f4f8] transition-colors w-full sm:w-auto">
                Browse Listings
              </button>
            </a>
            <a href="#contact">
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
                Schedule a Consultation
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#f7f5f2] border-b border-[#e8e4dc]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-[#1a5276] mb-1">{s.value}</div>
              <div className="text-[#5a6470] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="text-[#1a5276] text-xs uppercase tracking-[0.4em] font-semibold mb-3">Active Listings</div>
            <h2 className="text-4xl font-bold text-[#0f1923]">Featured Properties</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-[#e8e4dc] hover:shadow-xl transition-shadow group cursor-pointer">
                <div className={`h-52 bg-gradient-to-br ${l.gradient} relative flex items-end p-4`}>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {l.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-xl text-[#0f1923] mb-0.5">{l.address}</div>
                      <div className="text-[#5a6470] text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {l.neighborhood}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#1a5276] my-4">{l.price}</div>
                  <div className="flex gap-4 text-sm text-[#5a6470]">
                    <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" />{l.beds} bd</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{l.baths} ba</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" />{l.sqft} sqft</span>
                  </div>
                  <button className="mt-5 w-full border-2 border-[#1a5276] text-[#1a5276] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a5276] hover:text-white transition-colors">
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[#f7f5f2]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-2xl bg-gradient-to-br from-[#1a3a52] to-[#0f1923] flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                AM
              </div>
              <div className="text-white font-bold text-xl">Ashley Monroe</div>
              <div className="text-white/50 text-sm">Licensed Realtor · DRE #1982301</div>
              <div className="flex gap-1 justify-center mt-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#1a5276] text-xs uppercase tracking-[0.4em] font-semibold mb-4">Meet Ashley</div>
            <h2 className="text-4xl font-bold text-[#0f1923] mb-6">More Than an Agent — A Trusted Advisor</h2>
            <p className="text-[#5a6470] leading-relaxed mb-4">
              Ashley Monroe has spent over a decade helping families buy and sell homes in the metro area. Known for her honesty, market expertise, and relentless advocacy for her clients, Ashley has built a reputation as one of the region's most trusted agents.
            </p>
            <p className="text-[#5a6470] leading-relaxed mb-6">
              Whether you're a first-time buyer, seasoned investor, or looking to sell at the right price — Ashley brings the strategy, data, and network to get it done.
            </p>
            <a href="#contact">
              <button className="bg-[#1a5276] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#154360] transition-colors">
                Work With Ashley
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#1a5276] text-xs uppercase tracking-[0.4em] font-semibold mb-4">Get in Touch</div>
          <h2 className="text-4xl font-bold text-[#0f1923] mb-4">Ready to Make a Move?</h2>
          <p className="text-[#5a6470] mb-12">Let's talk about your goals. Schedule a free 30-minute consultation.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Phone, label: "Phone", val: "(555) 231-0045" },
              { icon: Mail, label: "Email", val: "ashley@premierprops.com" },
              { icon: MapPin, label: "Office", val: "550 Lexington Ave, Suite 700" },
            ].map(({ icon: Icon, label, val }, i) => (
              <div key={i} className="border border-[#e8e4dc] rounded-2xl p-6 text-left">
                <Icon className="w-5 h-5 text-[#1a5276] mb-3" />
                <div className="font-semibold text-[#0f1923] mb-1">{label}</div>
                <div className="text-[#5a6470] text-sm">{val}</div>
              </div>
            ))}
          </div>
          <button className="bg-[#1a5276] text-white px-10 py-4 rounded-lg font-bold text-base hover:bg-[#154360] transition-colors w-full md:w-auto">
            Schedule a Free Consultation
          </button>
        </div>
      </section>

      <footer className="border-t border-[#e8e4dc] py-8 text-center text-[#9aa5b0] text-sm">
        © 2025 Premier Properties · Ashley Monroe, Realtor · Website by WebCraft Studio
      </footer>
    </div>
  );
}
