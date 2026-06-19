import { SEOHead } from "@/components/SEOHead";
import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, Tag, X, Lock, Gift, ShieldCheck, CreditCard,
  CheckCircle2, XCircle, Package, Copy, Loader2, AlertTriangle,
} from "lucide-react";

const REFERRAL_CODE = "mrexcellence";
const AL_CODE = "al";
const DISCOUNTED_STARTER_PRICE = 99.99;
const AL_PACKAGE_PRICE = 600;
const DECLINE_CARD = "4000000000000002";

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

function formatCardNumber(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
  return digits;
}

function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "WSL-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

type PaymentState = "idle" | "processing" | "success" | "declined";

export default function CheckoutPage() {
  const [order, setOrder] = useState<any>(null);
  const [referralInput, setReferralInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeStatus, setCodeStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [freeAddonIds, setFreeAddonIds] = useState<string[]>([]);
  const [halfOffAddonId, setHalfOffAddonId] = useState<string | null>(null);

  const [payMethod, setPayMethod] = useState<"card" | "applepay">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardError, setCardError] = useState("");

  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("webcraft_order");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
  }, []);

  const mrexcellenceApplied = appliedCode === REFERRAL_CODE;
  const alApplied = appliedCode === AL_CODE;
  const isStarterPackage = order?.packageId === "starter";

  const effectiveAddOnIds: string[] = useMemo(() => {
    if (!order) return [];
    let ids: string[] = [...(order.addOns ?? [])];
    if (mrexcellenceApplied && !ids.includes("admin_panel")) ids = [...ids, "admin_panel"];
    if (mrexcellenceApplied && halfOffAddonId && !ids.includes(halfOffAddonId)) ids = [...ids, halfOffAddonId];
    if (alApplied) {
      for (const id of freeAddonIds) {
        if (!ids.includes(id)) ids = [...ids, id];
      }
    }
    return ids;
  }, [order, mrexcellenceApplied, alApplied, freeAddonIds, halfOffAddonId]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground mb-4">No order found.</p>
        <Link href="/quote"><Button>Return to Quote Builder</Button></Link>
      </div>
    );
  }

  const packageBasePrice = (() => {
    if (alApplied) return AL_PACKAGE_PRICE;
    if (mrexcellenceApplied && isStarterPackage) return DISCOUNTED_STARTER_PRICE;
    return packagePrices[order.packageId] ?? 0;
  })();
  const originalPackagePrice = packagePrices[order.packageId] ?? 0;

  const addOns = effectiveAddOnIds.map((id) => ({ id, ...addOnsList[id] })).filter((a) => a.name);
  const oneTimeAddOns = addOns.filter((a) => !a.isMonthly);
  const monthlyAddOns = addOns.filter((a) => a.isMonthly);

  function getAddonDisplayPrice(id: string, price: number) {
    if (alApplied && freeAddonIds.includes(id)) return 0;
    if (mrexcellenceApplied && id === halfOffAddonId) return Math.round(price / 2 * 100) / 100;
    return price;
  }

  const oneTimeTotal = packageBasePrice + oneTimeAddOns.reduce((sum, a) => sum + getAddonDisplayPrice(a.id, a.price), 0);
  const monthlyTotal = monthlyAddOns.reduce((sum, a) => sum + a.price, 0);
  const alFreeAddonValue = alApplied ? freeAddonIds.reduce((sum, id) => sum + (freeAddonOptions.find((a) => a.id === id)?.price ?? 0), 0) : 0;
  const alPackageDelta = alApplied ? AL_PACKAGE_PRICE - originalPackagePrice : 0;
  const mrexcellencePackageSavings = mrexcellenceApplied && isStarterPackage ? originalPackagePrice - DISCOUNTED_STARTER_PRICE : 0;
  const mrexcellenceHalfOffSavings = mrexcellenceApplied && halfOffAddonId ? (freeAddonOptions.find((a) => a.id === halfOffAddonId)?.price ?? 0) / 2 : 0;
  const mrexcellenceSavings = mrexcellencePackageSavings + mrexcellenceHalfOffSavings;

  function handleApplyCode() {
    const code = referralInput.trim().toLowerCase();
    if (code === REFERRAL_CODE) {
      if (!isStarterPackage) { setCodeStatus("invalid"); return; }
      setAppliedCode(code); setCodeStatus("valid"); setFreeAddonIds([]); setHalfOffAddonId(null);
    } else if (code === AL_CODE) {
      setAppliedCode(code); setCodeStatus("valid"); setFreeAddonIds([]); setHalfOffAddonId(null);
    } else {
      setCodeStatus("invalid"); setAppliedCode(null);
    }
  }

  function handleRemoveCode() {
    setAppliedCode(null); setReferralInput(""); setCodeStatus("idle"); setFreeAddonIds([]); setHalfOffAddonId(null);
  }

  function confirmPayment() {
    const code = generateTrackingCode();
    const estimatedCompletion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const submission = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      trackingCode: code,
      status: "purchased",
      estimatedCompletion,
      paymentStatus: "confirmed",
      name: order.name,
      email: order.email,
      phone: order.phone,
      businessName: order.businessName,
      packageId: order.packageId,
      addOns: effectiveAddOnIds,
      details: order.details ?? "",
      total: oneTimeTotal,
      monthly: monthlyTotal,
    };

    const existing = localStorage.getItem("webcraft_submissions");
    const all = existing ? JSON.parse(existing) : [];
    all.push(submission);
    localStorage.setItem("webcraft_submissions", JSON.stringify(all));
    localStorage.setItem("webcraft_my_code", code);

    setConfirmedCode(code);
    setPaymentState("success");
  }

  async function handlePayStripe() {
    setStripeError(null);
    setCardError("");
    setPaymentState("processing");

    const productParts = [packageNames[order.packageId] ?? "Website"];
    if (effectiveAddOnIds.length > 0) {
      productParts.push(`+ ${effectiveAddOnIds.length} add-on${effectiveAddOnIds.length > 1 ? "s" : ""}`);
    }
    const productName = `${productParts.join(" ")} — WebStudioLaunch`;

    localStorage.setItem(
      "webcraft_effective_order",
      JSON.stringify({
        packageId: order.packageId,
        name: order.name,
        email: order.email,
        phone: order.phone,
        businessName: order.businessName,
        addOns: effectiveAddOnIds,
        details: order.details ?? "",
        total: oneTimeTotal,
        monthly: monthlyTotal,
      })
    );

    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: oneTimeTotal,
          productName,
          customerEmail: order.email,
          customerName: order.name,
          origin: window.location.origin,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Payment could not be started. Please try again.");
      }
      window.location.href = data.url;
    } catch (err: any) {
      setStripeError(err.message || "Something went wrong. Please try again.");
      setPaymentState("idle");
    }
  }

  function handlePayCard() {
    handlePayStripe();
  }

  function handlePayApple() {
    handlePayStripe();
  }

  function handleCopyCode() {
    if (!confirmedCode) return;
    navigator.clipboard.writeText(confirmedCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  const isProcessing = paymentState === "processing";
  const codeApplied = !!appliedCode;

  // ── SUCCESS SCREEN ──────────────────────────────────────────────
  if (paymentState === "success" && confirmedCode) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4 py-16">
        <SEOHead
          title="Order Confirmed"
          description="Your website order has been confirmed. Track your project status with your tracking code."
          noindex
        />
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-black text-green-600 dark:text-green-400">Payment Confirmed!</h1>
            <p className="text-muted-foreground mt-2">
              Thank you, <span className="font-semibold text-foreground">{order.name}</span>. Your project is now in our queue.
            </p>
          </div>

          <Card className="border-primary/30 shadow-xl text-left">
            <CardContent className="pt-6 pb-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Your Project Tracking Code
              </div>
              <div className="font-mono font-black text-4xl tracking-widest text-primary mb-2">
                {confirmedCode}
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Save this code. Enter it on the <strong>Track Order</strong> page at any time to check your project's progress.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-1.5">
                  {codeCopied ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
                </Button>
                <Link href="/track">
                  <Button size="sm" className="gap-1.5">
                    <Package className="w-3.5 h-3.5" /> Track My Project
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="bg-background border border-border rounded-xl px-5 py-4 text-sm text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package</span>
              <span className="font-semibold">{packageNames[order.packageId]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-primary">${oneTimeTotal.toFixed(2)}</span>
            </div>
            {monthlyTotal > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly</span>
                <span className="font-semibold">${monthlyTotal}/mo</span>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            We'll reach out to <span className="font-medium text-foreground">{order.email}</span> within 24 hours to kick things off.
          </p>

          <Link href="/" className="inline-block text-sm text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── MAIN CHECKOUT ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/20 pt-10 pb-24">
      <SEOHead
        title="Secure Checkout"
        description="Complete your website order securely. Transparent pricing, no hidden fees."
        noindex
      />
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        <div className="mb-6">
          <Link href="/quote" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Edit Order
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center">Secure Checkout</h1>
        <p className="text-center text-muted-foreground mb-10 flex items-center justify-center gap-1.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-green-500" /> SSL encrypted · Your tracking code is generated after payment
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Payment Form ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Contact recap */}
            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Contact</span>
                  <Link href="/quote" className="text-xs text-primary hover:underline">Change</Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                  <span className="font-semibold">{order.name}</span>
                  <span className="hidden sm:block text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{order.email}</span>
                  <span className="hidden sm:block text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{order.businessName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Declined banner */}
            {paymentState === "declined" && (
              <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-5 py-4">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-700 dark:text-red-400">Payment Denied</p>
                  <p className="text-sm text-red-600/80 dark:text-red-400/70 mt-0.5">
                    Your card was declined. Please try another card or check your card details and try again.
                  </p>
                </div>
              </div>
            )}

            {/* Payment method */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                {/* Method toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setPayMethod("applepay")} disabled={isProcessing}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 font-semibold text-sm transition-colors ${payMethod === "applepay" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground hover:bg-secondary/40"}`}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.2-167.7-103.8c-72.5-76.6-132.4-196.1-132.4-309.9 0-200.9 131.7-307.2 261.5-307.2 66.5 0 121.8 43.4 163.1 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                    </svg>
                    Apple Pay
                  </button>
                  <button type="button" onClick={() => setPayMethod("card")} disabled={isProcessing}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 font-semibold text-sm transition-colors ${payMethod === "card" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground hover:bg-secondary/40"}`}>
                    <CreditCard className="w-4 h-4" /> Credit / Debit Card
                  </button>
                </div>

                {/* Apple Pay panel */}
                {payMethod === "applepay" && (
                  <div className="rounded-xl border border-border bg-secondary/10 p-6 flex flex-col items-center gap-4">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7 fill-white" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.2-167.7-103.8c-72.5-76.6-132.4-196.1-132.4-309.9 0-200.9 131.7-307.2 261.5-307.2 66.5 0 121.8 43.4 163.1 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-base">Pay with Apple Pay</p>
                      <p className="text-muted-foreground text-sm mt-1">Use Face ID, Touch ID, or your passcode</p>
                    </div>
                    {stripeError && (
                      <div className="w-full flex items-start gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 text-left">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {stripeError}
                      </div>
                    )}
                    <button type="button" onClick={handlePayApple} disabled={isProcessing}
                      className="w-full bg-black text-white rounded-xl py-3.5 font-semibold text-base flex items-center justify-center gap-2 hover:bg-black/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                      {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</> : (
                        <>
                          <svg className="w-5 h-5 fill-white" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.2-167.7-103.8c-72.5-76.6-132.4-196.1-132.4-309.9 0-200.9 131.7-307.2 261.5-307.2 66.5 0 121.8 43.4 163.1 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                          </svg>
                          Pay ${oneTimeTotal.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Card panel */}
                {payMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="card-number" className="text-sm font-medium">Card Number</Label>
                      <div className="relative">
                        <Input id="card-number" placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => { setCardNumber(formatCardNumber(e.target.value)); setCardError(""); setPaymentState("idle"); }}
                          className="pr-16 font-mono tracking-wider" maxLength={19} disabled={isProcessing} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <svg className="h-5 w-auto" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="780" height="500" rx="40" fill="#1A1F71"/>
                            <text x="390" y="310" textAnchor="middle" fill="white" fontSize="210" fontFamily="Arial" fontWeight="bold" fontStyle="italic">VISA</text>
                          </svg>
                          <svg className="h-5 w-auto" viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg">
                            <rect width="780" height="500" rx="40" fill="#252525"/>
                            <circle cx="300" cy="250" r="150" fill="#EB001B"/>
                            <circle cx="480" cy="250" r="150" fill="#F79E1B"/>
                            <path d="M390 139c37.6 28.1 62 72.4 62 122.4S427.6 360.9 390 389c-37.6-28.1-62-72.4-62-122.4S352.4 167.1 390 139z" fill="#FF5F00"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="card-expiry" className="text-sm font-medium">Expiry Date</Label>
                        <Input id="card-expiry" placeholder="MM / YY" value={cardExpiry}
                          onChange={(e) => { setCardExpiry(formatExpiry(e.target.value)); setCardError(""); }}
                          className="font-mono" maxLength={7} disabled={isProcessing} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="card-cvc" className="text-sm font-medium">Security Code</Label>
                        <Input id="card-cvc" placeholder="CVV" value={cardCvc}
                          onChange={(e) => { setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4)); setCardError(""); }}
                          className="font-mono" maxLength={4} disabled={isProcessing} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="card-name" className="text-sm font-medium">Name on Card</Label>
                      <Input id="card-name" placeholder="John Doe" value={cardName}
                        onChange={(e) => { setCardName(e.target.value); setCardError(""); }}
                        className="uppercase" disabled={isProcessing} />
                    </div>

                    {(cardError || stripeError) && (
                      <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> {stripeError || cardError}
                      </div>
                    )}

                    <div className="pt-2">
                      <button type="button" onClick={handlePayCard} disabled={isProcessing}
                        className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                        {isProcessing
                          ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                          : <><Lock className="w-5 h-5" /> Pay ${oneTimeTotal.toFixed(2)}{monthlyTotal > 0 && <span className="text-sm font-normal opacity-80">+ ${monthlyTotal}/mo</span>}</>
                        }
                      </button>
                      <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Payments secured and processed by Stripe
                      </p>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> SSL Secured</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-blue-500" /> Data Encrypted</span>
              <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-primary" /> Tracking code issued after payment</span>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">

              <Card className="border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5 pb-5 space-y-4">

                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <div className="font-semibold">{packageNames[order.packageId]}</div>
                      {(mrexcellenceApplied || alApplied) && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-muted-foreground line-through text-xs">${originalPackagePrice}</span>
                          <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-1.5 py-0.5 rounded-full">Promo</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      {(mrexcellenceApplied || alApplied) && (
                        <div className="text-muted-foreground line-through text-xs">${originalPackagePrice}</div>
                      )}
                      <div className={`font-bold ${(mrexcellenceApplied || alApplied) ? "text-green-600 dark:text-green-400" : ""}`}>
                        ${packageBasePrice.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {oneTimeAddOns.length > 0 && (
                    <div className="space-y-2 text-sm border-t pt-3">
                      {oneTimeAddOns.map((addon) => {
                        const isRequired = mrexcellenceApplied && addon.id === "admin_panel";
                        const isFree = alApplied && freeAddonIds.includes(addon.id);
                        const isHalfOff = mrexcellenceApplied && addon.id === halfOffAddonId;
                        return (
                          <div key={addon.id} className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-1 flex-wrap">
                              + {addon.name}
                              {isRequired && <span className="inline-flex items-center gap-0.5 text-xs bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full"><Lock className="w-2.5 h-2.5" /> Required</span>}
                              {isFree && <span className="inline-flex items-center gap-0.5 text-xs bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full"><Gift className="w-2.5 h-2.5" /> FREE</span>}
                              {isHalfOff && <span className="inline-flex items-center gap-0.5 text-xs bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full"><Tag className="w-2.5 h-2.5" /> 50% OFF</span>}
                            </span>
                            {isFree
                              ? <span className="font-semibold text-green-600 flex items-center gap-1 shrink-0 ml-2"><span className="line-through text-muted-foreground text-xs">${addon.price}</span> $0</span>
                              : isHalfOff
                                ? <span className="font-semibold text-amber-600 flex items-center gap-1 shrink-0 ml-2"><span className="line-through text-muted-foreground text-xs">${addon.price}</span> ${(addon.price / 2).toFixed(2)}</span>
                                : <span className="font-semibold shrink-0 ml-2">+${getAddonDisplayPrice(addon.id, addon.price)}</span>
                            }
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {monthlyAddOns.length > 0 && (
                    <div className="space-y-2 text-sm border-t border-dashed pt-3">
                      {monthlyAddOns.map((addon) => (
                        <div key={addon.id} className="flex justify-between items-center">
                          <span className="text-muted-foreground">+ {addon.name}</span>
                          <span className="font-semibold shrink-0 ml-2">+${addon.price}/mo</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-base">Total</span>
                      <span className={`text-3xl font-black ${(mrexcellenceApplied || alApplied) ? "text-green-600 dark:text-green-400" : "text-primary"}`}>
                        ${oneTimeTotal.toFixed(2)}
                      </span>
                    </div>
                    {monthlyTotal > 0 && (
                      <div className="flex justify-between items-center text-muted-foreground text-xs">
                        <span>Monthly recurring</span>
                        <span className="font-semibold">${monthlyTotal}/mo</span>
                      </div>
                    )}
                    {mrexcellenceApplied && mrexcellencePackageSavings > 0 && (
                      <div className="flex justify-between items-center text-green-600 text-xs font-semibold">
                        <span>Referral discount</span><span>-${mrexcellencePackageSavings.toFixed(2)}</span>
                      </div>
                    )}
                    {mrexcellenceApplied && mrexcellenceHalfOffSavings > 0 && (
                      <div className="flex justify-between items-center text-amber-600 text-xs font-semibold">
                        <span>50% off add-on savings</span><span>-${mrexcellenceHalfOffSavings.toFixed(2)}</span>
                      </div>
                    )}
                    {alApplied && (
                      <>
                        {alPackageDelta !== 0 && (
                          <div className={`flex justify-between items-center text-xs font-semibold ${alPackageDelta < 0 ? "text-green-600" : "text-amber-600"}`}>
                            <span>Package adjustment</span><span>{alPackageDelta < 0 ? "-" : "+"}${Math.abs(alPackageDelta)}</span>
                          </div>
                        )}
                        {alFreeAddonValue > 0 && (
                          <div className="flex justify-between items-center text-green-600 text-xs font-semibold">
                            <span>Free add-ons value</span><span>-${alFreeAddonValue}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Al code free add-on selector — up to 3 */}
              {alApplied && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
                      <Gift className="w-4 h-4" /> Pick Up to 3 Free Add-Ons
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-3">
                      Select up to 3 add-ons included free with your AL code.{" "}
                      <span className="font-semibold text-green-700 dark:text-green-400">{freeAddonIds.length}/3 selected</span>
                    </p>
                    <div className="space-y-2">
                      {freeAddonOptions.map((option) => {
                        const selected = freeAddonIds.includes(option.id);
                        const maxReached = freeAddonIds.length >= 3 && !selected;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={maxReached}
                            onClick={() => {
                              if (selected) {
                                setFreeAddonIds((prev) => prev.filter((id) => id !== option.id));
                              } else if (freeAddonIds.length < 3) {
                                setFreeAddonIds((prev) => [...prev, option.id]);
                              }
                            }}
                            className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${selected ? "border-green-500 bg-green-50 dark:bg-green-900/20" : maxReached ? "border-border bg-background opacity-40 cursor-not-allowed" : "border-border bg-background hover:bg-secondary/40"}`}
                          >
                            <span className={`font-medium ${selected ? "text-green-700 dark:text-green-400" : ""}`}>{option.name}</span>
                            <span className={`font-bold ml-2 shrink-0 ${selected ? "text-green-600" : "text-muted-foreground line-through"}`}>
                              {selected ? "FREE" : `$${option.price}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* mrexcellence half-off add-on selector */}
              {mrexcellenceApplied && (
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 pb-3">
                    <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm">
                      <Tag className="w-4 h-4" /> Pick 1 Add-On at 50% Off
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-3">Choose any add-on to receive at half price with your MREXCELLENCE code.</p>
                    <div className="space-y-2">
                      {freeAddonOptions.map((option) => {
                        const selected = halfOffAddonId === option.id;
                        const halfPrice = (option.price / 2).toFixed(2);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setHalfOffAddonId(selected ? null : option.id)}
                            className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${selected ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" : "border-border bg-background hover:bg-secondary/40"}`}
                          >
                            <span className={`font-medium ${selected ? "text-amber-700 dark:text-amber-400" : ""}`}>{option.name}</span>
                            <span className={`font-bold ml-2 shrink-0 flex items-center gap-1 ${selected ? "text-amber-600" : "text-muted-foreground"}`}>
                              {selected && <span className="line-through text-muted-foreground text-xs font-normal">${option.price}</span>}
                              {selected ? `$${halfPrice}` : `$${option.price}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Promo code */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Promo / Referral Code</span>
                  </div>
                  {codeApplied ? (
                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="font-bold text-green-700 dark:text-green-400 uppercase tracking-wider text-sm">{appliedCode}</span>
                        <span className="text-green-600 text-xs">
                          {mrexcellenceApplied && "— Starter $99.99 + Admin Panel + 1 add-on 50% off!"}
                          {alApplied && "— All packages $600 + up to 3 free add-ons!"}
                        </span>
                      </div>
                      <button onClick={handleRemoveCode} className="text-muted-foreground hover:text-foreground ml-2 shrink-0"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input data-testid="input-referral-code" placeholder="Enter code" value={referralInput}
                        onChange={(e) => { setReferralInput(e.target.value); setCodeStatus("idle"); }}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCode()}
                        className={`text-sm ${codeStatus === "invalid" ? "border-red-400 focus-visible:ring-red-400" : ""}`} />
                      <Button data-testid="btn-apply-code" variant="outline" size="sm" onClick={handleApplyCode} className="shrink-0">Apply</Button>
                    </div>
                  )}
                  {codeStatus === "invalid" && !codeApplied && (
                    <p className="text-red-500 text-xs mt-2">
                      {referralInput.trim().toLowerCase() === REFERRAL_CODE ? "This code only applies to the Starter package." : "Invalid code. Double-check and try again."}
                    </p>
                  )}
                  {!codeApplied && codeStatus === "idle" && (
                    <p className="text-muted-foreground text-xs mt-2">Have a promo or referral code?</p>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
