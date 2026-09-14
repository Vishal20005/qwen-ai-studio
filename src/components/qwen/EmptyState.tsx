import { ArrowUpRight } from "lucide-react";
import { ConversationEmptyState } from "@/components/ai-elements/conversation";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/mock-chat";
import { BrandMark } from "./BrandMark";

export function EmptyState({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ConversationEmptyState className="mx-auto min-h-full max-w-3xl justify-center px-5 py-12">
      <div className="relative mb-2 grid size-20 place-items-center rounded-3xl border border-primary/20 bg-secondary/60 shadow-glow">
        <BrandMark className="size-14" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">How can I help you?</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Ask questions, explore ideas, write code, or search the web.
        </p>
      </div>
      <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map(({ title, prompt, icon: Icon }) => (
          <Button
            key={title}
            variant="outline"
            onClick={() => onSelect(prompt)}
            className="group h-auto min-h-20 justify-start rounded-xl border-border/70 bg-card/40 px-4 py-4 text-left shadow-none transition-all hover:border-primary/40 hover:bg-accent/60 hover:shadow-glow"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1 whitespace-normal text-sm font-medium">{title}</span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </Button>
        ))}
      </div>
    </ConversationEmptyState>
  );
}