import {
  BookOpenText,
  BriefcaseBusiness,
  Code2,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export type Source = {
  name: string;
  description: string;
  domain: string;
};

export type ChatMessageData = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export type ConversationData = {
  id: string;
  title: string;
  group: "Today" | "Yesterday" | "Previous 7 Days";
  messages: ChatMessageData[];
};

export const sources: Source[] = [
  {
    name: "Government of India",
    description: "The Constitution of India — Fundamental Rights.",
    domain: "india.gov.in",
  },
  {
    name: "Supreme Court of India",
    description: "Judgments interpreting life and personal liberty.",
    domain: "sci.gov.in",
  },
  {
    name: "Wikipedia",
    description: "An overview of Article 21 and landmark cases.",
    domain: "wikipedia.org",
  },
];

export const conversations: ConversationData[] = [
  {
    id: "indian-polity",
    title: "Indian Polity Questions",
    group: "Today",
    messages: [
      {
        id: "polity-user",
        role: "user",
        content: "What is Article 21 of the Indian Constitution?",
      },
      {
        id: "polity-ai",
        role: "assistant",
        content:
          "## Article 21: Right to Life and Personal Liberty\n\nArticle 21 protects the **right to life and personal liberty**. It states:\n\n> No person shall be deprived of his life or personal liberty except according to procedure established by law.\n\nThe Supreme Court has interpreted this broadly. It protects not merely physical survival, but the right to live with dignity, privacy, clean air, legal aid, and a fair procedure. It applies to **every person**, not only Indian citizens.",
        sources,
      },
    ],
  },
  {
    id: "ai-news",
    title: "Latest AI News",
    group: "Today",
    messages: [
      { id: "news-user", role: "user", content: "What are the biggest themes in AI this week?" },
      {
        id: "news-ai",
        role: "assistant",
        content:
          "The leading themes are **smaller reasoning models**, more capable on-device assistants, and multimodal tools moving into everyday productivity software.\n\nI’ve kept this as a mock briefing because live web search is not connected yet.",
      },
    ],
  },
  {
    id: "python-help",
    title: "Python Help",
    group: "Yesterday",
    messages: [
      { id: "python-user", role: "user", content: "Show me a clean Python function to group words by length." },
      {
        id: "python-ai",
        role: "assistant",
        content:
          "Here’s a concise approach using `defaultdict`:\n\n```python\nfrom collections import defaultdict\n\ndef group_by_length(words: list[str]) -> dict[int, list[str]]:\n    grouped = defaultdict(list)\n    for word in words:\n        grouped[len(word)].append(word)\n    return dict(grouped)\n```\n\nIt runs in linear time relative to the number of words.",
      },
    ],
  },
  {
    id: "business-research",
    title: "Business Research",
    group: "Previous 7 Days",
    messages: [
      { id: "business-user", role: "user", content: "Help me evaluate a subscription meal-planning app." },
      {
        id: "business-ai",
        role: "assistant",
        content:
          "Start with a narrow customer segment, validate how often meal planning causes friction, and test willingness to pay before building. A useful first experiment is a concierge version delivered weekly to 10–20 customers.",
      },
    ],
  },
];

export const suggestions: Array<{
  title: string;
  prompt: string;
  icon: LucideIcon;
}> = [
  { title: "Explain Indian Constitution", prompt: "Explain the key ideas in the Indian Constitution", icon: BookOpenText },
  { title: "Latest AI news", prompt: "Give me a concise summary of the latest AI news", icon: Newspaper },
  { title: "Help me write Python", prompt: "Help me write a useful Python function", icon: Code2 },
  { title: "Research a business idea", prompt: "Help me research and validate a business idea", icon: BriefcaseBusiness },
];

export const mockReply =
  "That’s a thoughtful question. In this interface preview, I can demonstrate how a Qwen response will look and feel. Connect your FastAPI endpoint later to replace this mock answer with a live local-model response.";