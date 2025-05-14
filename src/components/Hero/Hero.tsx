import Button from '../Button/Button';
import './Hero.scss';

export default function Hero() {
  return (
    <div className='Hero'>
      <Button title='Browse' to='/browse' className='Button__HomePage' />
    </div>
  );
}
