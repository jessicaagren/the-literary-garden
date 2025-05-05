import { NavLink } from 'react-router-dom';
import './NavBar.scss';
import SearchBar from '../SearchBar/SearchBar';
import FlowerComponent from '../FlowerComponent/FlowerComponent';

export default function Navbar() {
  return (
    <nav className='NavBar'>
      <NavLink to='/' className='NavBar__title_wrapper'>
        <FlowerComponent />
        <h1 className='NavBar__title'>The Literary Garden</h1>
      </NavLink>
      <div className='NavBar__menu'>
        <NavLink
          to='/my-books'
          className={({ isActive }) => `Link ${isActive ? 'active' : ''}`}>
          My Books
        </NavLink>
        <NavLink
          to='/browse'
          className={({ isActive }) => `Link ${isActive ? 'active' : ''}`}>
          Browse
        </NavLink>
        <SearchBar />
      </div>
    </nav>
  );
}
