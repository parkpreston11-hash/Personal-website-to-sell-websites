import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import QuotePage from "@/pages/quote";
import CheckoutPage from "@/pages/checkout";
import RestaurantDemo from "@/pages/demos/restaurant";
import BarberDemo from "@/pages/demos/barber";
import RealEstateDemo from "@/pages/demos/realestate";
import PackagesPage from "@/pages/packages";
import AdminPage from "@/pages/admin";
import TrackPage from "@/pages/track";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AiChat } from "@/components/AiChat";

const queryClient = new QueryClient();

const DEMO_PATHS = ["/demo/restaurant", "/demo/barber", "/demo/realestate"];

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();
  const isDemo = DEMO_PATHS.some((p) => location.startsWith(p));
  const isAdmin = location.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isDemo && !isAdmin && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quote" component={QuotePage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/packages" component={PackagesPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/track" component={TrackPage} />
          <Route path="/demo/restaurant" component={RestaurantDemo} />
          <Route path="/demo/barber" component={BarberDemo} />
          <Route path="/demo/realestate" component={RealEstateDemo} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isDemo && !isAdmin && <Footer />}
      {!isAdmin && <AiChat />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
