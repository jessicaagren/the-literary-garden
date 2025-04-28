import { useState } from 'react';
import Button from '../Button/Button';
import './BookCard.scss';
import {
  FaHeartCircleCheck,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
} from 'react-icons/fa6';

interface BookCardProps {
  title: string;
  author: string[];
  img?: string;
}

export default function BookCard({ title, author = [], img }: BookCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverLeftOnce, setHasHoverLeftOnce] = useState(false);

  let formattedAuthors: string;
  if (author.length > 3) {
    formattedAuthors = `${author.slice(0, 3).join(', ')}, etc.`;
  } else if (author.length === 2) {
    formattedAuthors = `${author[0]} & ${author[1]}`;
  } else {
    formattedAuthors = author.join(', ');
  }

  const getIcon = () => {
    if (!isClicked) {
      return <FaHeartCirclePlus className='BookCard__icon' />;
    }

    if (isClicked) {
      if (!hasHoverLeftOnce) {
        return (
          <FaHeartCircleCheck className='BookCard__icon BookCard__icon__check' />
        );
      }
      if (isHovered) {
        return <FaHeartCircleMinus className='BookCard__icon' />;
      } else {
        return (
          <FaHeartCircleCheck className='BookCard__icon BookCard__icon__check' />
        );
      }
    }
  };

  const handleClick = () => {
    setIsClicked((prev) => {
      const next = !prev;
      if (!next) {
        setHasHoverLeftOnce(false);
      }
      return next;
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (isClicked && !hasHoverLeftOnce) {
      setHasHoverLeftOnce(true);
    }
  };

  return (
    <div className='BookCard'>
      <Button
        className='BookCard__icon-wrapper'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {getIcon()}
      </Button>
      <img
        className='BookCard__image'
        src={
          img ||
          'https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif'
        }
        alt={title}
      />
      <p className='BookCard__title'>{title}</p>
      <p className='BookCard__author'>{formattedAuthors}</p>
    </div>
  );
}
