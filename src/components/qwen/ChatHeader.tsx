import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "./ModelSelector";

export function ChatHeader({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 px-3 backdrop-blur-xl sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <Button variant="ghost" size="icon" onClick={onMenu} className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{title}</p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground sm:hidden">
            <span className="size-1.5 rounded-full bg-status shadow-status" /> Running locally
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        <ModelSelector />
        <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <span className="size-1.5 rounded-full bg-status shadow-status" />
          <span>Running locally</span>
        </div>
      </div>
    </header>
  );
}