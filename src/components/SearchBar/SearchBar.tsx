import { useState } from 'react';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';

export type BookSearchResult = {
  key: string;
  author_name: string[];
  first_publish_year: number;
  title: string;
};

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    const data = await fetch(
      `https://openlibrary.org/search.json?title=${searchInput}`
    );
    const jsonData = await data.json();
    const results = jsonData.docs as BookSearchResult[];
    setSearchResults(results);
    console.log(results);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='SearchBar__Wrapper'>
      <div className='SearchBar'>
        <input
          id='search'
          type='search'
          placeholder='Search...'
          autoFocus
          required
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} type='button'>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
