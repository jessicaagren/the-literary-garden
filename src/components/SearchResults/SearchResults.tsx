import { useLocation } from 'react-router-dom';
import { BookSearchResult } from '../SearchBar/SearchBar';
import BookCard from '../BookCard/BookCard';
import './SearchResults.scss';

type SearchResultProps = {
  results?: BookSearchResult[];
};

const SearchResults = ({ results }: SearchResultProps) => {
  const location = useLocation();
  const passedResults =
    (location.state?.results as BookSearchResult[]) || results;

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  if (!passedResults) {
    return <p>Loading...</p>;
  }

  return (
    <div className='SearchResults'>
      <h2>Search results for: "{query}"</h2>
      {passedResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className='SearchResults__Grid'>
          {passedResults.map((result) => {
            const coverUrl = result.cover_i
              ? `https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`
              : 'https://placehold.co/150x220?text=Cover+unavailable';

            return (
              <BookCard
                key={result.key}
                title={result.title}
                author={result.author_name}
                img={coverUrl}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
