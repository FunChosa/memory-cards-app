import CardsSlider from "./components/CardsSlider/CardsSlider";
import AddCardModal from "./components/modalForms/AddCardModal";
import EditCardModal from "./components/modalForms/EditCardModal";
import CardsCollection from "./components/CardsCollection/CardsCollection";
import ImportCardsModal from "./components/modalForms/ImportCardsModal";
import useStore from "./store";
import DeleteConfirmModal from "./components/modalForms/DeleteConfirmModal";

const App = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div className="App" data-theme={isDarkMode ? "dark" : "light"} id="app">
      <AddCardModal />
      <EditCardModal />
      <ImportCardsModal />
      <DeleteConfirmModal />

      <CardsSlider />
      <CardsCollection />
    </div>
  );
};

export default App;
