"use client";

import { useState, useMemo } from "react";
import { messages } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  MailOpen,
  Reply,
  User,
  GraduationCap,
  Building2,
} from "lucide-react";

// Group messages into threads
interface Thread {
  id: string;
  subject: string;
  participants: string[];
  messages: typeof messages;
  lastDate: string;
  hasUnread: boolean;
}

function buildThreads(): Thread[] {
  const threadMap = new Map<string, typeof messages>();
  for (const msg of messages) {
    if (!threadMap.has(msg.threadId)) {
      threadMap.set(msg.threadId, []);
    }
    threadMap.get(msg.threadId)!.push(msg);
  }

  const threads: Thread[] = [];
  for (const [threadId, msgs] of Array.from(threadMap.entries())) {
    const sorted = [...msgs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const participants = Array.from(new Set(sorted.map((m) => m.from)));
    const baseSubject = sorted[0].subject.replace(/^Re:\s*/i, "");
    threads.push({
      id: threadId,
      subject: baseSubject,
      participants,
      messages: sorted,
      lastDate: sorted[sorted.length - 1].date,
      hasUnread: sorted.some((m) => !m.read && m.to === "Emma Richardson"),
    });
  }

  return threads.sort(
    (a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()
  );
}

function roleIcon(role: string) {
  switch (role) {
    case "faculty":
      return <GraduationCap className="h-3.5 w-3.5" />;
    case "employer":
      return <Building2 className="h-3.5 w-3.5" />;
    default:
      return <User className="h-3.5 w-3.5" />;
  }
}

function avatarInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function avatarColor(role: string) {
  switch (role) {
    case "faculty":
      return "bg-purple-600 text-white";
    case "employer":
      return "bg-green-600 text-white";
    default:
      return "bg-blue-600 text-white";
  }
}

export default function StudentMessagesPage() {
  const threads = useMemo(() => buildThreads(), []);
  const [selectedThreadId, setSelectedThreadId] = useState(threads[0]?.id ?? "");

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Your conversations with faculty and employers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Left Panel - Thread List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Inbox
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full text-left p-4 border-b transition-colors hover:bg-muted/50 ${
                  selectedThreadId === thread.id
                    ? "bg-muted"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    {thread.hasUnread ? (
                      <Mail className="h-4 w-4 text-blue-600" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm truncate ${
                          thread.hasUnread ? "font-bold" : "font-medium"
                        }`}
                      >
                        {thread.subject}
                      </p>
                      {thread.hasUnread && (
                        <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {thread.participants
                        .filter((p) => p !== "Emma Richardson")
                        .join(", ") || "You"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(thread.lastDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" \u00b7 "}
                      {thread.messages.length} message
                      {thread.messages.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Panel - Thread Detail */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {selectedThread ? (
            <>
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">
                  {selectedThread.subject}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedThread.participants.join(", ")}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {selectedThread.messages.map((msg) => {
                  const isMe = msg.from === "Emma Richardson";
                  return (
                    <div key={msg.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={`text-xs ${avatarColor(msg.fromRole)}`}
                          >
                            {avatarInitials(msg.from)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {isMe ? "You" : msg.from}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              {roleIcon(msg.fromRole)}
                              {msg.fromRole.charAt(0).toUpperCase() +
                                msg.fromRole.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(msg.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        {!msg.read && msg.to === "Emma Richardson" && (
                          <Badge variant="info" className="shrink-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line ${
                          isMe
                            ? "bg-blue-50 border border-blue-100 ml-11"
                            : "bg-muted ml-11"
                        }`}
                      >
                        {msg.body}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="gap-2">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to view
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
