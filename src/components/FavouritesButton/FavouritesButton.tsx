import { useState } from 'react';
import {
  FaHeartCircleCheck,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
} from 'react-icons/fa6';
import './FavouritesButton.scss';

interface ButtonProps {
  className?: string;
}

export default function FavouritesButton({ className = '' }: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverLeftOnce, setHasHoverLeftOnce] = useState(false);

  const getIcon = () => {
    if (!isClicked) {
      return <FaHeartCirclePlus className='FavouritesButton__icon' />;
    }

    if (!hasHoverLeftOnce) {
      return (
        <FaHeartCircleCheck className='FavouritesButton__icon FavouritesButton__icon__check' />
      );
    }

    if (isHovered) {
      return <FaHeartCircleMinus className='FavouritesButton__icon' />;
    }

    return (
      <FaHeartCircleCheck className='FavouritesButton__icon FavouritesButton__icon__check' />
    );
  };

  const handleClick = () => {
    setIsClicked((prev) => {
      const next = !prev;
      if (!next) setHasHoverLeftOnce(false);
      return next;
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isClicked && !hasHoverLeftOnce) {
      setHasHoverLeftOnce(true);
    }
  };

  return (
    <button
      className={`FavouritesButton ${isClicked ? 'clicked' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {getIcon()}
    </button>
  );
}
