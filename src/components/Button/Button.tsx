import { useNavigate } from 'react-router-dom';
import './Button.scss';

interface ButtonProps {
  title: string;
  to: string;
}

export default function Button({ title, to }: ButtonProps) {
  let navigate = useNavigate();
  return (
    <button
      className='Button'
      onClick={() => {
        navigate(to);
      }}>
      {title}
    </button>
  );
}
