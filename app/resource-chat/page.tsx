"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { Resource } from "@/lib/resources";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import DiscordCommunityCard from "@/components/DiscordCommunityCard";
import ScrollAnimator from "@/components/ScrollAnimator";

interface Message {
  role: "user" | "assistant";
  content: string;
  resources?: Resource[];
}

const SUGGESTION_CHIPS = [
  "How do I structure my ERLC server?",
  "What tools should I use for server branding?",
  "How do I grow my ERLC community?",
];

export default function ResourceChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(message: string) {
    if (!message.trim() || loading) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/resource-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json() as { response?: string; resources?: Resource[]; error?: string };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? "Something went wrong. Please try again.",
          resources: data.resources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const hasUserMessages = messages.some((m) => m.role === "user");

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 80px)" }}>
      <ScrollAnimator />

      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="page-container max-w-[900px] py-10">
          <div className="animate-on-scroll">
            <h1 className="text-2xl font-semibold text-foreground">AI Assistant</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Ask anything about building, designing, or growing your ERLC server.
              Powered by Unity Vault.
            </p>
          </div>
        </div>
      </div>

      {/* Chat card */}
      <div className="flex-1 flex flex-col page-container max-w-[900px] py-8">
        <div className="flex flex-col flex-1 rounded-xl border border-border bg-card overflow-hidden">

          {/* Messages or empty state */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!hasUserMessages && !loading ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background">
                  <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.8} />
                </div>
                <h2 className="text-base font-medium text-foreground">What can I help you with?</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setInput(chip)}
                      className="rounded-full border border-border/60 bg-background px-4 py-2 text-xs text-foreground transition-colors hover:bg-white/5"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message list */
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div className={msg.role === "user" ? "max-w-lg" : "w-full"}>
                      {msg.role === "assistant" && (
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background">
                            <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">Assistant</span>
                        </div>
                      )}
                      <div
                        className={
                          msg.role === "user"
                            ? "rounded-2xl rounded-tr-sm bg-surface-2 border border-border/60 px-4 py-3 text-sm text-foreground"
                            : "text-sm text-foreground leading-relaxed"
                        }
                      >
                        {msg.content}
                      </div>

                      {/* Resource cards */}
                      {msg.resources && msg.resources.length > 0 && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {msg.resources.map((r) =>
                            r.section === "youtube" ? (
                              <YouTubeResourceCard key={r.id} resource={r} />
                            ) : r.section === "discord" ? (
                              <DiscordCommunityCard key={r.id} resource={r} />
                            ) : (
                              <WebsiteResourceCard key={r.id} resource={r} />
                            )
                          )}
                        </div>
                      )}

                      {msg.resources && msg.resources.length === 0 && msg.role === "assistant" && i > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Try browsing the{" "}
                          <Link href="/resources" className="text-accent hover:underline">
                            full vault
                          </Link>{" "}
                          to explore everything.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background">
                    <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-border bg-background/50 px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about your ERLC server..."
                disabled={loading}
                className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-border focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-50 transition-colors"
                aria-label="Chat input"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-white/5 disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" strokeWidth={1.8} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
