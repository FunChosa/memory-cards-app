import Header from "./components/Header";
import CardSlider from "./components/CardSlider";
import AddCardModal from "./components/AddCardModal";
import EditCardModal from "./components/EditCardModal";
import CollectionCards from "./components/CollectionCards";
import ImportCardsModal from "./components/ImportCardsModal";
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <AddCardModal />
      <EditCardModal />
      <ImportCardsModal />

      <Header />
      <CardSlider />
      <CollectionCards />
    </div>
  );
};

export default App;
