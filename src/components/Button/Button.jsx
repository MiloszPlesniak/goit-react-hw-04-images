import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
