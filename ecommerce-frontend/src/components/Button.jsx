import "../styles/Button.css";

const Button = ({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;