import React from "react";
import "../styles/NavigationButton.css";
const NavigationButton = ({ title, id, icon }) => {
  return (
    <a
      href={id}
      className="navigation-button"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      {title} {icon}
    </a>
  );
};

export default NavigationButton;
