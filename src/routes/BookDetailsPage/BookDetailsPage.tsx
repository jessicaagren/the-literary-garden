import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.scss';
import FlowerComponent from '../../components/FlowerComponent/FlowerComponent';

export default function BookDetailsPage() {
  const { bookid } = useParams();
  const [book, setBook] = useState<any>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [edition, setEdition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookid) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${bookid}.json`);
        const data = await res.json();
        setBook(data);

        if (data.authors?.[0]?.author?.key) {
          const authorRes = await fetch(
            `https://openlibrary.org${data.authors[0].author.key}.json`
          );
          const authorData = await authorRes.json();
          setAuthor(authorData.name);
        }

        const editionsRes = await fetch(
          `https://openlibrary.org/works/${bookid}/editions.json?limit=1`
        );
        const editionsData = await editionsRes.json();
        setEdition(editionsData.entries[0]);
      } catch (err) {
        console.error('Error fetching book data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookid]);

  if (isLoading) {
    return (
      <div className='BookDetailsPage__Loading'>
        <FlowerComponent alwaysRotating={true} />
      </div>
    );
  }

  if (!book) {
    return (
      <div className='BookDetailsPage__BookNotFound'>
        <p>Book not found.</p>
      </div>
    );
  }

  const coverId = book.covers?.[0] || edition?.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://placehold.co/200x300?text=No+Cover';

  const description =
    typeof book.description === 'string'
      ? book.description
      : book.description?.value ||
        edition?.description ||
        'Ingen beskrivning tillgänglig.';

  const firstSentence =
    book.first_sentence?.value ||
    edition?.first_sentence?.value ||
    'Ingen första mening tillgänglig.';

  const subjects =
    book.subjects?.length > 0
      ? book.subjects.slice(0, 5).join(', ')
      : 'Inga ämnen tillgängliga';

  return (
    <div className='BookDetailsPage'>
      <img src={coverUrl} alt={`Omslag för ${book.title}`} />
      <div className='BookDetailsPage__Text'>
        <h2>{book.title}</h2>
        {author && (
          <p>
            <strong>Author:</strong> {author}
          </p>
        )}
        {edition?.publish_date && (
          <p>
            <strong>Published:</strong> {edition.publish_date}
          </p>
        )}
        {edition?.number_of_pages && (
          <p>
            <strong>Pages:</strong> {edition.number_of_pages}
          </p>
        )}
        <p>
          <strong>First sentence:</strong> {firstSentence}
        </p>
        <p>
          <strong>Subjects:</strong> {subjects}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
      </div>
    </div>
  );
}
