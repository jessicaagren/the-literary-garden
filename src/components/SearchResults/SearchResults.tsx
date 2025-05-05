import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import FlowerComponent from '../FlowerComponent/FlowerComponent';
import './SearchResults.scss';

type BookSearchResult = {
  key: string;
  author_name: string[];
  title: string;
  cover_i: number;
};

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState<BookSearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);

      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      setResults(data.docs);
      setIsLoading(false);
    };

    fetchResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className='SearchResults__Loading'>
        <FlowerComponent alwaysRotating />
      </div>
    );
  }

  return (
    <div className='SearchResults'>
      <h2>Search results for: "{query}"</h2>
      {results?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className='SearchResults__Grid'>
          {results?.map((result) => {
            const coverUrl = result.cover_i
              ? `https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`
              : 'https://placehold.co/150x220?text=Cover+unavailable';

            return (
              <BookCard
                key={result.key}
                title={result.title}
                author={result.author_name}
                img={coverUrl}
                bookId={result.key.split('/').pop()!}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
