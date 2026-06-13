import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AiChat } from "@/components/AiChat";

const queryClient = new QueryClient();

const DEMO_PATHS = ["/demo/restaurant", "/demo/barber", "/demo/realestate"];

function Router() {
  const [location] = useLocation();
  const isDemo = DEMO_PATHS.some((p) => location.startsWith(p));

  return (
    <div className="flex flex-col min-h-screen">
      {!isDemo && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quote" component={QuotePage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/packages" component={PackagesPage} />
          <Route path="/demo/restaurant" component={RestaurantDemo} />
          <Route path="/demo/barber" component={BarberDemo} />
          <Route path="/demo/realestate" component={RealEstateDemo} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isDemo && <Footer />}
      <AiChat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
