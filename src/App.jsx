import CardsSlider from "./components/CardsSlider/CardsSlider";
import AddCardModal from "./components/modalForms/AddCardModal";
import EditCardModal from "./components/modalForms/EditCardModal";
import CardsCollection from "./components/CardsCollection/CardsCollection";
import ImportCardsModal from "./components/modalForms/ImportCardsModal";

const App = () => {
  return (
    <div className="App">
      <AddCardModal />
      <EditCardModal />
      <ImportCardsModal />

      <CardsSlider />
      <CardsCollection />
    </div>
  );
};

export default App;
