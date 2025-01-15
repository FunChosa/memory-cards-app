import useStore from "../store";
import { IoAdd } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { LuFileJson2 } from "react-icons/lu";
import { HiMiniArrowPath } from "react-icons/hi2";
import { handleExportCards } from "../functions";
import "../styles/Header.css";

const Header = () => {
  const cards = useStore((state) => state.cards);
  const openModal = useStore((state) => state.openModal);
  const openImportModal = useStore((state) => state.openImportModal);

  return (
    <div className="header-container" id="header">
      <h2 className="header-title">
        <HiMiniArrowPath />
        Memory Cards
      </h2>
      <div className="buttons-container">
        <button onClick={openModal}>
          <IoAdd />
          Add Card
        </button>
        <button onClick={openImportModal}>
          <LuFileJson2 />
          Add via JSON
        </button>
        <button onClick={() => handleExportCards({ cards })}>
          <CiExport />
          Export Cards
        </button>
      </div>
    </div>
  );
};

export default Header;
