import { Link } from 'react-router-dom';
import './Logo.css';

function Logo({ className = '' }) {
  return (
    <Link className={`logo ${className}`} to="/" title="На главную" />
  );
}

export default Logo;
