import css from './ImageGalleryItem.module.css';

interface ImageGalleryItemProps {
  webformatURL: string;
  largeImageURL: string;
  onClick: (largeImageURL: string) => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ webformatURL, largeImageURL, onClick }) => {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img src={webformatURL} alt="" className={css.ImageGalleryItemImage} />
    </li>
  );
};
