import { Globe2, Mic, Paperclip } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";

type MessageComposerProps = {
  webSearch: boolean;
  onWebSearchChange: (enabled: boolean) => void;
  onSend: (text: string) => void;
  pending: boolean;
};

export function MessageComposer({ webSearch, onWebSearchChange, onSend, pending }: MessageComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!pending) textareaRef.current?.focus();
  }, [pending]);

  const submit = (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (text && !pending) onSend(text);
  };

  const keepShiftEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) return;
  };

  return (
    <div className="relative z-10 shrink-0 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="mx-auto max-w-3xl">
        {webSearch && (
          <div className="mb-2 inline-flex animate-message-in items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary shadow-glow">
            <Globe2 className="size-3.5" /> Web search enabled
          </div>
        )}
        <PromptInput
          onSubmit={submit}
          className="rounded-2xl border-border/80 bg-composer/95 shadow-composer backdrop-blur-xl transition-shadow focus-within:border-primary/35 focus-within:shadow-glow"
        >
          <PromptInputTextarea
            ref={textareaRef}
            autoFocus
            onKeyDown={keepShiftEnter}
            placeholder="Ask Qwen anything..."
            className="min-h-20 px-4 pt-4 text-[15px] leading-6 placeholder:text-muted-foreground/70"
          />
          <PromptInputFooter className="px-2.5 pb-2.5">
            <PromptInputTools>
              <PromptInputButton tooltip="Attach a file" aria-label="Attach a file">
                <Paperclip />
              </PromptInputButton>
              <PromptInputButton
                tooltip="Web Search"
                aria-label="Toggle Web Search"
                onClick={() => onWebSearchChange(!webSearch)}
                className={cn(webSearch && "bg-primary/15 text-primary hover:bg-primary/20")}
              >
                <Globe2 />
                <span className="hidden sm:inline">Web Search</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputTools>
              <PromptInputButton tooltip="Voice input" aria-label="Voice input"><Mic /></PromptInputButton>
              <PromptInputSubmit
                status={pending ? "submitted" : "ready"}
                disabled={pending}
                className="size-9 rounded-xl bg-brand-gradient text-primary-foreground shadow-glow hover:opacity-90"
              />
            </PromptInputTools>
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}