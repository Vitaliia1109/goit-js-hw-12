export function searchImages(query) {
    const apiKey = '42739945-76af92f6f6e2beeeb6ab8bd95'; // Замініть 'YOUR_API_KEY' на свій унікальний ключ доступу
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            return response.json();
        })
        .then(data => data.hits)
        .catch(error => {
            throw new Error('Failed to fetch images');
        });
}