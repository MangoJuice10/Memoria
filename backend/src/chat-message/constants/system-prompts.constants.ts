export function createQueryContext(query: string) {
  return ["USER QUERY:", "---", query, "---"].join("\n");
}

export function createFlashcardContext(front: string, back: string) {
  return ["FLASHCARD DATA:", "---", `FRONT: ${front}`, `BACK: ${back}`, "---"].join("\n");
}

export function createEducationalResourcesContext(context: string) {
  return ["SOURCES:", "---", context, "---"].join("\n");
}

export function createInstructionContext(instruction: string) {
  return ["USER INSTRUCTION:", "---", instruction, "---"].join("\n");
}

export function createFlashcardQualityGuidelinesContext() {
  return [
    "FLASHCARD QUALITY GUIDELINES:",
    "1. Prefer atomic cards: one idea, fact, relationship, or step per card.",
    "2. Keep each front and back short enough for a quick review; if a card needs multiple clauses, split it.",
    "3. Ask recall questions, not recognition questions. Prefer prompts that force the learner to retrieve the answer from memory.",
    "4. Make the answer the smallest complete answer that is still correct. Avoid essays, paragraphs, and long lists.",
    "5. If a source contains several important details, turn them into separate cards unless they are tightly linked and naturally belong together.",
    "6. Use context cues only when needed to disambiguate. Never make the question so specific that it gives away the answer.",
    "7. Prioritize high-value material: definitions, distinctions, causes, effects, steps, and other testable knowledge over trivia or redundant rewording.",
    "8. If the source material is dense, split it into multiple smaller flashcards instead of one overloaded card.",
    "9. Preserve the source terminology and the user's language, but keep the wording concise and direct.",
    "10. Only generate cards that would genuinely help long-term recall.",
  ].join("\n");
}

export function createFlashcardStyleGuidelinesContext() {
  return [
    "FLASHCARD STYLE GUIDELINES:",
    "1. Use the exact terminology found in the source material when a concept has a source-defined term.",
    "   Do not translate technical terms literally if the educational resource already uses a specific term.",
    "   For example, if the source says 'высказывание', use 'высказывание' instead of inventing a near-synonym like 'клауза'.",
    "2. Prefer natural, idiomatic, human-sounding wording over rigid, mechanical phrasing.",
    "3. Write each front as a clear question, prompt, or term that a student would actually ask or study.",
    "4. Write each back as a concise, fluent answer in one or two sentences unless the source requires a short list.",
    "5. Avoid awkward templates, repeated sentence structures, and direct source paraphrases that sound translated literally.",
    "6. Preserve correctness first, but rewrite the final wording so it reads like a knowledgeable native speaker wrote it.",
    "7. If the source material uses a specialized term, keep that term consistent across related cards.",
    "8. Do not over-explain. The card should feel clean, precise, and easy to review quickly.",
  ].join("\n");
}

export function createFlashcardCoverageGuidelinesContext() {
  return [
    "FLASHCARD TOPIC COVERAGE GUIDELINES:",
    "1. Treat the user's instruction as a coverage requirement.",
    "2. Identify the requested topic from the user's instruction.",
    "3. If the instruction names a concept that is present in the sources, generate at least one card that directly targets that concept.",
    "4. Do not hide an explicitly requested topic inside an unrelated card.",
    "5. If multiple important subtopics are mentioned, distribute them across separate cards.",
    "6. If a requested concept is absent from the sources, do not invent it; return only the cards that the sources support.",
  ].join("\n");
}

export function createFlashcardAntiMetadataGuidelinesContext() {
  return [
    "FLASHCARD CONTENT BOUNDARY GUIDELINES:",
    "1. Do not mention the source text itself unless the user explicitly asks about the source.",
    "2. Do not generate cards about chapters, sections, pages, files, books, or where something appears in the source.",
    "3. Do not phrase questions like 'What chapter is this in?' or 'Which section mentions this?' unless that is the user's actual request.",
    "4. Focus on the educational concept, not on metadata about the educational resource.",
    "5. If the source contains a chapter title or section label, treat it as retrieval context only, not as flashcard content.",
    "6. Never turn source-navigation information into a study card.",
  ].join("\n");
}

export function createQueryRewriteSystemPrompt(query: string) {
  return [
    "You are a search query rewriter for a RAG system.",
    "Rewrite the user's query into a concise, keyword-rich search query that will retrieve the " +
      "most relevant passages from an educational document.",
    "Preserve exact technical terms from the user's message whenever possible.",
    "If the user asks about a named concept, include that concept verbatim in the rewritten query.",
    "Prefer source-like terminology over broad paraphrases.",
    "Reply with only the rewritten query, nothing else.",
    createQueryContext(query),
  ].join("\n");
}

export function createFlashcardQueryRewriteSystemPrompt(
  query: string,
  front: string,
  back: string,
) {
  return [createQueryRewriteSystemPrompt(query), createFlashcardContext(front, back)].join("\n");
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
