import { useNavigate } from 'react-router-dom';
import './Button.scss';

interface ButtonProps {
  title: string;
  to?: string;
  onClick?: () => void;
}

export default function Button({ title, to, onClick }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button className='Button' onClick={handleClick}>
      {title}
    </button>
  );
}
