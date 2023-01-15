import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ photos, handleShowModal }) => {
  
  return (
    <ul onClick={handleShowModal} className={css.ImageGallery}>
      {photos.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            alt={item.tags}
            src={item.webformatURL}
            largeFormat={item.largeImageURL}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  handleShowModal: PropTypes.func,
};
export default ImageGallery;
