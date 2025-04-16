import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function Navbar() {
  return (
    <nav className='NavBar'>
      <h1 className='title'>The Literary Garden</h1>
      <Link to='/'>Home</Link>
      <Link to='/my-books'>My Books</Link>
      <Link to='/browse'>Browse</Link>
      <Link to='/search'>Search</Link>
    </nav>
  );
}
