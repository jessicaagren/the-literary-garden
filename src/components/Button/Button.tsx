import './Button.scss';

interface ButtonProps {
  title: string;
}

export default function Button({ title }: ButtonProps) {
  return <button className='Button'>{title}</button>;
}
