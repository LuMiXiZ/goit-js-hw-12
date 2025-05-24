import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import errorIcon from '/img/err.svg';

const input = document.querySelector('input');
const form = document.querySelector('.form');
const moreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';
let totalHits = 0;
let loadedImagesCount = 0;

function showWarning(message) {
  iziToast.warning({
    message,
    iconUrl: errorIcon,
    iconColor: '#fff',
    messageColor: '#fff',
    position: 'topRight',
    messageSize: '16px',
    backgroundColor: '#EF4040',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const requestKey = input.value.trim();
  if (!requestKey) {
    showWarning('Please enter a search query.');
    return;
  }
  searchQuery = requestKey;
  page = 1;
  loadedImagesCount = 0;
  hideLoadMoreButton();
  clearGallery();
  showLoader();
  try {
    const gallery = await getImagesByQuery(requestKey, page);
    totalHits = gallery.totalHits;
    if (totalHits === 0) {
      showWarning(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoader();
    } else {
      createGallery(gallery.hits);
      loadedImagesCount += gallery.hits.length;
      hideLoader();
      showLoadMoreButton();
      input.value = '';
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
    console.log('Error: ', error);
    hideLoader();
  }
});

moreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const gallery = await getImagesByQuery(searchQuery, page);
    createGallery(gallery.hits);
    loadedImagesCount += gallery.hits.length;
    hideLoader();
    scrollGallery();
    if (loadedImagesCount >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
    console.error('Load More Error:', error);
    hideLoader();
  }
});

function scrollGallery() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
