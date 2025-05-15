import { useEffect, useState } from 'react';
import { useBooksContext } from '../../contexts/BooksContext';
import { BookType } from '../../types/BookType';
import { BookEditionType } from '../../types/BookEditionType';
import Button from '../Button/Button';

interface ReadButtonProps {
  book: BookType;
  className?: string;
  edition?: BookEditionType | null;
}

export default function ReadButton({
  book,
  className = '',
  edition,
}: ReadButtonProps) {
  const { state, dispatch } = useBooksContext();
  const isRead = state.read.some((b) => b.key === book.key);

  const [title, setTitle] = useState(isRead ? 'Mark as unread' : 'Add as read');

  useEffect(() => {
    setTitle(isRead ? 'Mark as unread' : 'Add as read');
  }, [isRead]);

  const toggleRead = () => {
    if (isRead) {
      dispatch({ type: 'REMOVE_READ', payload: book.key });
    } else {
      dispatch({
        type: 'ADD_READ',
        payload: {
          ...book,
          number_of_pages: edition?.number_of_pages ?? book.number_of_pages,
        },
      });
    }
  };

  return (
    <Button
      className={`ReadButton ${className}`}
      title={title}
      onClick={toggleRead}
    />
  );
}
