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

  if (!passedResults) {
    return <p>Loading...</p>;
  }

  return (
    <div className='SearchResults'>
      <h1>Search results:</h1>
      {passedResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className='SearchResults__Grid'>
          {passedResults.map((result) => (
            <BookCard title={result.title} author={result.author_name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
