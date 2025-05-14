import './Footer.scss';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className='Footer'>
      <div className='SocialsIcons'>
        <a href='https://www.linkedin.com/in/jessicaagren/' target='_blank'>
          <BsLinkedin />
        </a>
        <a href='https://github.com/jessicaagren' target='_blank'>
          <BsGithub />
        </a>
      </div>
    </footer>
  );
}
