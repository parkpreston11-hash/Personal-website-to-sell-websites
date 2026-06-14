import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Users,
  DollarSign,
  ClipboardList,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";

const ADMIN_PASSWORD = "FREE";
const STORAGE_KEY = "webcraft_submissions";

const packageNames: Record<string, string> = {
  starter: "Starter — $499",
  business: "Business — $999",
  premium: "Premium — $1,999+",
};

const addOnNames: Record<string, string> = {
  ai_chatbot: "AI Chatbot (+$299)",
  crm: "CRM Connection (+$499)",
  booking: "Booking Calendar (+$199)",
  extra_page: "Extra Page (+$99)",
  branding: "Logo/Branding (+$149)",
  maintenance: "Website Maintenance (+$50/mo)",
  multilang: "Multi-Language Support (+$50)",
  admin_panel: "Admin Panel (+$50)",
};

type Submission = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  packageId: string;
  addOns: string[];
  details: string;
  total: number;
  monthly: number;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function PackageBadge({ packageId }: { packageId: string }) {
  const colors: Record<string, string> = {
    starter: "bg-slate-100 text-slate-700 border-slate-200",
    business: "bg-primary/10 text-primary border-primary/20",
    premium: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors[packageId] ?? ""}`}>
      {packageNames[packageId] ?? packageId}
    </span>
  );
}

function SubmissionCard({ sub, index }: { sub: Submission; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-sm">
      {/* Header row */}
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded((e) => !e)}
        data-testid={`row-submission-${sub.id}`}
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base truncate">{sub.name}</div>
          <div className="text-muted-foreground text-xs truncate">{sub.businessName} · {sub.email}</div>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <PackageBadge packageId={sub.packageId} />
          <span className="font-bold text-primary text-base">${sub.total.toFixed(2)}</span>
        </div>
        <div className="text-muted-foreground text-xs hidden md:block shrink-0 w-36 text-right">
          {formatDate(sub.submittedAt)}
        </div>
        <div className="text-muted-foreground ml-2 shrink-0">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border px-5 py-5 bg-secondary/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-5">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Full Name</div>
              <div className="font-medium">{sub.name}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Business</div>
              <div className="font-medium">{sub.businessName}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Email</div>
              <div className="font-medium">{sub.email}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Phone</div>
              <div className="font-medium">{sub.phone}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Package</div>
              <PackageBadge packageId={sub.packageId} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Total</div>
              <div className="font-bold text-primary text-lg">${sub.total.toFixed(2)}{sub.monthly > 0 && <span className="text-muted-foreground text-sm font-normal"> + ${sub.monthly}/mo</span>}</div>
            </div>
          </div>

          {sub.addOns?.length > 0 && (
            <div className="mb-5">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Add-Ons Selected</div>
              <div className="flex flex-wrap gap-2">
                {sub.addOns.map((id) => (
                  <span key={id} className="text-xs bg-background border border-border rounded-full px-3 py-1 font-medium">
                    {addOnNames[id] ?? id}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">What They Want</div>
            <div className="bg-background border border-border rounded-xl p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {sub.details || <span className="text-muted-foreground italic">No details provided</span>}
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            Submitted: {formatDate(sub.submittedAt)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (authed) {
      const raw = localStorage.getItem(STORAGE_KEY);
      setSubmissions(raw ? JSON.parse(raw) : []);
    }
  }, [authed]);

  function handleLogin() {
    if (pwInput.trim() === ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function handleClearAll() {
    if (window.confirm("Delete all submissions? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      setSubmissions([]);
    }
  }

  const totalRevenue = submissions.reduce((s, sub) => s + (sub.total ?? 0), 0);
  const packageCounts = submissions.reduce<Record<string, number>>((acc, sub) => {
    acc[sub.packageId] = (acc[sub.packageId] ?? 0) + 1;
    return acc;
  }, {});

  if (!authed) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">Enter your password to continue</p>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="relative">
              <Input
                data-testid="input-admin-password"
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={error ? "border-red-400 focus-visible:ring-red-400 pr-10" : "pr-10"}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPw((s) => !s)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs">Incorrect password. Try again.</p>}
            <Button data-testid="btn-admin-login" className="w-full" onClick={handleLogin}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Top bar */}
      <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-base leading-none">WebStudioLaunch Admin</div>
            <div className="text-muted-foreground text-xs mt-0.5">Quote Submissions</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-2"
          onClick={() => setAuthed(false)}
          data-testid="btn-admin-logout"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Card>
            <CardContent className="pt-5 pb-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-black">{submissions.length}</div>
                <div className="text-muted-foreground text-sm">Total Submissions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-green-600 dark:text-green-400">${totalRevenue.toLocaleString()}</div>
                <div className="text-muted-foreground text-sm">Pipeline Value</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">By Package</div>
              <div className="space-y-1">
                {["starter", "business", "premium"].map((pkg) => (
                  <div key={pkg} className="flex justify-between text-sm">
                    <span className="capitalize text-muted-foreground">{pkg}</span>
                    <span className="font-bold">{packageCounts[pkg] ?? 0}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions list */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">
            {submissions.length === 0 ? "No submissions yet" : `${submissions.length} Submission${submissions.length !== 1 ? "s" : ""}`}
          </h2>
          {submissions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
              onClick={handleClearAll}
              data-testid="btn-clear-submissions"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </Button>
          )}
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-2xl">
            <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <div className="text-muted-foreground font-medium">No quote submissions yet.</div>
            <div className="text-muted-foreground text-sm mt-1">They'll show up here once someone fills out the quote form.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {[...submissions].reverse().map((sub, i) => (
              <SubmissionCard key={sub.id} sub={sub} index={submissions.length - 1 - i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
