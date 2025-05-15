import { useEffect, useState } from 'react';
import { useBooksContext } from '../../contexts/BooksContext';
import BookList from '../../components/BookList/BookList';
import { BookType } from '../../types/BookType';

export default function MyBooksPage() {
  const { state } = useBooksContext();
  const [favouriteBooks, setFavouriteBooks] = useState<BookType[]>([]);
  const [readBooks, setReadBooks] = useState<BookType[]>([]);

  useEffect(() => {
    if (state.favourites.length) {
      fetchBooksWithAuthors(state.favourites, setFavouriteBooks);
    }

    if (state.read.length) {
      fetchBooksWithAuthors(state.read, setReadBooks);
    }
  }, [state.favourites, state.read]);

  const fetchBooksWithAuthors = async (
    booksArray: BookType[],
    setter: (books: BookType[]) => void
  ) => {
    const books = await Promise.all(
      booksArray.map(async (book) => {
        try {
          const bookData = await fetchJson(
            `https://openlibrary.org${book.key}.json`
          );
          const authors = await fetchAuthorNames(bookData.authors);

          return {
            ...bookData,
            authors,
          };
        } catch (error) {
          console.error(`Error fetching book ${book.key}`, error);
          return null;
        }
      })
    );

    setter(books.filter((b): b is BookType => b !== null));
  };

  const fetchJson = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed');
    return res.json();
  };

  const fetchAuthorNames = async (authors: any[] = []) => {
    return Promise.all(
      authors.map(async (authorRef) => {
        try {
          const authorData = await fetchJson(
            `https://openlibrary.org${authorRef.author.key}.json`
          );
          return { name: authorData.name };
        } catch {
          return { name: 'Unknown' };
        }
      })
    );
  };

  return (
    <div className='MyBooksPage'>
      <BookList title='Favourite Books' books={favouriteBooks} />
      <BookList title='Read Books' books={readBooks} />
    </div>
  );
}
