import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist. Return to WebStudioLaunch to explore our web design services."
        noindex
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-8xl font-black text-primary/20 mb-4">404</p>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/packages">
            <Button variant="outline">View Packages</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
