import './Button.css';

function Button({ className = '', children, ...rest }) {
  return (
    <button {...rest} className={`button ${className}`}>{children}</button>
  );
}

export default Button;
