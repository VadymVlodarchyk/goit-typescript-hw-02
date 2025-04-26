export interface Image {
  id: number;
  webformatURL: string;
  largeImageURL: string;
}

interface ApiResponse {
  hits: Image[];
}

export const fetchImages = async (query: string): Promise<Image[]> => {
  const API_KEY = '48269176-9eacf4bd75a8a580043143bd0';
  const BASE_URL = 'https://pixabay.com/api/';

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data: ApiResponse = await response.json();
  return data.hits;
};
