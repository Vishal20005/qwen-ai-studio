import { createFileRoute } from "@tanstack/react-router";
import { QwenApp } from "@/components/qwen/QwenApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qwen AI — Local AI Assistant" },
      { name: "description", content: "A premium local-first AI chat experience powered by Qwen." },
      { property: "og:title", content: "Qwen AI — Local AI Assistant" },
      { property: "og:description", content: "A premium local-first AI chat experience powered by Qwen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <QwenApp />;
}
