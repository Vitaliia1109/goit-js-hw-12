// render-functions.js

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: "topRight"
    });
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <a href="${image.largeImageURL}" data-lightbox="image">
                <img src="${image.webformatURL}" alt="${image.tags}">
            </a>
            <div class="details">
                <span>Likes: ${image.likes}</span>
                <span>Views: ${image.views}</span>
                <span>Comments: ${image.comments}</span>
                <span>Downloads: ${image.downloads}</span>
            </div>
        `;
        gallery.appendChild(card);
    });

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}