import axios from 'axios';

const apiKey = '50343386-d607faa181041591c9bde8ad6';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: query,
    page: page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const response = await axios.get(`?${searchParams}`);
  return response.data;
}
