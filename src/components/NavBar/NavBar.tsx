import { NavLink } from 'react-router-dom';
import './NavBar.scss';

export default function Navbar() {
  return (
    <nav className='NavBar'>
      <NavLink to='/'>
        <h1 className='NavBar__title'>The Literary Garden</h1>
      </NavLink>
      <div className='NavBar__menu'>
        <NavLink
          to='/'
          className={({ isActive }) => `Link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
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
        <NavLink
          to='/search'
          className={({ isActive }) => `Link ${isActive ? 'active' : ''}`}>
          Search
        </NavLink>
      </div>
    </nav>
  );
}
