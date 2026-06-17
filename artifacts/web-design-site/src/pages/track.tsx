import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, Circle, Clock, Package, Mail, FlaskConical } from "lucide-react";

const STATUSES = [
  {
    id: "purchased",
    label: "Order Received",
    desc: "We've received your order and are reviewing the details.",
    icon: Package,
  },
  {
    id: "planning",
    label: "Planning",
    desc: "Our team is mapping out your website structure and design direction.",
    icon: Clock,
  },
  {
    id: "building",
    label: "Building",
    desc: "Your website is actively being developed to your specifications.",
    icon: Clock,
  },
  {
    id: "final_touches",
    label: "Final Touches",
    desc: "Polishing your site — reviewing content, mobile view, and quality.",
    icon: Clock,
  },
  {
    id: "sent",
    label: "Delivered to Your Email",
    desc: "Your completed website has been sent to your email. Check your inbox!",
    icon: Mail,
  },
] as const;

type StatusId = (typeof STATUSES)[number]["id"];

const STATUS_ORDER: StatusId[] = ["purchased", "planning", "building", "final_touches", "sent"];

const DEMO_CODE = "WSL-DEMO01";

const DEMO_SUBMISSION = {
  trackingCode: DEMO_CODE,
  name: "Alex Johnson",
  email: "alex@example.com",
  businessName: "Johnson Consulting",
  packageId: "business",
  total: 999,
  submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  status: "building" as StatusId,
  completedAt: undefined as string | undefined,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getStepState(stepId: StatusId, currentStatus: StatusId): "done" | "active" | "upcoming" {
  const stepIdx = STATUS_ORDER.indexOf(stepId);
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  if (stepIdx < currentIdx) return "done";
  if (stepIdx === currentIdx) return "active";
  return "upcoming";
}

import { SEOHead } from "@/components/SEOHead";

export default function TrackPage() {
  const [codeInput, setCodeInput] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  function seedDemoIfNeeded() {
    const raw = localStorage.getItem("webcraft_submissions");
    const all: any[] = raw ? JSON.parse(raw) : [];
    const exists = all.some((s) => s.trackingCode === DEMO_CODE);
    if (!exists) {
      const entry = {
        id: "demo-seed-001",
        submittedAt: DEMO_SUBMISSION.submittedAt,
        trackingCode: DEMO_CODE,
        status: DEMO_SUBMISSION.status,
        estimatedCompletion: DEMO_SUBMISSION.estimatedCompletion,
        paymentStatus: "confirmed",
        name: DEMO_SUBMISSION.name,
        email: DEMO_SUBMISSION.email,
        phone: "555-000-0001",
        businessName: DEMO_SUBMISSION.businessName,
        packageId: DEMO_SUBMISSION.packageId,
        addOns: ["ai_chatbot", "booking"],
        details: "Please build a clean, modern business website with a contact form and services section.",
        total: DEMO_SUBMISSION.total,
        monthly: 0,
      };
      all.push(entry);
      localStorage.setItem("webcraft_submissions", JSON.stringify(all));
    }
  }

  function handleTrack(overrideCode?: string) {
    const code = (overrideCode ?? codeInput).trim().toUpperCase();
    if (!code) return;

    const raw = localStorage.getItem("webcraft_submissions");
    const all = raw ? JSON.parse(raw) : [];
    const found = all.find((s: any) => s.trackingCode === code);
    setResult(found ?? null);
    setSearched(true);
  }

  function handleLoadDemo() {
    seedDemoIfNeeded();
    setCodeInput(DEMO_CODE);
    // Read from localStorage after seeding
    const raw = localStorage.getItem("webcraft_submissions");
    const all = raw ? JSON.parse(raw) : [];
    const found = all.find((s: any) => s.trackingCode === DEMO_CODE);
    setResult(found ?? null);
    setSearched(true);
  }

  const isComplete = result?.status === "sent";
  const currentStatus: StatusId = result?.status ?? "purchased";

  return (
    <div className="min-h-screen bg-secondary/20">
      <SEOHead
        title="Track Your Website Project"
        description="Enter your tracking code to see the real-time status of your website project — from order received to final delivery."
        noindex
      />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-5">
            <Package className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Website</h1>
          <p className="text-primary-foreground/80 text-base">
            Enter your unique tracking code to see the latest status of your project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Search box */}
        <div className="bg-background rounded-2xl shadow-lg border border-border p-6 mb-8">
          <label className="block text-sm font-semibold mb-2 text-foreground">
            Enter Your Tracking Code
          </label>
          <div className="flex gap-3">
            <Input
              placeholder="e.g. WSL-A3F8K2"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value.toUpperCase());
                setSearched(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="font-mono text-base tracking-widest uppercase"
            />
            <Button onClick={() => handleTrack()} className="shrink-0 gap-2 px-6">
              <Search className="w-4 h-4" />
              Track
            </Button>
          </div>

          {searched && !result && (
            <p className="text-red-500 text-sm mt-3">
              No project found for that code. Double-check and try again.
            </p>
          )}

          {/* Demo hint */}
          <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Your tracking code was sent when you submitted your order. It looks like{" "}
              <span className="font-mono font-semibold">WSL-XXXXXX</span>.
            </p>
            <button
              onClick={handleLoadDemo}
              className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline shrink-0"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Try demo code
            </button>
          </div>
        </div>

        {/* Demo badge */}
        {result?.trackingCode === DEMO_CODE && (
          <div className="mb-4 flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 text-sm text-amber-700 dark:text-amber-400">
            <FlaskConical className="w-4 h-4 shrink-0" />
            <span>
              This is <strong>sample data</strong> for demonstration. Real orders are saved when a customer completes the quote form.
            </span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {/* Summary bar */}
            <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                    Tracking Code
                  </div>
                  <div className="font-mono font-bold text-2xl tracking-widest text-primary">
                    {result.trackingCode}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                    Status
                  </div>
                  {isComplete ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" /> In Progress
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-0.5">Package</div>
                  <div className="font-medium capitalize">{result.packageId} Website</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-0.5">Ordered</div>
                  <div className="font-medium">{formatDate(result.submittedAt)}</div>
                </div>
                {result.estimatedCompletion && !isComplete && (
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-0.5">Est. Completion</div>
                    <div className="font-medium">{formatDate(result.estimatedCompletion)}</div>
                  </div>
                )}
                {isComplete && result.completedAt && (
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-0.5">Completed</div>
                    <div className="font-medium text-green-600 dark:text-green-400">{formatDate(result.completedAt)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* USPS-style timeline */}
            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-base mb-6 text-foreground">Project Progress</h2>

              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-border" />

                <div className="space-y-0">
                  {STATUSES.map((step, idx) => {
                    const state = getStepState(step.id as StatusId, currentStatus);
                    const isLast = idx === STATUSES.length - 1;

                    return (
                      <div key={step.id} className="relative flex gap-5 pb-8 last:pb-0">
                        {/* Dot */}
                        <div className="relative z-10 shrink-0">
                          {state === "done" ? (
                            <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          ) : state === "active" ? (
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md ring-4 ring-primary/20">
                              <div className="w-3 h-3 rounded-full bg-white" />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full border-2 border-border bg-background flex items-center justify-center">
                              <Circle className="w-4 h-4 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`pt-1.5 ${!isLast ? "pb-2" : ""}`}>
                          <div className={`font-semibold text-sm ${
                            state === "active"
                              ? "text-primary"
                              : state === "done"
                              ? "text-green-600 dark:text-green-400"
                              : "text-muted-foreground"
                          }`}>
                            {step.label}
                            {state === "active" && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className={`text-sm mt-0.5 ${
                            state === "upcoming" ? "text-muted-foreground/50" : "text-muted-foreground"
                          }`}>
                            {state !== "upcoming" ? step.desc : "Waiting..."}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isComplete && (
                <div className="mt-6 pt-5 border-t border-border bg-green-50 dark:bg-green-900/10 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-400">Project completed and sent to your email</div>
                    <div className="text-sm text-green-600/80 dark:text-green-400/70 mt-0.5">
                      Check your inbox at <span className="font-medium">{result.email}</span>. Don't see it? Check your spam folder.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
