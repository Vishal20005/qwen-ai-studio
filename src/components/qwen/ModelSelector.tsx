import { Check, ChevronDown, Cloud, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const models = [
  { name: "Qwen3 4B", mode: "Local", available: true },
  { name: "Qwen3 8B", mode: "Cloud", available: false },
  { name: "Qwen3 30B", mode: "Cloud", available: false },
];

export function ModelSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 rounded-lg px-2.5 text-foreground">
          <Cpu className="size-3.5 text-primary" />
          <span>Qwen3 4B</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl p-1.5">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.name}
            disabled={!model.available}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5"
          >
            {model.available ? <Cpu className="text-primary" /> : <Cloud />}
            <div className="min-w-0 flex-1">
              <p className="font-medium">{model.name}</p>
              <p className="text-xs text-muted-foreground">
                {model.available ? model.mode : `${model.mode} · Not configured`}
              </p>
            </div>
            {model.available && <Check className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}