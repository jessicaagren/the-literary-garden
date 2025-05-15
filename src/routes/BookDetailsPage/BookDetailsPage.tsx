import { useParams } from 'react-router-dom';
import { useEffect, useState, KeyboardEvent } from 'react';
import FlowerComponent from '../../components/FlowerIcon/FlowerIcon';
import FavouritesButton from '../../components/FavouritesButton/FavouritesButton';
import ReadButton from '../../components/ReadButton/ReadButton';
import StarRating from '../../components/StarRating/StarRating';
import { useBooksContext } from '../../contexts/BooksContext';
import { BookType } from '../../types/BookType';
import { BookEditionType } from '../../types/BookEditionType';
import './BookDetailsPage.scss';

export default function BookDetailsPage() {
  const { bookid } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  const [edition, setEdition] = useState<BookEditionType | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentComment, setCurrentComment] = useState('');

  const { state, dispatch } = useBooksContext();
  const bookKey = book ? book.key : `/works/${bookid}`;
  const savedComments = Array.isArray(state.comments[bookKey])
    ? state.comments[bookKey]
    : [];

  useEffect(() => {
    if (!bookid) return;

    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const bookRes = await fetch(
          `https://openlibrary.org/works/${bookid}.json`
        );
        if (!bookRes.ok) throw new Error('Book response not OK');
        const bookData: BookType = await bookRes.json();

        const editionRes = await fetch(
          `https://openlibrary.org/works/${bookid}/editions.json?limit=1`
        );
        if (!editionRes.ok) throw new Error('Edition response not OK');
        const editionData = await editionRes.json();
        const firstEdition = editionData.entries?.[0] ?? null;

        const authorKeys = bookData.authors?.map((a) => a?.author?.key) || [];
        const authorData = await Promise.all(
          authorKeys.map((key) =>
            fetch(`https://openlibrary.org${key}.json`).then((res) => {
              if (!res.ok) throw new Error('Author fetch failed');
              return res.json();
            })
          )
        );

        setBook(bookData);
        setEdition(firstEdition);
        setAuthors(authorData.map((a) => a?.name || 'Unknown'));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load book details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [bookid]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && currentComment.trim()) {
      e.preventDefault();
      dispatch({
        type: 'SET_COMMENT',
        payload: { bookKey, comment: currentComment.trim() },
      });
      setCurrentComment('');
    }
  };

  if (isLoading) {
    return (
      <div className='BookDetailsPage__Loading'>
        <FlowerComponent alwaysRotating />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className='BookDetailsPage__BookNotFound'>
        <p>{error || 'Book not found.'}</p>
      </div>
    );
  }

  // --- Utility functions ---
  const formattedAuthors =
    authors.length === 0
      ? 'Unknown author'
      : authors.length === 2
      ? `${authors[0]} & ${authors[1]}`
      : authors.join(', ');

  const coverId = (book.cover_i || book.covers?.[0]) as number | undefined;
  const img = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://placehold.co/200x300?text=Cover+unavailable';

  const extractValue = (field?: string | { value?: string }): string | null =>
    typeof field === 'string' ? field : field?.value ?? null;

  const infoItems = [
    { label: 'Author', value: formattedAuthors },
    { label: 'Published', value: edition?.publish_date ?? null },
    { label: 'Pages', value: edition?.number_of_pages?.toString() ?? null },
    { label: 'Genre', value: book.genre?.slice(0, 5).join(', ') ?? null },
    { label: 'Subjects', value: book.subjects?.slice(0, 5).join(', ') ?? null },
    {
      label: 'First sentence',
      value:
        extractValue(book.first_sentence) ||
        extractValue(edition?.first_sentence),
    },
    {
      label: 'Description',
      value:
        extractValue(book.description) || extractValue(edition?.description),
    },
  ];

  return (
    <div className='BookDetailsPage'>
      <div className='BookDetailsPage__ImageWrapper'>
        <FavouritesButton book={{ key: book.key }} />
        <img src={img} alt={`Omslag för ${book.title}`} />
        <div className='BookDetailsPage__ImageWrapper__ButtonWrapper'>
          <ReadButton
            book={{ ...book, number_of_pages: edition?.number_of_pages }}
          />
          <StarRating bookKey={book.key} />
        </div>
      </div>

      <div className='BookDetailsPage__Text'>
        <h2>{book.title}</h2>
        {infoItems.map(({ label, value }) => (
          <p key={label}>
            <span>{label}:</span> {value || 'Not available'}
          </p>
        ))}

        <div className='BookDetailsPage__Comment'>
          <label htmlFor='comment'>
            <span>Your comment:</span>
          </label>
          <textarea
            id='comment'
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Press Enter to save...'
          />
          {savedComments.length > 0 && (
            <div className='BookDetailsPage__Comment__List'>
              <span>Comments:</span>
              <ul>
                {savedComments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
