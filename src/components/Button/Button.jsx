import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ loadMore, onActive }) => {
  console.log(onActive);
  return (
    <div>
      {onActive ? (
        <button onClick={loadMore} className={css.Button}>
          Load more
        </button>
      ) : (
        <p></p>
      )}
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
