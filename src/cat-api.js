const URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_ad1vmijEOVPFTiHo9j9me8b4EEX1alr9fO8QQHTacok6cTzOEZvwxlw8L143fjKG';

export function fetchBreeds() {
  return fetchData(`/breeds?api_key=${API_KEY}`);
}

export function fetchCatByBreed(breedId) {
  return fetchData(`/images/search?api_key=${API_KEY}&breed_ids=${breedId}`);
}

function fetchData(endpoint) {
  return fetch(`${URL}${endpoint}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
