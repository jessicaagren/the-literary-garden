import './BookCard.scss';

export default function BookCard() {
  return (
    <div className='BookCard'>
      <img
        className='BookCard__image'
        src='https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif'></img>
      <p className='BookCard__title'>Title of book</p>
      <p className='BookCard__author'>Author of book</p>
    </div>
  );
}
