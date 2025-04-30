import './BookCard.scss';
import FavouritesButton from '../FavouritesButton/FavouritesButton';

interface BookCardProps {
  title: string;
  author: string[];
  img: string;
}

export default function BookCard({ title, author = [], img }: BookCardProps) {
  let formattedAuthors: string;
  if (author.length > 3) {
    formattedAuthors = `${author.slice(0, 3).join(', ')}, etc.`;
  } else if (author.length === 2) {
    formattedAuthors = `${author[0]} & ${author[1]}`;
  } else {
    formattedAuthors = author.join(', ');
  }

  return (
    <div className='BookCard'>
      <FavouritesButton className='BookCard__icon-wrapper' />
      <img className='BookCard__image' src={img} alt={title} />
      <p className='BookCard__title'>{title}</p>
      <p className='BookCard__author'>{formattedAuthors}</p>
    </div>
  );
}
