import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function Navbar() {
  return (
    <nav className='NavBar'>
      {/* <h1 className='title'>The Literary Garden</h1> */}
      <Link to='/'>
        <h1 className='title2'>The Literary Garden</h1>
      </Link>
      <div className='NavBarMenu'>
        <Link to='/' className='Link'>
          Home
        </Link>
        <Link to='/my-books' className='Link'>
          My Books
        </Link>
        <Link to='/browse' className='Link'>
          Browse
        </Link>
        <Link to='/search' className='Link'>
          Search
        </Link>
      </div>
    </nav>
  );
}
