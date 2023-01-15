import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ alt, src, largeFormat }) => {
  return (
    <li className={css.galleryItem}>
      <img
        data-photo={largeFormat}
        className={css.ImageGalleryItemImage}
        src={src}
        alt={alt}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  largeFormat: PropTypes.string,
};
export default ImageGalleryItem;
