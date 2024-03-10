// main.js

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImages } from "./js/pixabay-api.js";
import { showError, clearGallery, renderImages } from "./js/render-functions.js";

const form = document.querySelector('#search-form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const query = form.querySelector('input').value.trim();
    if (!query) {
        showError('Please enter a search query');
        return;
    }

    loader.style.display = 'block';

    searchImages(query)
        .then(images => {
            if (images.length === 0) {
                clearGallery();
                showError('Sorry, there are no images matching your search query. Please try again!');
            } else {
                clearGallery(); 
                renderImages(images);
            }
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => {
            loader.style.display = 'none';
        });
});