# Qwen AI Chat UI

## Overview
Build a polished, responsive Qwen AI chat experience at `/` using realistic local mock data only. The first screen will feel production-ready while remaining simple to connect to a future FastAPI/Qwen service.

## What will be built
- A desktop sidebar and mobile slide-out drawer with Qwen AI branding, new chat, search, grouped conversation history, model/local status, and settings access.
- A compact chat header with the conversation title, model selector, and clearly visible local-running status.
- Two complete mock states: a premium empty state with four prompt suggestions, and a realistic Article 21 conversation with formatted assistant content, code styling, actions, typing state, and mock source cards.
- A fixed, touch-friendly message composer with attachment, web-search mode, voice, send, keyboard hint, and local-only interactions.
- A model dropdown showing Qwen3 4B as active and the two cloud models as unavailable.
- A responsive settings panel with General, AI, Search, and Privacy controls; all controls will be demonstrative only.
- Light, dark, and system appearance options, with the visual system defaulting to the requested deep charcoal experience.

## Design direction
- Refined charcoal surfaces with restrained blue, violet, and cyan accents; gradients appear only on brand, primary actions, and active states.
- Soft borders, subtle glow, sparing glass effects, compact radii, strong contrast, clean typography, and generous spacing.
- Lightweight motion for message entry, drawer/dialog transitions, active controls, and typing feedback, with reduced-motion support.
- A distinct generated Qwen identity mark rather than a generic AI icon.

## Interaction behavior
- Selecting a suggestion or sending text adds a local mock exchange.
- Web Search toggles an enabled state and can display the prepared mock sources response.
- Conversation rows switch the visible mock thread; New Chat returns to the empty state.
- Message actions, model selection, settings, toggles, sliders, and theme controls respond visually without persistence or network calls.

## Technical details
- Compose the transcript and prompt surface from the official AI Elements conversation, message, prompt-input, and shimmer primitives, customized to the Qwen design system.
- Keep app-specific pieces modular: sidebar, header, empty state, suggestions, messages, source cards, composer, model selector, settings panel, and mock data.
- Define all colors, typography, shadows, radii, and animation values as semantic Tailwind v4 tokens in the global design system.
- Use React state only. No model calls, APIs, database, authentication, search service, or backend code.
- Add page-specific title, description, Open Graph, and Twitter metadata.

## Validation
- Verify build and lint.
- Test empty and populated chat states, controls, settings, and drawer behavior in the live app.
- Check desktop and mobile layouts for readable contrast, stable composer sizing, no overlap, and no horizontal scrolling.
