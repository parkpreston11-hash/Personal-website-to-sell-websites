import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Package, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartTrackButtonProps {
  variant?: "nav" | "pill";
  className?: string;
}

export function SmartTrackButton({ variant = "nav", className }: SmartTrackButtonProps) {
  const [myCode, setMyCode] = useState<string | null>(null);

  useEffect(() => {
    setMyCode(localStorage.getItem("webcraft_my_code"));
  }, []);

  const href = myCode ? `/track?code=${myCode}` : "/track";
  const hasOrder = Boolean(myCode);

  if (variant === "pill") {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-sm group transition-colors",
          className
        )}
      >
        <Package className="w-4 h-4 text-primary flex-shrink-0" />
        {hasOrder ? (
          <span className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
            Track My Order
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          </span>
        ) : (
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            Already ordered?{" "}
            <span className="underline underline-offset-2">Track your website</span>{" "}
            →
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium transition-colors",
        hasOrder
          ? "text-foreground hover:text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {hasOrder && (
        <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 animate-pulse" />
      )}
      {hasOrder ? "Track My Order" : "Track Order"}
    </Link>
  );
}
