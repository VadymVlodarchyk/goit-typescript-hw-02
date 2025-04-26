import { useState, useEffect } from 'react';
import { fetchImages, Image } from './services/api';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';

export const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const getImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchImages(query.trim());
        setImages(data);
      } catch (error) {
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
  };

  const handleImageClick = (largeImageURL: string) => {
    setSelectedImage(largeImageURL);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};
