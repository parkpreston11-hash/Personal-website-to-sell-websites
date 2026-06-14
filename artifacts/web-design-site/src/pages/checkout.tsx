import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowLeft, Tag, X } from "lucide-react";

const REFERRAL_CODE = "mrexcellence";
const DISCOUNTED_STARTER_PRICE = 99.99;
const ORIGINAL_STARTER_PRICE = 499;

const packageNames: Record<string, string> = {
  starter: "Starter Website",
  business: "Business Website",
  premium: "Premium Website",
};

const packagePrices: Record<string, number> = {
  starter: 499,
  business: 999,
  premium: 1999,
};

const addOnsList: Record<string, { name: string; price: number; isMonthly?: boolean }> = {
  ai_chatbot: { name: "AI Chatbot", price: 299 },
  crm: { name: "CRM/System Connection", price: 499 },
  booking: { name: "Booking Calendar", price: 199 },
  extra_page: { name: "Extra Page", price: 99 },
  branding: { name: "Logo/Branding Help", price: 149 },
  maintenance: { name: "Website Maintenance (billed monthly)", price: 50, isMonthly: true },
};

export default function CheckoutPage() {
  const [order, setOrder] = useState<any>(null);
  const [referralInput, setReferralInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeStatus, setCodeStatus] = useState<"idle" | "valid" | "invalid">("idle");

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

  const isStarterPackage = order.packageId === "starter";
  const referralApplied = appliedCode === REFERRAL_CODE && isStarterPackage;

  const packageBasePrice = referralApplied ? DISCOUNTED_STARTER_PRICE : packagePrices[order.packageId] ?? 0;
  const originalPackagePrice = packagePrices[order.packageId] ?? 0;

  const addOns: { name: string; price: number; isMonthly?: boolean }[] = (order.addOns ?? []).map(
    (id: string) => addOnsList[id]
  ).filter(Boolean);

  const oneTimeAddOns = addOns.filter((a) => !a.isMonthly);
  const monthlyAddOns = addOns.filter((a) => a.isMonthly);

  const oneTimeTotal = packageBasePrice + oneTimeAddOns.reduce((sum, a) => sum + a.price, 0);
  const monthlyTotal = monthlyAddOns.reduce((sum, a) => sum + a.price, 0);

  function handleApplyCode() {
    const code = referralInput.trim().toLowerCase();
    if (code === REFERRAL_CODE) {
      if (!isStarterPackage) {
        setCodeStatus("invalid");
        return;
      }
      setAppliedCode(code);
      setCodeStatus("valid");
    } else {
      setCodeStatus("invalid");
      setAppliedCode(null);
    }
  }

  function handleRemoveCode() {
    setAppliedCode(null);
    setReferralInput("");
    setCodeStatus("idle");
  }

  return (
    <div className="min-h-screen bg-secondary/20 pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/quote" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Edit Order
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">Confirm Your Request</h1>

        <div className="space-y-6">

          {/* Client Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-muted-foreground uppercase tracking-wider font-semibold">Client Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Name</span>
                  <span className="font-semibold">{order.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Business</span>
                  <span className="font-semibold">{order.businessName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Email</span>
                  <span className="font-semibold">{order.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Phone</span>
                  <span className="font-semibold">{order.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">

              {/* Package Line */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold text-base">{packageNames[order.packageId]}</div>
                  {referralApplied && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-muted-foreground line-through text-sm">${ORIGINAL_STARTER_PRICE}</span>
                      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        Code Applied
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {referralApplied && (
                    <div className="text-muted-foreground line-through text-sm text-right">${ORIGINAL_STARTER_PRICE.toFixed(2)}</div>
                  )}
                  <div className={`font-bold text-lg ${referralApplied ? "text-green-600 dark:text-green-400" : ""}`}>
                    ${packageBasePrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              {oneTimeAddOns.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-border mb-4">
                  {oneTimeAddOns.map((addon, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">+ {addon.name}</span>
                      <span className="font-semibold">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {monthlyAddOns.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-dashed border-border mb-4">
                  {monthlyAddOns.map((addon, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">+ {addon.name}</span>
                      <span className="font-semibold">+${addon.price}/mo</span>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="my-5" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">Total Investment</span>
                  <div className="text-right">
                    {referralApplied && (
                      <div className="text-muted-foreground line-through text-sm text-right">
                        ${(ORIGINAL_STARTER_PRICE + oneTimeAddOns.reduce((s, a) => s + a.price, 0)).toFixed(2)}
                      </div>
                    )}
                    <span className={`text-4xl font-black ${referralApplied ? "text-green-600 dark:text-green-400" : "text-primary"}`}>
                      ${oneTimeTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                {monthlyTotal > 0 && (
                  <div className="flex justify-between items-center text-muted-foreground text-sm">
                    <span>Monthly Recurring</span>
                    <span className="font-semibold">${monthlyTotal}/mo</span>
                  </div>
                )}
                {referralApplied && (
                  <div className="flex justify-between items-center text-green-600 dark:text-green-400 text-sm font-semibold mt-1">
                    <span>Referral discount saved you</span>
                    <span>-${(ORIGINAL_STARTER_PRICE - DISCOUNTED_STARTER_PRICE).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Referral Code */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Referral / Promo Code</span>
              </div>

              {appliedCode ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-bold text-green-700 dark:text-green-400 uppercase tracking-wider text-sm">{appliedCode}</span>
                    <span className="text-green-600 dark:text-green-400 text-sm">— Starter discounted to $99.99!</span>
                  </div>
                  <button onClick={handleRemoveCode} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Input
                    data-testid="input-referral-code"
                    placeholder="Enter referral code"
                    value={referralInput}
                    onChange={(e) => {
                      setReferralInput(e.target.value);
                      setCodeStatus("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCode()}
                    className={codeStatus === "invalid" ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  <Button
                    data-testid="btn-apply-code"
                    variant="outline"
                    onClick={handleApplyCode}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              )}

              {codeStatus === "invalid" && !appliedCode && (
                <p className="text-red-500 text-xs mt-2">
                  {referralInput.trim().toLowerCase() === REFERRAL_CODE
                    ? "This code only applies to the Starter package."
                    : "That code doesn't match. Double-check and try again."}
                </p>
              )}
              {!appliedCode && codeStatus === "idle" && (
                <p className="text-muted-foreground text-xs mt-2">Have a referral code? Enter it above for a discount.</p>
              )}
            </CardContent>
          </Card>

          {/* Payment Button */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full h-16 text-lg bg-foreground hover:bg-foreground/90 cursor-not-allowed"
              disabled
              data-testid="btn-payment-placeholder"
            >
              Payment Integration Coming Soon
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              We'll contact you at <span className="font-medium text-foreground">{order.email}</span> within 24 hours to confirm your project and collect payment.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
