import React from "react";
import "../styles/Header.css";
import { IoAdd } from "react-icons/io5";
const Header = ({ openModal }) => {
  return (
    <div className="header-container" id="header">
      <h2>Memory Cards</h2>
      <div className="buttons-container">
        <button onClick={openModal}>
          <IoAdd />
          Add Card
        </button>
      </div>
    </div>
  );
};

export default Header;
