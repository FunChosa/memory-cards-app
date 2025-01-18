const Button = ({ title, icon, className, onClick, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {icon}
      {title}
    </button>
  );
};

export default Button;
