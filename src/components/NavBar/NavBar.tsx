import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function Navbar() {
  return (
    <nav className='NavBar'>
      <Link to='/'>Home</Link>
      <Link to='/my-books'>My Books</Link>
      <Link to='/browse'>Browse</Link>
      <Link to='/search'>Search</Link>
    </nav>
  );
}
