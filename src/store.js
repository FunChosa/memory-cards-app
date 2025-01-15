import { create } from "zustand";

const useStore = create((set) => ({
  cards: [
    {
      id: "1",
      question: "Who is Luke Skywalker's father?",
      answer: "Darth Vader",
      category: "Star Wars",
    },
    {
      id: "2",
      question: "Who is the main villain in 'Avengers: Infinity War'?",
      answer: "Thanos",
      category: "Avengers",
    },
    {
      id: "3",
      question: "Who is the leader of the Jedi?",
      answer: "Yoda",
      category: "Star Wars",
    },
  ],
  newCard: {
    question: "",
    answer: "",
    category: "no_category",
  },
  isModalOpen: false,
  isImportModalOpen: false,
  isFlipped: false,
  error: null,
  jsonInput: "",

  addCard: (newCard) => set((state) => ({ cards: [...state.cards, newCard] })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  openImportModal: () => set({ isImportModalOpen: true }),
  closeImportModal: () => set({ isImportModalOpen: false }),

  setCards: (newCards) => set({ cards: newCards }),
  setError: (newError) => set({ error: newError }),
  setNewCard: (newCard) => set({ newCard }),
  setIsFlipped: (newFlipped) => set({ isFlipped: newFlipped }),
  setJsonInput: (newJsonInput) => set({ jsonInput: newJsonInput }),

  resetJsonInput: () => set({ jsonInput: "" }),
  resetNewCard: () =>
    set({ newCard: { question: "", answer: "", category: "no_category" } }),
  resetError: () => set({ error: null }),
}));

export default useStore;
