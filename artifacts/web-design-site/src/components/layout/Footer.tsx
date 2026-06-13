export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">W</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">WebCraft Studio</span>
            </div>
            <p className="text-muted max-w-sm">
              We create modern, high-converting websites for businesses, creators, and professionals. Your online presence, crafted to perfection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Links</h4>
            <ul className="space-y-2 text-muted">
              <li><a href="/#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
              <li><a href="/#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a></li>
              <li><a href="/#portfolio" className="hover:text-primary-foreground transition-colors">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-muted">
              <li>hello@webcraftstudio.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-muted text-sm">
          &copy; {new Date().getFullYear()} WebCraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
