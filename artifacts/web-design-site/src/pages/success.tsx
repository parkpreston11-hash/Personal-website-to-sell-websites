import { SEOHead } from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Copy, Package, Loader2, AlertTriangle, ArrowLeft } from "lucide-react";

function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "WSL-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getEffectiveOrder() {
  try {
    const raw = localStorage.getItem("webcraft_effective_order");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setErrorMsg("No payment session found. If you completed a payment, please contact us with your order details.");
      setStatus("error");
      return;
    }

    const processedSession = localStorage.getItem("webcraft_processed_session");
    const existingCode = localStorage.getItem("webcraft_my_code");
    if (processedSession === sessionId && existingCode) {
      const order = getEffectiveOrder();
      setCustomerName(order?.name ?? "");
      setTrackingCode(existingCode);
      setStatus("success");
      return;
    }

    fetch(`/.netlify/functions/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Could not verify payment.");
        if (!data.paid) throw new Error("Payment was not completed. Please return to checkout and try again.");
        return data;
      })
      .then(() => {
        const order = getEffectiveOrder();
        if (!order) {
          throw new Error(`Order details not found. Please contact us with your Stripe session ID: ${sessionId}`);
        }

        const code = generateTrackingCode();
        const submission = {
          id: Date.now().toString(),
          submittedAt: new Date().toISOString(),
          trackingCode: code,
          status: "purchased",
          estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          paymentStatus: "confirmed",
          stripeSessionId: sessionId,
          name: order.name,
          email: order.email,
          phone: order.phone,
          businessName: order.businessName,
          packageId: order.packageId,
          addOns: order.addOns ?? [],
          details: order.details ?? "",
          total: order.total,
          monthly: order.monthly,
        };

        const existing = localStorage.getItem("webcraft_submissions");
        const all = existing ? JSON.parse(existing) : [];
        all.push(submission);
        localStorage.setItem("webcraft_submissions", JSON.stringify(all));
        localStorage.setItem("webcraft_my_code", code);
        localStorage.setItem("webcraft_processed_session", sessionId);

        setCustomerName(order.name);
        setTrackingCode(code);
        setStatus("success");
      })
      .catch((err: any) => {
        setErrorMsg(err.message || "Something went wrong verifying your payment.");
        setStatus("error");
      });
  }, []);

  function handleCopyCode() {
    if (!trackingCode) return;
    navigator.clipboard.writeText(trackingCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4">
        <SEOHead title="Confirming Payment…" description="Verifying your payment." noindex />
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-lg font-semibold">Confirming your payment…</p>
          <p className="text-muted-foreground text-sm">Please don't close this page.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4 py-16">
        <SEOHead title="Payment Issue — WebStudioLaunch" description="There was an issue confirming your payment." noindex />
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-red-600 dark:text-red-400">Payment Issue</h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{errorMsg}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/checkout">
              <Button className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" /> Return to Checkout
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">Go to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4 py-16">
      <SEOHead
        title="Order Confirmed — WebStudioLaunch"
        description="Your website order has been confirmed. Track your project with your tracking code."
        noindex
      />
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-black text-green-600 dark:text-green-400">Payment Confirmed!</h1>
          {customerName && (
            <p className="text-muted-foreground mt-2">
              Thank you, <span className="font-semibold text-foreground">{customerName}</span>. Your project is now in our queue.
            </p>
          )}
        </div>

        <Card className="border-primary/30 shadow-xl text-left">
          <CardContent className="pt-6 pb-6">
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
              Your Project Tracking Code
            </div>
            <div className="font-mono font-black text-4xl tracking-widest text-primary mb-2">
              {trackingCode}
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Save this code. Enter it on the <strong>Track Order</strong> page at any time to check your project's progress.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-1.5">
                {codeCopied
                  ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                  : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
              </Button>
              <Link href={`/track?code=${trackingCode}`}>
                <Button size="sm" className="gap-1.5">
                  <Package className="w-3.5 h-3.5" /> Track My Order
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>We'll be in touch within 24 hours to get your website started.</p>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
