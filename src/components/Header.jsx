import { HiMiniArrowPath } from "react-icons/hi2";
import NavigationButton from "./NavigationButton";
import { FaAngleDown } from "react-icons/fa6";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header-container" id="header">
      <h2 className="header-title">
        <HiMiniArrowPath />
        Memory Cards
      </h2>
      <NavigationButton
        title="View card collection"
        id="collection-cards"
        icon={<FaAngleDown />}
      />
    </div>
  );
};

export default Header;
