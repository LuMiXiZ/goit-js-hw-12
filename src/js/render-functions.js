import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const moreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery-item a', {
  scrollZoom: 0,
  disableScroll: 1,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}"  loading="lazy"></a>
            <div class="image-info">
                <div class="info-list">
                    <span class="info-title">Likes</span>
                    <span class="info-value">${likes}</span>
                </div>
                <div class="info-list">
                    <span class="info-title">Views</span>
                    <span class="info-value">${views}</span>
                </div>
                <div class="info-list">
                    <span class="info-title">Comments</span>
                    <span class="info-value">${comments}</span>
                </div>
                <div class="info-list">
                    <span class="info-title">Downloads</span>
                    <span class="info-value">${downloads}</span>
                </div>
            </div>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  moreBtn.classList.remove('hidden');
}
export function hideLoadMoreButton() {
  moreBtn.classList.add('hidden');
}
