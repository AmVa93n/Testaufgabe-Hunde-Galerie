/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const StateContext = createContext();

function StateProviderWrapper(props) {
    const [selectedBreed, setSelectedBreed] = useState(''); // tracks currently selected breed
    const [subbreeds, setSubbreeds] = useState([]); // array of subbreeds for currently selected breed
    const [images, setImages] = useState([]); // current image array for all checked subbreeds
    const [checkedSubbreeds, setCheckedSubbreeds] = useState([]); // tracks currently checked subbreeds
    const [favorites, setFavorites] = useState(() => { // load favorites from localStorage
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <StateContext.Provider value={{
            selectedBreed, 
            setSelectedBreed,
            subbreeds, 
            setSubbreeds,
            images,
            setImages,
            checkedSubbreeds, 
            setCheckedSubbreeds,
            favorites,
            setFavorites,
            capitalize,
        }}>
            {props.children}
        </StateContext.Provider>
    );
};

export { StateProviderWrapper, StateContext };