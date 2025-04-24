import { useState } from 'react';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', query);
  };

  return (
    <div className='SearchBarWrapper'>
      <form onSubmit={handleSubmit} role='search' className='SearchBar'>
        <label htmlFor='search'>Search for stuff</label>
        <input
          id='search'
          type='search'
          placeholder='Search...'
          autoFocus
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>
          {' '}
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
