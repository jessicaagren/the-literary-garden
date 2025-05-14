import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';

export type BookSearchResult = {
  key: string;
  author_name: string[];
  title: string;
  cover_i: number;
};

type SearchBarProps = {
  onResults?: (results: BookSearchResult[]) => void;
};

export default function SearchBar({ onResults }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = searchInput.trim();
    if (!query) return;

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      onResults?.(data.docs);
      navigate(`/search?query=${query}`);
      setSearchInput('');
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='SearchBar__wrapper'>
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
          <FaSearch className='SearchBar__icon' />
        </button>
      </div>
    </div>
  );
}
