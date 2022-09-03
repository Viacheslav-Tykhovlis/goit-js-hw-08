// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const blokGallery = document.querySelector('.gallery');
blokGallery.innerHTML = createElements(galleryItems);

function createElements(gallery) {
  const imageElements = gallery
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item"><a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a></li>`
    )
    .join('');
  return imageElements;
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
