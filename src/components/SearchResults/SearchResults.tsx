import { useLocation } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import './SearchResults.scss';
import { BookType } from '../../types/BookType';
import { useFetch } from '../../hooks/useFetch';
import FlowerIcon from '../FlowerIcon/FlowerIcon';

type BookSearchResult = {
  key: string;
  author_name: string[];
  title: string;
  cover_i: number;
};

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const { data, isLoading, error } = useFetch<{ docs: BookSearchResult[] }>(
    query ? `https://openlibrary.org/search.json?title=${query}` : null
  );

  const results: BookType[] =
    data?.docs.map((result, index) => ({
      key: result.key,
      title: result.title,
      cover_i: result.cover_i,
      covers: result.cover_i ? [result.cover_i] : [],
      authors:
        result.author_name?.map((name, i) => ({
          author: {
            key: `author-${index}-${i}`,
            name,
          },
        })) || [],
    })) || [];

  if (isLoading) {
    return (
      <div className='SearchResults__Loading'>
        <FlowerIcon alwaysRotating />
      </div>
    );
  }

  if (error) {
    return <div className='SearchResults__Error'>{error.message}</div>;
  }

  return (
    <div className='SearchResults'>
      <h2>Search results for: "{query}"</h2>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className='SearchResults__Grid'>
          {results.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
