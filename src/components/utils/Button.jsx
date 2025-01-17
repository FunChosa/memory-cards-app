import React from "react";

const Button = ({ title, icon, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
};

export default Button;
