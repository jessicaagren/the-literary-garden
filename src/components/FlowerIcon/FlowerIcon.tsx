import './FlowerIcon.scss';
import flowerImg from '../../assets/media/favicon.svg';

type FlowerIconProps = {
  alwaysRotating?: boolean;
};

export default function FlowerIcon({
  alwaysRotating = false,
}: FlowerIconProps) {
  return (
    <img
      src={flowerImg}
      alt='Flower'
      className={`FlowerComponent${alwaysRotating ? ' rotate-always' : ''}`}
    />
  );
}
