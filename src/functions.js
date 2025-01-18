import { v4 as uuidv4 } from "uuid";

export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const validateAndPrepareCards = (newCards) => {
  if (!Array.isArray(newCards)) {
    console.error("Uploaded data must be an array");
    return [];
  }
  return newCards
    .filter((card) => {
      if (typeof card !== "object" || card === null) return false;
      if (!card.question || typeof card.question !== "string") return false;
      if (!card.answer || typeof card.answer !== "string") return false;
      if (card.category && typeof card.category !== "string") return false;
      return true;
    })
    .map((card) => {
      return {
        id: uuidv4(),
        category: card.category || "no_category",
        ...card,
      };
    });
};

export const handleExportCards = (cards) => {
  const json = JSON.stringify(cards, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "memory_cards.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
