import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [location] = useLocation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location !== "/") {
      return;
    }
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo} alt="WebStudioLaunch logo" className="h-12 w-12 object-contain rounded-lg" />
          <span className="font-heading font-bold text-xl tracking-tight">WebStudioLaunch</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#services" onClick={(e) => handleScroll(e, "services")} className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
          <Link href="/#pricing" onClick={(e) => handleScroll(e, "pricing")} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/#portfolio" onClick={(e) => handleScroll(e, "portfolio")} className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
          <Link href="/#testimonials" onClick={(e) => handleScroll(e, "testimonials")} className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
          <Link href="/#contact" onClick={(e) => handleScroll(e, "contact")} className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/quote" data-testid="nav-cta-quote">
            <Button className="font-semibold px-6 shadow-sm">Get a Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
