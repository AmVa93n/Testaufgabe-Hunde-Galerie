import { useContext } from 'react';
import { StateContext } from '../context/StateProvider';
import deleteIcon from '../assets/delete.svg';

function FavoritesGallery() {
    const { favorites, setFavorites } = useContext(StateContext);

    function handleRemoveFavorite(image) {
        const updatedFavorites = favorites.filter(fav => fav !== image);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {favorites.map((favorite, index) => (
                <div key={index} style={{ position: 'relative', width: '300px', height: '200px' }}>
                    <img
                        src={favorite}
                        alt={`favorite-${index}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <img
                        src={deleteIcon}
                        alt="delete-icon"
                        onClick={() => handleRemoveFavorite(favorite)}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            cursor: 'pointer',
                            width: '24px',
                            height: '24px',
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default FavoritesGallery