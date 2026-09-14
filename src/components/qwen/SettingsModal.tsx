import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Theme = "system" | "light" | "dark";

function SettingRow({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-5 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [compact, setCompact] = useState(false);
  const [enterSend, setEnterSend] = useState(true);
  const [webSearch, setWebSearch] = useState(false);
  const [showSources, setShowSources] = useState(true);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", next === "dark" || (next === "system" && prefersDark));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto rounded-2xl border-border/80 bg-popover/95 p-0 backdrop-blur-xl">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="font-display text-xl">Settings</DialogTitle>
          <DialogDescription>Customize your Qwen AI experience.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general" className="px-5 pb-6">
          <TabsList className="mt-5 grid h-auto w-full grid-cols-4 rounded-xl">
            {['General', 'AI', 'Search', 'Privacy'].map((label) => <TabsTrigger key={label} value={label.toLowerCase()} className="px-2">{label}</TabsTrigger>)}
          </TabsList>
          <TabsContent value="general" className="divide-y divide-border/70">
            <SettingRow title="Theme" description="Choose how Qwen AI looks.">
              <div className="flex rounded-lg bg-muted p-1">
                {(["system", "light", "dark"] as Theme[]).map((item) => (
                  <button key={item} type="button" onClick={() => applyTheme(item)} className={theme === item ? "rounded-md bg-background px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm" : "rounded-md px-2.5 py-1.5 text-xs capitalize text-muted-foreground"}>{item}</button>
                ))}
              </div>
            </SettingRow>
            <SettingRow title="Compact mode" description="Reduce spacing in conversations."><Switch checked={compact} onCheckedChange={setCompact} /></SettingRow>
            <SettingRow title="Enter to send" description="Use Shift + Enter for a new line."><Switch checked={enterSend} onCheckedChange={setEnterSend} /></SettingRow>
          </TabsContent>
          <TabsContent value="ai" className="divide-y divide-border/70">
            <SettingRow title="Model" description="The active local model."><span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium">Qwen3 4B</span></SettingRow>
            <div className="space-y-3 py-4"><div className="flex justify-between text-sm"><span>Temperature</span><span className="text-muted-foreground">0.7</span></div><Slider defaultValue={[70]} max={100} step={1} /></div>
            <SettingRow title="Max response length" description="Maximum generated tokens."><span className="text-sm text-muted-foreground">2,048 tokens</span></SettingRow>
          </TabsContent>
          <TabsContent value="search" className="divide-y divide-border/70">
            <SettingRow title="Web Search" description="Allow Qwen to look for current information."><Switch checked={webSearch} onCheckedChange={setWebSearch} /></SettingRow>
            <SettingRow title="Show sources" description="Include source cards with responses."><Switch checked={showSources} onCheckedChange={setShowSources} /></SettingRow>
          </TabsContent>
          <TabsContent value="privacy">
            <div className="mt-3 rounded-xl border border-status/20 bg-status/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold"><span className="size-2 rounded-full bg-status shadow-status" /> Local Mode</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Your conversations are processed locally when using the local model.</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}