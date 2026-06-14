import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const faqs: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["price", "cost", "how much", "pricing", "package", "plan"],
    answer:
      "We have three packages:\n\n• Starter — $499 (1–3 pages, 3-day delivery)\n• Business — $999 (5–7 pages, 5-day delivery) ← Most popular\n• Premium — $1,999+ (custom design, AI chatbot, CRM, booking system)\n\nYou can also add features like an AI chatbot (+$299) or booking system (+$199). Want me to walk you through the quote builder?",
  },
  {
    patterns: ["addon", "add-on", "add on", "extra", "chatbot", "crm", "booking", "branding", "logo", "maintenance"],
    answer:
      "Our add-ons let you customize any package:\n\n• AI Chatbot — +$299\n• CRM/System Connection — +$499\n• Booking Calendar — +$199\n• Extra Page — +$99\n• Logo/Branding Help — +$149\n• Website Maintenance — +$50/mo (recurring monthly charge)\n• Multi-Language Support — +$50\n\nThey're all selectable on the quote page and the total updates live!",
  },
  {
    patterns: ["how long", "delivery", "turnaround", "timeline", "days", "time"],
    answer:
      "Delivery depends on the package:\n\n• Starter — 3 business days\n• Business — 5 business days\n• Premium — custom timeline based on scope\n\nWe move fast. Most clients are live within a week.",
  },
  {
    patterns: ["what do you", "what do you build", "services", "what can you", "type of website", "kinds of"],
    answer:
      "We build all kinds of business websites:\n\n• Business & corporate sites\n• Real estate agent sites\n• Landing pages\n• Lead generation funnels\n• E-commerce stores\n• Restaurant & hospitality sites\n• Barber & salon sites\n• Sites with AI chatbots, booking systems, and CRM integrations\n\nCheck out our live demos at the bottom of this page to see real examples!",
  },
  {
    patterns: ["demo", "example", "sample", "see", "portfolio", "work", "previous"],
    answer:
      "You can see live demo websites right at the bottom of this page — a restaurant, barber shop, and real estate agent site, all built to show what your business could look like.\n\nEach demo is a full working website you can browse!",
  },
  {
    patterns: ["start", "get started", "begin", "how do i", "next step", "process"],
    answer:
      "Getting started is simple:\n\n1. Click \"Get Your Quote\" at the top of the page\n2. Pick your package and any add-ons\n3. Describe what you need\n4. We'll reach out within 24 hours to confirm and get started\n\nNo payment required upfront — we review your order first.",
  },
  {
    patterns: ["contact", "reach", "talk", "call", "email", "phone"],
    answer:
      "You can reach us at:\n\n• Email: hello@webstudiolaunch.com\n\nOr scroll to the Contact section at the bottom of the page and send us a message directly.",
  },
  {
    patterns: ["refund", "guarantee", "money back", "revision", "change"],
    answer:
      "We stand behind our work. Every package includes a revision round so we can fine-tune things until you're happy. Reach out at hello@webcraftstudio.com and we'll make it right.",
  },
  {
    patterns: ["restaurant", "barber", "real estate", "salon", "food", "agent"],
    answer:
      "We specialize in those industries! Scroll to the bottom of the page to see our live demos — a full restaurant site, barbershop site, and real estate agent site.\n\nEach one shows what your business could look like with a professional web presence.",
  },
  {
    patterns: ["hello", "hi", "hey", "sup", "yo", "howdy"],
    answer:
      "Hey there! Welcome to WebStudioLaunch. I'm here to help you find the right website package or answer any questions.\n\nWhat can I help you with — pricing, services, or something else?",
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of faqs) {
    if (faq.patterns.some((p) => lower.includes(p))) {
      return faq.answer;
    }
  }
  return "Good question! I'm not sure about that specific detail, but I'd love to connect you with our team.\n\nYou can reach us at hello@webstudiolaunch.com — we respond fast. Or try asking about pricing, services, delivery time, or our demo websites!";
}

const SUGGESTIONS = ["What does it cost?", "How fast is delivery?", "Show me the demos", "How do I get started?"];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm the WebStudioLaunch assistant. Ask me anything about our packages, pricing, or what kind of website we can build for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: getBotReply(text) }]);
    }, 900);
  }

  return (
    <>
      {/* Floating button */}
      <button
        data-testid="btn-open-chat"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl border border-border bg-background flex flex-col overflow-hidden"
          style={{ maxHeight: "520px" }}>
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm leading-none mb-0.5">WebStudioLaunch Assistant</div>
              <div className="text-xs text-primary-foreground/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                Online now
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-background border border-border text-foreground rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (show only at start) */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs bg-secondary border border-border rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2 bg-background">
            <input
              data-testid="input-chat"
              className="flex-1 text-sm bg-secondary border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
            />
            <button
              data-testid="btn-send-chat"
              onClick={() => send(input)}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
