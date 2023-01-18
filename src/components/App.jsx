import { useState, useEffect } from 'react';
import { fetchPhoto } from 'services/FetchApiPixelby';

import css from '../style/styles.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [searchWord, setSerchWord] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const addPhoto = async () => {
      const photos = await fetchPhoto(searchWord, 1);
      setPhotos(photos);
    };
    if (searchWord !== '') {
      addPhoto();
    }
  }, [searchWord]);
  useEffect(() => {
    const morePhoto = async () => {
      setLoading(true);
      const morePhoto = await fetchPhoto(searchWord, page);
      const allPhoto = photos.concat(morePhoto);
      setPhotos(allPhoto);
    };
    if (page !== 1) {
      morePhoto();
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

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchWordInput} />
      <ImageGallery photos={photos} handleShowModal={showModal}></ImageGallery>
      {photos.length && <Button loadMore={loadMore} />}
      {loading && <Loader />}

      {modal && <Modal closeModal={closeModal} photoUrl={modalData} />}
    </div>
  );
};
