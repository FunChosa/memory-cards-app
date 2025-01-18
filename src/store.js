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
    {
      id: "4",
      question: "What is the capital of France?",
      answer: "Paris",
      category: "no_category",
    },
    {
      id: "5",
      question: "What is the highest mountain in the world?",
      answer: "Mount Everest",
      category: "no_category",
    },
    {
      id: "6",
      question: "What is the chemical symbol for water?",
      answer: "H2O",
      category: "no_category",
    },
  ],
  newCard: {
    question: "",
    answer: "",
    category: "no_category",
  },
  editableCard: {
    question: "",
    answer: "",
    category: "no_category",
  },

  isAddModalOpen: false,
  isEditModalOpen: false,
  isImportModalOpen: false,
  isFlipped: false,
  error: null,
  jsonInput: "",
  currentCardIndex: 0,
  filterCategory: [],
  categories: [],
  deletedCards: [],

  addCard: (newCard) => set((state) => ({ cards: [...state.cards, newCard] })),
  deleteCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== cardId),
    })),
  editCard: (editedCard) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === editedCard.id ? editedCard : card
      ),
    })),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),

  openImportModal: () => set({ isImportModalOpen: true }),
  closeImportModal: () => set({ isImportModalOpen: false }),

  setCards: (newCards) => set({ cards: newCards }),
  setError: (newError) => set({ error: newError }),
  setNewCard: (newCard) => set({ newCard }),
  setIsFlipped: (newFlipped) => set({ isFlipped: newFlipped }),
  setJsonInput: (newJsonInput) => set({ jsonInput: newJsonInput }),
  setEditableCard: (newCard) => set({ editableCard: newCard }),
  setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
  setFilterCategory: (newFilter) => set({ filterCategory: newFilter }),
  setCategories: (newCategories) => set({ categories: newCategories }),
  setDeletedCards: (newDeletedCards) => set({ deletedCards: newDeletedCards }),

  resetJsonInput: () => set({ jsonInput: "" }),
  resetNewCard: () =>
    set({
      newCard: {
        question: "",
        answer: "",
        category: "no_category",
      },
    }),
  resetError: () => set({ error: null }),
  resetEditableCard: () =>
    set({
      editableCard: {
        question: "",
        answer: "",
        category: "no_category",
      },
    }),
  resetDeletedCards: () => set({ deletedCards: [] }),
}));

export default useStore;
