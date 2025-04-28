import './BookCard.scss';

interface BookCardProps {
  title: string;
  author: string[]; // Författare som en array
  year: number;
  img?: string;
}

export default function BookCard({ title, author, img, year }: BookCardProps) {
  let formattedAuthors: string;

  if (author.length > 3) {
    formattedAuthors = `${author.slice(0, 3).join(', ')}, etc.`;
  } else if (author.length === 2) {
    formattedAuthors = `${author[0]} & ${author[1]}`;
  } else {
    formattedAuthors = author.join(', ');
  }

  return (
    <div className='BookCard'>
      <img
        className='BookCard__image'
        src={
          img ||
          'https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif'
        }
        alt={title}
      />
      <p className='BookCard__title'>
        {title} ({year})
      </p>
      <p className='BookCard__author'>{formattedAuthors}</p>
    </div>
  );
}
