import './BookCard.scss';
import { Link } from 'react-router-dom';
import FavouritesButton from '../FavouritesButton/FavouritesButton';
import { BookType } from '../../types/BookType';
import { BookEditionType } from '../../types/BookEditionType';

interface BookCardProps {
  book: BookType;
  edition?: BookEditionType;
}

export default function BookCard({ book }: BookCardProps) {
  const title = book.title || 'Untitled';

  const authors =
    book.authors?.map((a: any) => a.name || a.author?.name || 'Unknown') || [];

  const formattedAuthors = (() => {
    if (authors.length > 3) return `${authors.slice(0, 3).join(', ')}, etc.`;
    if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
    return authors.join(', ') || 'Unknown author';
  })();

  const bookId = book.key?.replace('/works/', '') || '';
  const coverId = (book.cover_i || book.covers?.[0]) as number | undefined;
  const img = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://placehold.co/200x300?text=Cover+unavailable';

  return (
    <Link to={`/books/${bookId}`} className='BookCard__link'>
      <div className='BookCard'>
        <div className='BookCard__imageWrapper'>
          <FavouritesButton book={{ key: book.key }} />
          <img
            className='BookCard__image'
            src={img}
            alt={`Cover for ${title}`}
          />
        </div>
        <p className='BookCard__title'>{title}</p>
        <p className='BookCard__author'>{formattedAuthors}</p>
      </div>
    </Link>
  );
}
