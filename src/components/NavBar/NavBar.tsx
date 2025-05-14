import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import FlowerIcon from '../FlowerIcon/FlowerIcon';
import './NavBar.scss';

export default function Navbar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `Link${isActive ? ' active' : ''}`;

  return (
    <nav className='NavBar'>
      <NavLink to='/' className='NavBar__title_wrapper'>
        <FlowerIcon />
        <h1 className='NavBar__title'>The Literary Garden</h1>
      </NavLink>
      <div className='NavBar__menu'>
        <NavLink to='/my-books' className={getLinkClass}>
          My Books
        </NavLink>
        <NavLink to='/my-stats' className={getLinkClass}>
          Stats
        </NavLink>
        <NavLink to='/browse' className={getLinkClass}>
          Browse
        </NavLink>
        <SearchBar />
      </div>
    </nav>
  );
}
