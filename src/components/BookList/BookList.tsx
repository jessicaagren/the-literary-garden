import BookCard from '../BookCard/BookCard';
import './BookList.scss';
import { BookType } from '../../types/BookType';

interface BookListProps {
  title: string;
  books: BookType[];
}

export default function BookList({ title, books }: BookListProps) {
  return (
    <div className='BookList'>
      <h2>{title}</h2>
      <div className='BookList__Wrapper'>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map((book) => <BookCard key={book.key} book={book} />)
        )}
      </div>
    </div>
  );
}
