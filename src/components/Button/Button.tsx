import { useNavigate } from 'react-router-dom';
import './Button.scss';
import { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  title?: string;
  to?: string;
  onClick?: () => void;
  children?: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Button({
  className,
  title,
  to,
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`BookCard__icon ${className}`}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {' '}
      {title}
      {children}
    </button>
  );
}
