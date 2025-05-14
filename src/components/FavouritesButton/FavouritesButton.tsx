import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaHeartCircleCheck,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
} from 'react-icons/fa6';
import { useBooksContext } from '../../contexts/BooksContext';
import { BookType } from '../../types/BookType';

import './FavouritesButton.scss';

interface FavouritesButtonProps {
  book: BookType;
  className?: string;
}

export default function FavouritesButton({
  book,
  className = '',
}: FavouritesButtonProps) {
  const { state, dispatch } = useBooksContext();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [hasLeftOnce, setHasLeftOnce] = useState(false);

  const isFavourite = state.favourites.some((fav) => fav.key === book.key);
  const isOnFavouritesPage = location.pathname.startsWith('/my-books');

  useEffect(() => {
    if (!isOnFavouritesPage) {
      setHasLeftOnce(false);
    }
  }, [isOnFavouritesPage]);

  const handleClick = () => {
    if (isFavourite) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: book.key });
    } else {
      dispatch({ type: 'ADD_FAVOURITE', payload: book });

      if (!isOnFavouritesPage) {
        setHasLeftOnce(false);
      }
    }
  };

  const getIcon = () => {
    if (!isFavourite) {
      return <FaHeartCirclePlus className='FavouritesButton__icon' />;
    }

    if (isHovered && (isOnFavouritesPage || hasLeftOnce)) {
      return <FaHeartCircleMinus className='FavouritesButton__icon' />;
    }

    return (
      <FaHeartCircleCheck className='FavouritesButton__icon FavouritesButton__icon__check' />
    );
  };

  return (
    <button
      className={`FavouritesButton ${
        isFavourite ? 'clicked' : ''
      } ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isOnFavouritesPage) {
          setHasLeftOnce(true);
        }
      }}>
      {getIcon()}
    </button>
  );
}
