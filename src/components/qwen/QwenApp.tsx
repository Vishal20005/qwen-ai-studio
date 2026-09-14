import { useMemo, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { conversations, mockReply, sources, type ChatMessageData } from "@/data/mock-chat";
import { BrandMark } from "./BrandMark";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { EmptyState } from "./EmptyState";
import { MessageComposer } from "./MessageComposer";
import { DesktopSidebar, SidebarContent } from "./Sidebar";
import { SettingsModal } from "./SettingsModal";

export function QwenApp() {
  const [activeId, setActiveId] = useState<string | null>("indian-polity");
  const [sessionMessages, setSessionMessages] = useState<Record<string, ChatMessageData[]>>({});
  const [webSearch, setWebSearch] = useState(false);
  const [pending, setPending] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId),
    [activeId],
  );
  const messages = activeId
    ? (sessionMessages[activeId] ?? activeConversation?.messages ?? [])
    : [];

  const startNew = () => {
    setActiveId(null);
    setPending(false);
  };

  const send = (text: string) => {
    const id = activeId ?? `session-${Date.now()}`;
    const existing = activeId ? messages : [];
    const userMessage: ChatMessageData = { id: `${id}-user-${Date.now()}`, role: "user", content: text };
    if (!activeId) setActiveId(id);
    setSessionMessages((current) => ({ ...current, [id]: [...existing, userMessage] }));
    setPending(true);

    window.setTimeout(() => {
      const assistantMessage: ChatMessageData = {
        id: `${id}-assistant-${Date.now()}`,
        role: "assistant",
        content: mockReply,
        sources: webSearch ? sources : undefined,
      };
      setSessionMessages((current) => ({
        ...current,
        [id]: [...(current[id] ?? []), assistantMessage],
      }));
      setPending(false);
    }, 950);
  };

  const sidebarProps = {
    conversations,
    activeId,
    onSelect: setActiveId,
    onNew: startNew,
    onSettings: () => setSettingsOpen(true),
  };

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <DesktopSidebar {...sidebarProps} />
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[min(86vw,300px)] border-sidebar-border bg-sidebar p-0 [&>button]:z-10">
          <SheetTitle className="sr-only">Conversation menu</SheetTitle>
          <SheetDescription className="sr-only">Choose a conversation or start a new chat.</SheetDescription>
          <SidebarContent {...sidebarProps} onClose={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-app-glow opacity-80" />
        <ChatHeader
          title={activeConversation?.title ?? (activeId ? "New Conversation" : "New Conversation")}
          onMenu={() => setMobileOpen(true)}
        />
        <Conversation className="z-0 min-h-0">
          {messages.length === 0 ? (
            <EmptyState onSelect={send} />
          ) : (
            <ConversationContent className="mx-auto w-full max-w-3xl gap-7 px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
              {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
              {pending && (
                <div className="flex animate-message-in items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-xl border border-primary/20 bg-secondary/70">
                    <BrandMark className="size-6" />
                  </div>
                  <Shimmer className="text-sm">Thinking...</Shimmer>
                </div>
              )}
            </ConversationContent>
          )}
          <ConversationScrollButton className="bottom-3" />
        </Conversation>
        <MessageComposer
          webSearch={webSearch}
          onWebSearchChange={setWebSearch}
          onSend={send}
          pending={pending}
        />
      </section>
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </main>
  );
}