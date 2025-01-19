# Memory-cards-app

The Memory Cards App is a flashcard-based learning tool designed to help you remember information more effectively. Built with React and Vite, this app allows you to easily create, edit, and manage your flashcards. You can use them to practice in a dedicated practice mode or browse them in a convenient collection. The app also offers import and export functions, so you can save and share your collection with your friends.

## Project Setup

1. **Clone the repository:** `git clone https://github.com/FunChosa/memory-cards-app.git`
2. **Navigate to the project directory:** `cd memory-cards-app`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm run dev`

## Features
### Training Slider

This mode is designed for active memorization and practice using your flashcards.

#### Key Features:

- **Card Interaction:** Click on a card to reveal its question and answer, or toggle between them.
- **Category Filtering:** Filter your current training session by selecting multiple categories from a list.
- **Shuffle Button:** Change the order of the cards for a more dynamic practice experience. The original order matches the order of creation or the order in the JSON file.
- **Slider Navigation:** Move through cards using the "previous" and "next" buttons.
- **Theme Selection Toggle Button:** Choose between a light or dark application theme for comfortable viewing.
- **"View card collection" Button:** Quickly return to the card collection mode for management.

### Card Collection

This mode is for creating, organizing, and managing your flashcards.

#### Key Features:

- **Creating Cards:** Add new cards through a modal window using a dedicated button. Each card requires a question and an answer, with an optional category (all uncategorized cards are labeled as `#no_category`). Categories must follow the format `# + category`, for example, `#Math`.
- **Editing and Deleting Cards:** Click on a card to modify or delete existing cards within a modal window.
- **Importing Cards:** Import multiple cards from a JSON file.
  - You can upload a JSON file.
  - You can paste a JSON array directly into a modal input window. The JSON array should be an array of objects, each with required `"question"` and `"answer"` keys, both with string values.
- **Exporting Cards:** Export your entire card collection to JSON format.
- **Selective Card Actions:** Select cards using checkboxes for bulk deletion or partial export.
- **Select All Function:** Use the "Select All" button to quickly select all cards for bulk actions.
- **Text-Based Search:** Filter the card collection by question, answer, or category. To filter by a specific category, use the format `"# + category"`.
- **Data Persistence:** All cards and the chosen application theme are stored in your browser's `localStorage`, ensuring your settings are saved between sessions.
- **"Back to training" Button:** Quickly return to the training mode for practice.

## Example Import

Below is an example of how the JSON array for importing cards should look like:

```json
[
  {
    "question": "What is the capital of France?",
    "answer": "Paris",
    "category": "#Geography"
  },
  {
    "question": "What is the chemical symbol for water?",
    "answer": "H2O"
  },
  {
    "question": "Who wrote 'Hamlet'?",
    "answer": "William Shakespeare",
    "category": "#Literature"
  }
]
```

## Technology Stack

* React: ^18.3.1
* Vite: ^6.0.5
* Zustand: ^5.0.3
* React Icons: ^5.4.0
* React Modal: ^3.16.3
* UUID: ^11.0.5

## State Management

Application state is managed using the Zustand library, providing efficient and simple state handling.

## Data Storage

This application uses the browser's `localStorage` to persist card data and theme settings. `Zustand`'s persistence middleware handles data saving and retrieval.

## Deployment

The application is deployed on Netlify: https://funchosa-memory-cards-app.netlify.app

## Future Enhancements

* Enhance card creation/editing with a dropdown menu to select from existing categories;
* Enable keyboard control of the card slider for a better user experience.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
