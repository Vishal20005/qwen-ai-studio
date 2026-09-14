import { Bot, Cpu, MessageSquare, Plus, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ConversationData } from "@/data/mock-chat";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type SidebarProps = {
  conversations: ConversationData[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onSettings: () => void;
  onClose?: () => void;
};

const groups: ConversationData["group"][] = ["Today", "Yesterday", "Previous 7 Days"];

export function SidebarContent({ conversations, activeId, onSelect, onNew, onSettings, onClose }: SidebarProps) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = conversations.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  const select = (id: string) => {
    onSelect(id);
    onClose?.();
  };

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center gap-3 px-4">
        <BrandMark className="size-9" />
        <span className="font-display text-lg font-semibold">Qwen AI</span>
      </div>
      <div className="space-y-2 px-3 pb-3">
        <Button variant="default" onClick={() => { onNew(); onClose?.(); }} className="h-10 w-full justify-start rounded-lg bg-brand-gradient text-primary-foreground shadow-glow hover:opacity-90">
          <Plus /> New Chat
        </Button>
        {searching ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" className="h-10 rounded-lg bg-sidebar-accent/60 pl-9" />
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setSearching(true)} className="h-10 w-full justify-start text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Search /> Search conversations
          </Button>
        )}
      </div>
      <ScrollArea className="min-h-0 flex-1 px-3">
        <nav className="space-y-5 pb-4" aria-label="Conversation history">
          {groups.map((group) => {
            const items = filtered.filter((conversation) => conversation.group === group);
            if (!items.length) return null;
            return (
              <section key={group}>
                <p className="mb-1.5 px-2 text-[11px] font-medium uppercase text-sidebar-foreground/40">{group}</p>
                <div className="space-y-0.5">
                  {items.map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant="ghost"
                      onClick={() => select(conversation.id)}
                      className={cn(
                        "h-9 w-full justify-start overflow-hidden rounded-lg px-2.5 font-normal text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        activeId === conversation.id && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                      )}
                    >
                      <MessageSquare className="shrink-0" />
                      <span className="truncate">{conversation.title}</span>
                    </Button>
                  ))}
                </div>
              </section>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <Button variant="ghost" onClick={onSettings} className="w-full justify-start text-sidebar-foreground/75 hover:bg-sidebar-accent">
          <Settings /> Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/75 hover:bg-sidebar-accent">
          <Bot /> Model <span className="ml-auto text-xs text-sidebar-foreground/45">Qwen3 4B</span>
        </Button>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-xs text-sidebar-foreground/65">
          <Cpu className="size-3.5 text-status" /> Local Mode
          <span className="ml-auto size-1.5 rounded-full bg-status shadow-status" />
        </div>
      </div>
    </aside>
  );
}

export function DesktopSidebar(props: SidebarProps) {
  return <div className="hidden h-dvh w-64 shrink-0 border-r border-sidebar-border lg:block"><SidebarContent {...props} /></div>;
}