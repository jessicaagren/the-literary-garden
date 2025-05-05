import './BookCard.scss';
import FavouritesButton from '../FavouritesButton/FavouritesButton';
import { Link } from 'react-router-dom';

interface BookCardProps {
  title: string;
  author: string[];
  img: string;
  bookId: string;
}

export default function BookCard({
  title,
  author = [],
  img,
  bookId,
}: BookCardProps) {
  let formattedAuthors: string;
  if (author.length > 3) {
    formattedAuthors = `${author.slice(0, 3).join(', ')}, etc.`;
  } else if (author.length === 2) {
    formattedAuthors = `${author[0]} & ${author[1]}`;
  } else {
    formattedAuthors = author.join(', ');
  }

  return (
    <>
      <FavouritesButton />
      <Link to={`/search/${bookId}`} className='BookCard__link'>
        <div className='BookCard'>
          <img className='BookCard__image' src={img} alt={title} />
          <p className='BookCard__title'>{title}</p>
          <p className='BookCard__author'>{formattedAuthors}</p>
        </div>
      </Link>
    </>
  );
}
