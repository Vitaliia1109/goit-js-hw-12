// main.js

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import { showError, clearGallery, renderImages } from "./js/render-functions.js";

const form = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
let page = 1;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = form.querySelector('input').value.trim();
    if (!query) {
        showError('Please enter a search query');
        return;
    }

    loader.style.display = 'block';

    try {
        const images = await searchImages(query, page);
        if (images.length === 0) {
            clearGallery();
            showError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            clearGallery();
            renderImages(images);
            page = 1;
            loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loader.style.display = 'none';
    }
});

async function searchImages(query, page) {
    const apiKey = '42739945-76af92f6f6e2beeeb6ab8bd95';
    const perPage = 15;
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Failed to fetch images');
        }
        return response.data.hits;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}

// Load more button functionality
const loadMoreBtn = document.querySelector('#load-more-btn');
loadMoreBtn.addEventListener('click', async () => {
    const query = form.querySelector('input').value.trim();
    if (!query) {
        clearGallery();
        showError('Please enter a search query');
        return;
    }

    loader.style.display = 'block';

    try {
        page++;
        const images = await searchImages(query, page);
        if (images.length === 0) {
            loadMoreBtn.style.display = 'none';
            showError("We're sorry, but you've reached the end of search results.");
        } else {
            // loadMoreBtn.style.display = 'none';
            renderImages(images);
            scrollToNextPage();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loader.style.display = 'none';
    }
});

// Scroll to next page after loading more images
function scrollToNextPage() {
    const cardHeight = document.querySelector('.card').offsetHeight;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}