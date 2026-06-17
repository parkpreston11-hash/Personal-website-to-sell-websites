import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  Search,
  CheckCircle2,
  Clock,
  Copy,
  Check,
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

const STATUSES = [
  { id: "purchased", label: "Purchased", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { id: "planning", label: "Planning", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "building", label: "Building", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { id: "final_touches", label: "Final Touches", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "sent", label: "Sent to Email", color: "bg-green-100 text-green-700 border-green-200" },
] as const;

type StatusId = (typeof STATUSES)[number]["id"];

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
  trackingCode?: string;
  status?: StatusId;
  estimatedCompletion?: string;
  completedAt?: string;
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

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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

function StatusBadge({ status }: { status?: StatusId }) {
  const s = STATUSES.find((x) => x.id === status) ?? STATUSES[0];
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
      {s.label}
    </span>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-muted-foreground hover:text-primary transition-colors"
      title="Copy tracking code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function SubmissionCard({
  sub,
  index,
  onStatusChange,
}: {
  sub: Submission;
  index: number;
  onStatusChange: (id: string, status: StatusId) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isComplete = sub.status === "sent";

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-sm">
      {/* Header row */}
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base truncate">{sub.name}</div>
          <div className="text-muted-foreground text-xs truncate">{sub.businessName} · {sub.email}</div>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <StatusBadge status={sub.status} />
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
        <div className="border-t border-border px-5 py-5 bg-secondary/10 space-y-5">

          {/* Tracking code — top and prominent */}
          <div className="bg-background border border-primary/20 rounded-xl px-5 py-4">
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">
              Tracking Code
            </div>
            <div className="flex items-center">
              <span className="font-mono font-black text-2xl tracking-widest text-primary">
                {sub.trackingCode ?? "—"}
              </span>
              {sub.trackingCode && <CopyButton value={sub.trackingCode} />}
            </div>
            {sub.estimatedCompletion && !isComplete && (
              <div className="text-xs text-muted-foreground mt-1.5">
                Est. completion: <span className="font-semibold">{formatDateShort(sub.estimatedCompletion)}</span>
              </div>
            )}
            {isComplete && sub.completedAt && (
              <div className="text-xs text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completed {formatDateShort(sub.completedAt)}
              </div>
            )}
          </div>

          {/* Status update */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
              Update Project Status
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStatusChange(sub.id, s.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    sub.status === s.id
                      ? s.color + " ring-2 ring-offset-1 ring-current"
                      : "bg-background border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {s.label}
                  {sub.status === s.id && " ✓"}
                </button>
              ))}
            </div>
            {isComplete && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Marked complete — tracking code still active for reference.
              </p>
            )}
          </div>

          <Separator />

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
              <div className="font-bold text-primary text-lg">
                ${sub.total.toFixed(2)}
                {sub.monthly > 0 && <span className="text-muted-foreground text-sm font-normal"> + ${sub.monthly}/mo</span>}
              </div>
            </div>
          </div>

          {sub.addOns?.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Add-Ons</div>
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

          <div className="text-xs text-muted-foreground">
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
  const [search, setSearch] = useState("");

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

  function handleStatusChange(id: string, status: StatusId) {
    const updated = submissions.map((s) => {
      if (s.id !== id) return s;
      return {
        ...s,
        status,
        completedAt: status === "sent" ? new Date().toISOString() : s.completedAt,
      };
    });
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.trackingCode ?? "").toLowerCase().includes(q) ||
        s.businessName.toLowerCase().includes(q)
    );
  }, [submissions, search]);

  const totalRevenue = submissions.reduce((s, sub) => s + (sub.total ?? 0), 0);
  const packageCounts = submissions.reduce<Record<string, number>>((acc, sub) => {
    acc[sub.packageId] = (acc[sub.packageId] ?? 0) + 1;
    return acc;
  }, {});
  const inProgressCount = submissions.filter((s) => s.status && s.status !== "sent").length;

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
            <div className="text-muted-foreground text-xs mt-0.5">Project Tracker</div>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardContent className="pt-5 pb-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-black">{submissions.length}</div>
                <div className="text-muted-foreground text-xs">Total Orders</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-green-600 dark:text-green-400">${totalRevenue.toLocaleString()}</div>
                <div className="text-muted-foreground text-xs">Pipeline Value</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{inProgressCount}</div>
                <div className="text-muted-foreground text-xs">In Progress</div>
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

        {/* Search + actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or tracking code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-muted-foreground text-sm">
              {filtered.length} {filtered.length !== 1 ? "results" : "result"}
            </span>
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
        </div>

        {/* Submissions list */}
        {submissions.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-2xl">
            <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <div className="text-muted-foreground font-medium">No submissions yet.</div>
            <div className="text-muted-foreground text-sm mt-1">They'll show up here once someone fills out the quote form.</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
            <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <div className="text-muted-foreground font-medium">No results for "{search}"</div>
          </div>
        ) : (
          <div className="space-y-3">
            {[...filtered].reverse().map((sub, i) => (
              <SubmissionCard
                key={sub.id}
                sub={sub}
                index={filtered.length - 1 - i}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
