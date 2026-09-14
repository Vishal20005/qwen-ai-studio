import qwenMark from "@/assets/qwen-mark.png";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={qwenMark}
      alt="Qwen AI"
      width={1024}
      height={1024}
      className={cn("size-9 object-contain", className)}
    />
  );
}