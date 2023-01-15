import { Component } from 'react';

import { fetchPhoto } from 'services/FetchApiPixelby';

import css from '../style/styles.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchWord: '',
    page: 1,
    photos: [],
    isLoading: false,
    modal: false,
    modalData: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;
    const photos = await fetchPhoto(searchWord, page);

    if (prevState.searchWord !== searchWord) {
      this.setState({ photos });
    }
  }

  searchWord = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const searchWord = e.target.searchWord.value;
    this.setState({
      searchWord,
    });
    this.setState({ isLoading: false });
  };

  loadMore = () => {
    this.setState({ isLoading: true });
    this.setState({ page: this.state.page + 1 }, async () => {
      const { searchWord, page, photos } = this.state;
      const morePhoto = await fetchPhoto(searchWord, page);
      this.setState({ photos: photos.concat(morePhoto) });
    });
    this.setState({ isLoading: false });
  };

  showModal = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({
        modalData: {
          url: e.target.dataset.photo,
          alt: e.target.alt,
        },
      });
      this.setState({ modal: true });
    }
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { isLoading, photos, modal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchWord} />
        <ImageGallery
          photos={this.state.photos}
          handleShowModal={this.showModal}
        ></ImageGallery>
        {photos.length && <Button loadMore={this.loadMore} />}
        {isLoading && <Loader />}

        {modal && (
          <Modal closeModal={this.closeModal} photoUrl={this.state.modalData} />
        )}
      </div>
    );
  }
}
