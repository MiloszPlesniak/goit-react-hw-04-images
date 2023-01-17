import PropTypes from 'prop-types';
import { useEffect } from 'react';

import css from './Modal.module.css';

const Modal = ({ closeModal, photoUrl }) => {
  const handleCheckClick = () => {
    closeModal();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleCheckKey);
    return () => {
      window.removeEventListener('keydown', handleCheckKey);
    };
  });

  const handleCheckKey = e => {
    if (e.code === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', handleCheckKey);
    }
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', handleCheckKey);
  // }

  return (
    <div onClick={handleCheckClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={photoUrl.url} alt={photoUrl.alt} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func,
  photoUrl: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export default Modal;
