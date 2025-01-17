import "./NavigationButton.css";

const NavigationButton = ({ title, to, icon }) => {
  return (
    <a
      href={to}
      className="navigation-button"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(to).scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      {title} {icon}
    </a>
  );
};

export default NavigationButton;
