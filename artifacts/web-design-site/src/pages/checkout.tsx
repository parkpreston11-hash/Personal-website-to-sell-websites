import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowLeft, Tag, X, Lock, Gift } from "lucide-react";

const REFERRAL_CODE = "mrexcellence";
const AL_CODE = "al";
const DISCOUNTED_STARTER_PRICE = 99.99;
const AL_PACKAGE_PRICE = 600;

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
  multilang: { name: "Multi-Language Support", price: 50 },
  admin_panel: { name: "Admin Panel", price: 50 },
  maintenance: { name: "Website Maintenance (billed monthly)", price: 50, isMonthly: true },
};

const freeAddonOptions = [
  { id: "ai_chatbot", name: "AI Chatbot", price: 299 },
  { id: "crm", name: "CRM/System Connection", price: 499 },
  { id: "booking", name: "Booking Calendar", price: 199 },
  { id: "extra_page", name: "Extra Page", price: 99 },
  { id: "branding", name: "Logo/Branding Help", price: 149 },
  { id: "multilang", name: "Multi-Language Support", price: 50 },
  { id: "admin_panel", name: "Admin Panel", price: 50 },
];

export default function CheckoutPage() {
  const [order, setOrder] = useState<any>(null);
  const [referralInput, setReferralInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeStatus, setCodeStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [freeAddonId, setFreeAddonId] = useState<string | null>(null);

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

  const mrexcellenceApplied = appliedCode === REFERRAL_CODE;
  const alApplied = appliedCode === AL_CODE;
  const isStarterPackage = order.packageId === "starter";

  // Build effective add-on ID list
  // mrexcellence forces admin_panel; Al adds the chosen free addon
  const effectiveAddOnIds: string[] = useMemo(() => {
    let ids: string[] = [...(order.addOns ?? [])];
    if (mrexcellenceApplied && !ids.includes("admin_panel")) {
      ids = [...ids, "admin_panel"];
    }
    if (alApplied && freeAddonId && !ids.includes(freeAddonId)) {
      ids = [...ids, freeAddonId];
    }
    return ids;
  }, [order, mrexcellenceApplied, alApplied, freeAddonId]);

  // Package base price
  const packageBasePrice = (() => {
    if (alApplied) return AL_PACKAGE_PRICE;
    if (mrexcellenceApplied && isStarterPackage) return DISCOUNTED_STARTER_PRICE;
    return packagePrices[order.packageId] ?? 0;
  })();

  const originalPackagePrice = packagePrices[order.packageId] ?? 0;

  // Map add-on IDs to objects, carrying the id through
  const addOns = effectiveAddOnIds
    .map((id) => ({ id, ...addOnsList[id] }))
    .filter((a) => a.name);

  const oneTimeAddOns = addOns.filter((a) => !a.isMonthly);
  const monthlyAddOns = addOns.filter((a) => a.isMonthly);

  // Get displayed price for an add-on (Al code makes the free one $0)
  function getAddonDisplayPrice(id: string, price: number) {
    if (alApplied && id === freeAddonId) return 0;
    return price;
  }

  const oneTimeTotal =
    packageBasePrice +
    oneTimeAddOns.reduce((sum, a) => sum + getAddonDisplayPrice(a.id, a.price), 0);
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
      setFreeAddonId(null);
    } else if (code === AL_CODE) {
      setAppliedCode(code);
      setCodeStatus("valid");
      setFreeAddonId(null);
    } else {
      setCodeStatus("invalid");
      setAppliedCode(null);
    }
  }

  function handleRemoveCode() {
    setAppliedCode(null);
    setReferralInput("");
    setCodeStatus("idle");
    setFreeAddonId(null);
  }

  // Savings display for mrexcellence
  const mrexcellenceSavings = mrexcellenceApplied && isStarterPackage
    ? originalPackagePrice - DISCOUNTED_STARTER_PRICE
    : 0;

  // Savings display for Al (package delta + free addon value)
  const alPackageDelta = alApplied ? AL_PACKAGE_PRICE - originalPackagePrice : 0;
  const alFreeAddonValue = alApplied && freeAddonId
    ? (freeAddonOptions.find((a) => a.id === freeAddonId)?.price ?? 0)
    : 0;

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
                  {(mrexcellenceApplied || alApplied) && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-muted-foreground line-through text-sm">${originalPackagePrice}</span>
                      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        Code Applied
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {(mrexcellenceApplied || alApplied) && (
                    <div className="text-muted-foreground line-through text-sm text-right">${originalPackagePrice.toFixed(2)}</div>
                  )}
                  <div className={`font-bold text-lg ${(mrexcellenceApplied || alApplied) ? "text-green-600 dark:text-green-400" : ""}`}>
                    ${packageBasePrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* One-time Add-ons */}
              {oneTimeAddOns.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-border mb-4">
                  {oneTimeAddOns.map((addon) => {
                    const isRequired = mrexcellenceApplied && addon.id === "admin_panel";
                    const isFree = alApplied && addon.id === freeAddonId;
                    const displayPrice = getAddonDisplayPrice(addon.id, addon.price);
                    return (
                      <div key={addon.id} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          + {addon.name}
                          {isRequired && (
                            <span className="inline-flex items-center gap-0.5 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded-full">
                              <Lock className="w-2.5 h-2.5" /> Required
                            </span>
                          )}
                          {isFree && (
                            <span className="inline-flex items-center gap-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-1.5 py-0.5 rounded-full">
                              <Gift className="w-2.5 h-2.5" /> FREE
                            </span>
                          )}
                        </span>
                        {isFree ? (
                          <span className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                            <span className="line-through text-muted-foreground text-xs">${addon.price}</span>
                            $0
                          </span>
                        ) : (
                          <span className="font-semibold">+${displayPrice}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Monthly Add-ons */}
              {monthlyAddOns.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-dashed border-border mb-4">
                  {monthlyAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-sm">
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
                    <span className={`text-4xl font-black ${(mrexcellenceApplied || alApplied) ? "text-green-600 dark:text-green-400" : "text-primary"}`}>
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
                {mrexcellenceApplied && mrexcellenceSavings > 0 && (
                  <div className="flex justify-between items-center text-green-600 dark:text-green-400 text-sm font-semibold mt-1">
                    <span>Referral discount saved you</span>
                    <span>-${mrexcellenceSavings.toFixed(2)}</span>
                  </div>
                )}
                {alApplied && (
                  <div className="mt-2 space-y-1">
                    {alPackageDelta !== 0 && (
                      <div className={`flex justify-between items-center text-sm font-semibold ${alPackageDelta < 0 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                        <span>Package price adjustment</span>
                        <span>{alPackageDelta < 0 ? "-" : "+"}${Math.abs(alPackageDelta).toFixed(2)}</span>
                      </div>
                    )}
                    {alFreeAddonValue > 0 && (
                      <div className="flex justify-between items-center text-green-600 dark:text-green-400 text-sm font-semibold">
                        <span>Free add-on value included</span>
                        <span>-${alFreeAddonValue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Al Code — Free Add-On Selector */}
          {alApplied && (
            <Card className="border-green-200 dark:border-green-800 shadow-lg">
              <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 pb-4">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Gift className="w-5 h-5" />
                  Pick Your Free Add-On
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Your <span className="font-bold uppercase">AL</span> code includes 1 free add-on of your choice. Select one below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {freeAddonOptions.map((option) => {
                    const selected = freeAddonId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFreeAddonId(selected ? null : option.id)}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                          selected
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-border bg-background hover:bg-secondary/40"
                        }`}
                      >
                        <span className={`font-medium text-sm ${selected ? "text-green-700 dark:text-green-400" : ""}`}>
                          {option.name}
                        </span>
                        <span className={`text-sm font-bold ml-2 ${selected ? "text-green-600 dark:text-green-400" : "text-muted-foreground line-through"}`}>
                          {selected ? "FREE" : `$${option.price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {!freeAddonId && (
                  <p className="text-amber-600 dark:text-amber-400 text-xs mt-3 font-medium">
                    Select one add-on above to claim your free benefit.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Referral / Promo Code */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Referral / Promo Code</span>
              </div>

              {appliedCode ? (
                <div className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                  alApplied
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-bold text-green-700 dark:text-green-400 uppercase tracking-wider text-sm">
                      {appliedCode}
                    </span>
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      {mrexcellenceApplied && "— Starter $99.99 + Admin Panel required!"}
                      {alApplied && "— All packages $600 + 1 free add-on!"}
                    </span>
                  </div>
                  <button onClick={handleRemoveCode} className="text-muted-foreground hover:text-foreground transition-colors ml-2 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Input
                    data-testid="input-referral-code"
                    placeholder="Enter referral or promo code"
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
                <p className="text-muted-foreground text-xs mt-2">Have a referral or promo code? Enter it above.</p>
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
