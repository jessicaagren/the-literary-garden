import { useBooksContext } from '../../contexts/BooksContext';
import './StatsPage.scss';

export default function MyStatsPage() {
  const {
    state: { read, rating },
  } = useBooksContext();

  const readBooks = read;

  let totalPages = 0;
  for (const book of readBooks) {
    if (book.number_of_pages) {
      totalPages += book.number_of_pages;
    }
  }

  let ratedBooks: number[] = [];
  for (const book of readBooks) {
    const bookRating = rating[book.key];
    if (typeof bookRating === 'number') {
      ratedBooks.push(bookRating);
    }
  }

  let averageRating: number | null = null;
  if (ratedBooks.length > 0) {
    let totalRating = 0;
    for (const r of ratedBooks) {
      totalRating += r;
    }
    averageRating = parseFloat((totalRating / ratedBooks.length).toFixed(1));
  }

  return (
    <div className='MyStatsPage'>
      <h2>My Stats</h2>
      <ul>
        <li>
          <strong>Read books:</strong> {readBooks.length}
        </li>
        <li>
          <strong>Total amount of pages:</strong> {totalPages}
        </li>
        <li>
          <strong>Rated books:</strong>{' '}
          {ratedBooks.length > 0 ? ratedBooks.length : 'No ratings yet'}
        </li>
        <li>
          <strong>Average rating:</strong> {averageRating ?? 'No ratings yet'}
        </li>
      </ul>
    </div>
  );
}
