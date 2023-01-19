import { useState, useEffect } from 'react';
import { fetchPhoto } from 'services/FetchApiPixelby';

import css from '../style/styles.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [perPage] = useState(12);
  const [searchWord, setSerchWord] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    const addPhoto = async () => {
      const photos = await fetchPhoto(searchWord, perPage, page);
      console.log(photos);
      setPhotos(photos.hits);
    };
    if (searchWord !== '') {
      addPhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);
  useEffect(() => {
    const loadMorePhoto = async () => {
      setLoading(true);
      const morePhoto = await fetchPhoto(searchWord, perPage, page);
      const allPhoto = photos.concat(morePhoto.hits);
      const maxPage = morePhoto.totalHits;

      setDisableBtn(handleDisablePageOf(maxPage));

      setPhotos(allPhoto);
    };
    if (page !== 1) {
      loadMorePhoto();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function searchWordInput(e) {
    e.preventDefault();
    setLoading(true);
    setSerchWord(e.target.searchWord.value);
    setLoading(false);
  }

  const loadMore = async () => {
    setPage(page + 1);
  };

  const showModal = e => {
    if (e.target.nodeName === 'IMG') {
      setModalData({
        url: e.target.dataset.photo,
        alt: e.target.alt,
      });
      setModal(true);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleDisablePageOf = maxPage => {
    return maxPage / perPage >= page;
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchWordInput} />
      <ImageGallery photos={photos} handleShowModal={showModal} />
      {photos.length && <Button onActive={disableBtn} loadMore={loadMore} />}
      {loading && <Loader />}

      {modal && <Modal closeModal={closeModal} photoUrl={modalData} />}
    </div>
  );
};
