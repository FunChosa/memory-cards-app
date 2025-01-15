import React from "react";
import "../styles/Header.css";
import { IoAdd } from "react-icons/io5";
import { HiMiniArrowPath } from "react-icons/hi2";
const Header = ({ openModal, openImportModal, handleExportCards }) => {
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
          <IoAdd />
          Import Cards
        </button>
        <button onClick={handleExportCards}>Export Cards</button>
      </div>
    </div>
  );
};

export default Header;
