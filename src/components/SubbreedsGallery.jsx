import { useEffect, useContext, useState } from 'react';
import { StateContext } from '../context/StateProvider';
import favoriteOutline from '../assets/favorite.svg';
import favoriteFill from '../assets/favorite_fill.svg';

function SubbreedsGallery() {
    const { selectedBreed, checkedSubbreeds, images, setImages, favorites, setFavorites } = useContext(StateContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFavorited = favorites.includes(images[currentIndex]); // check if the current image is favorited

    useEffect(() => {
        async function fetchImages() {
          const newImages = [];
          if (checkedSubbreeds.length > 0) { // if breed has subreeds
            for (let subbreed of checkedSubbreeds) {
              try {
                const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/${subbreed}/images`);
                const data = await response.json();
                if (data.status === "success") {
                  newImages.push(...data.message); // add fetched images to the array
                }
              } catch (error) {
                console.error('Error fetching images:', error);
              }
            }
          } else { // if breed has no subbreeds
            try {
              const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
              const data = await response.json();
              if (data.status === "success") {
                newImages.push(...data.message); // add fetched images to the array
              }
            } catch (error) {
              console.error('Error fetching images:', error);
            }
          }
          setImages(newImages);
          const index = Math.floor(Math.random() * newImages.length) 
          setCurrentIndex(index); // pick a random image whenever new images are fetched
        };
    
        fetchImages();
    }, [selectedBreed, checkedSubbreeds]);

    function handleNextImage() {
      if (currentIndex < images.length - 1) {
          setCurrentIndex(prev => prev + 1);
      }
    };

    function handlePreviousImage() {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    function addToFavorites() {
      if (!isFavorited) { // add image if it's not already in favorites
          const updatedFavorites = [...favorites, images[currentIndex]];
          setFavorites(updatedFavorites);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    };

    const buttonStyle = {
      width: '48%',
      height: '40px',
      marginTop: '20px',
      borderRadius: '8px',
      border: '2px solid #004177',
    }

    return (
      <div style={{ width: '600px', height: '470px' }}>
        {images.length > 0 && 
        <>
          <div style={{ position: 'relative', width: '600px', height: '400px' }}>
            <img alt='randomImage' src={images[currentIndex]} style={{width: '100%', height: '100%'}}/>
            <img
                src={isFavorited ? favoriteFill : favoriteOutline}
                alt="Favorite"
                onClick={addToFavorites}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 48,
                    height: 48,
                    cursor: 'pointer',
                }}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={handlePreviousImage} style={buttonStyle} disabled={currentIndex === 0}>Vorheiges Bild</button>
              <button onClick={handleNextImage} style={buttonStyle} disabled={currentIndex === images.length - 1}>Nächstes Bild</button>
          </div>
          
        </>}
      </div>
    )
}

export default SubbreedsGallery