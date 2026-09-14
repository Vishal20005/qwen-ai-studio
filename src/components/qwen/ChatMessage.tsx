import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { ChatMessageData } from "@/data/mock-chat";
import { BrandMark } from "./BrandMark";
import { SourceCard } from "./SourceCard";

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  if (message.role === "user") {
    return (
      <Message from="user" className="animate-message-in max-w-[88%] sm:max-w-[75%]">
        <MessageContent className="rounded-2xl rounded-br-md border border-chat-user-border bg-chat-user text-chat-user-foreground shadow-sm">
          <p className="leading-6">{message.content}</p>
        </MessageContent>
      </Message>
    );
  }

  return (
    <Message from="assistant" className="animate-message-in max-w-full">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-primary/20 bg-secondary/70 shadow-sm">
          <BrandMark className="size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <MessageContent className="w-full text-[15px] leading-7">
            <MessageResponse>{message.content}</MessageResponse>
          </MessageContent>
          {message.sources && (
            <section className="mt-5" aria-label="Sources">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Sources</span>
                <span className="h-px flex-1 bg-border/70" />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {message.sources.map((source) => <SourceCard key={source.name} source={source} />)}
              </div>
            </section>
          )}
          <MessageActions className="mt-3 opacity-70 transition-opacity hover:opacity-100">
            <MessageAction tooltip={copied ? "Copied" : "Copy"} onClick={copy}>
              {copied ? <Check /> : <Copy />}
            </MessageAction>
            <MessageAction tooltip="Regenerate"><RefreshCw /></MessageAction>
            <MessageAction tooltip="Good response"><ThumbsUp /></MessageAction>
            <MessageAction tooltip="Poor response"><ThumbsDown /></MessageAction>
          </MessageActions>
        </div>
      </div>
    </Message>
  );
}