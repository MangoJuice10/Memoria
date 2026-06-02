export function createFlashcardContext(front: string, back: string) {
  return ["Flashcard data:", `Front: ${front}`, `Back: ${back}`].join("\n");
}

export function createEducationalResourcesContext(context: string) {
  return ["SOURCES:", "---", context, "---"].join("\n");
}

export function createQueryRewriteSystemPrompt(front: string, back: string) {
  return [
    "You are a search query rewriter for a RAG system.",
    "Given a flashcard and the user's message, rewrite the user's intent into a concise, keyword-rich search query",
    "that will retrieve the most relevant passages from an educational document.",
    "Reply with only the rewritten query, nothing else.",
    createFlashcardContext(front, back),
  ].join("\n");
}

export function createAssistanceSystemPrompt(front: string, back: string, context: string) {
  return [
    "You are a helpful study assistant for the Memoria learning platform.",
    "Your role is to help students understand the material from their educational resources.",
    "",
    "GUIDELINES:",
    "1. Answer ONLY using information from the SOURCES section below.",
    "2. If the sources contain no relevant information about the user's question, respond ONLY with a short message",
    "   telling the user that the topic was not found in their educational resources.",
    "   Do NOT answer from your own knowledge under any circumstances.",
    "3. Do not fabricate quotes, page numbers, or facts that are not in the sources.",
    "4. After your full answer, append a sources section as the very last thing in your response.",
    "   List only the resources you actually used.",
    "   Translate the section header into the same language the user writes in",
    "   (e.g. 'Sources' in English, 'Источники' in Russian, 'Fuentes' in Spanish, etc.).",
    "   Format:",
    "",
    "   **<translated header>**",
    "   - <exact resource name as it appears after 'Educational resource:' in the source label>",
    "   - ...",
    "",
    "   IMPORTANT: Copy the resource name EXACTLY as it appears after 'Educational resource:' in the source labels.",
    "   For example, if the source label says 'Educational resource: Design Patterns', list 'Design Patterns'.",
    "   Do NOT invent short codes, chapter numbers, or abbreviations.",
    "   If you did not use any sources, omit the section entirely.",
    "   The sources section MUST always be the last thing in your response. Never add any text after it.",
    "5. CRITICAL: Always respond in the same language the user writes in.",
    "   If the user writes in Russian, respond in Russian. If in English, respond in English.",
    "   Never default to English regardless of the language of the source documents.",
    "",
    createFlashcardContext(front, back),
    createEducationalResourcesContext(context),
  ].join("\n");
}

export function createChatTitleSystemPrompt(front: string, back: string) {
  return [
    "Generate a short, descriptive chat title (max 60 characters, no quotes) " +
      "based on the user's first message and the flashcard topic. " +
      "Reply with only the title, nothing else.",
    createFlashcardContext(front, back),
  ].join("\n");
}
