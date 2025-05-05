import './FlowerComponent.scss';

type FlowerComponentProps = {
  alwaysRotating?: boolean;
};

export default function FlowerComponent({
  alwaysRotating = false,
}: FlowerComponentProps) {
  return (
    <img
      src='src/assets/media/favicon.svg'
      alt='Flower'
      className={`FlowerComponent${alwaysRotating ? ' rotate-always' : ''}`}
    />
  );
}
