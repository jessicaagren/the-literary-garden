import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useBooksContext } from '../../contexts/BooksContext';
import './StarRating.scss';

interface StarRatingProps {
  bookKey: string;
}

export default function StarRating({ bookKey }: StarRatingProps) {
  const { state, dispatch } = useBooksContext();
  const initialRating = state.rating[bookKey] || 0;

  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    dispatch({ type: 'SET_RATING', payload: { bookKey, rating: value } });
  };

  return (
    <div className='StarRating'>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || initialRating);
        return (
          <label key={star}>
            <input
              type='radio'
              name={`rating-${bookKey}`}
              value={star}
              onClick={() => handleClick(star)}
            />
            <FaStar
              className={`Star ${isActive ? 'Star--active' : ''}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              size={24}
            />
          </label>
        );
      })}
    </div>
  );
}
