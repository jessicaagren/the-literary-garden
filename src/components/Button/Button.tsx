import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import './Button.scss';

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
  className = '',
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
    } else {
      onClick?.();
    }
  };

  return (
    <button
      className={`Button ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {title}
      {children}
    </button>
  );
}
