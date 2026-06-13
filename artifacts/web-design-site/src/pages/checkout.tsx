import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const [location] = useLocation();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("webcraft_order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground mb-4">No order found.</p>
        <Link href="/quote">
          <Button>Return to Quote Builder</Button>
        </Link>
      </div>
    );
  }

  const packageNames = {
    starter: "Starter Website",
    business: "Business Website",
    premium: "Premium Website",
  };

  return (
    <div className="min-h-screen bg-secondary/20 pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/quote" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Edit Order
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">Confirm Your Request</h1>

        <div className="grid grid-cols-1 gap-8">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              
              {/* Customer Info */}
              <div className="mb-8 p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">Client Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Name:</span>
                    <span className="font-medium">{order.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Business:</span>
                    <span className="font-medium">{order.businessName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Email:</span>
                    <span className="font-medium">{order.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Phone:</span>
                    <span className="font-medium">{order.phone}</span>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">Project Items</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>{packageNames[order.packageId as keyof typeof packageNames]}</span>
                </div>
                
                {order.addOns.length > 0 && (
                  <div className="pl-4 space-y-2 border-l-2 border-border text-muted-foreground">
                    {order.addOns.map((addonId: string) => (
                      <div key={addonId} className="flex justify-between items-center">
                        <span>+ Add-on included</span>
                      </div>
                    ))}
                    <div className="text-xs pt-1">Details recorded from previous step</div>
                  </div>
                )}
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-bold">Total Investment</span>
                    <span className="text-4xl font-bold text-primary">${order.total}</span>
                  </div>
                  {order.monthly > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="font-medium">Monthly Services</span>
                      <span className="font-semibold">${order.monthly}/mo</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <Button 
                  size="lg" 
                  className="w-full h-16 text-lg bg-foreground hover:bg-foreground/90" 
                  disabled
                >
                  Payment Integration Coming Soon
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  We'll contact you at <span className="font-medium text-foreground">{order.email}</span> within 24 hours to confirm your project details and arrange payment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
