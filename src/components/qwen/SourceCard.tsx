import { ExternalLink } from "lucide-react";
import type { Source } from "@/data/mock-chat";

export function SourceCard({ source }: { source: Source }) {
  return (
    <a
      href={`https://${source.domain}`}
      target="_blank"
      rel="noreferrer"
      className="group/source flex min-w-0 items-start gap-3 rounded-xl border border-border/70 bg-card/60 p-3 transition-colors hover:border-primary/40 hover:bg-accent/60"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary font-semibold text-xs text-secondary-foreground">
        {source.name.charAt(0)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 text-sm font-medium">
          {source.name}
          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover/source:text-primary" />
        </span>
        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
          {source.description}
        </span>
      </span>
    </a>
  );
}