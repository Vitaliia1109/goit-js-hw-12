import axios from 'axios';

const apiKey = '42739945-76af92f6f6e2beeeb6ab8bd95';

export async function searchImages(query, page = 1) {
    try {
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
        const response = await axios.get(url);
        return response.data.hits;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}