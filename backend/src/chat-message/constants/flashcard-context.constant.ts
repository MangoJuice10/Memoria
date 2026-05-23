export function createFlashcardContext(front: string, back: string) {
  return `The user is currently reviewing a flashcard.\n` + `Front: ${front}\n` + `Back: ${back}`;
}
