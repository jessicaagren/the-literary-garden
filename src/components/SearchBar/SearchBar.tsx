import { useState } from 'react';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export type BookSearchResult = {
  key: string;
  author_name: string[];
  first_publish_year: number;
  title: string;
};

type SearchBarProps = {
  onResults?: (results: BookSearchResult[]) => void;
};

export default function SearchBar({ onResults }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    const data = await fetch(
      `https://openlibrary.org/search.json?title=${searchInput}`
    );
    const jsonData = await data.json();

    if (onResults) {
      onResults(jsonData.docs);
    }

    navigate(`/search?query=${searchInput}`, {
      state: { results: jsonData.docs },
    });

    setSearchInput('');
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
