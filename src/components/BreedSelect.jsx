import { useState, useEffect, useContext } from 'react';
import { StateContext } from '../context/StateProvider';
import './BreedSelect.css'
import arrowIcon from '../assets/arrow_down.svg';

function BreedSelect() {
    const [breeds, setBreeds] = useState({}); // array of breed list
    const { selectedBreed, setSelectedBreed, setSubbreeds, setCheckedSubbreeds, capitalize } = useContext(StateContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // track dropdown open state

    useEffect(() => {
        async function fetchBreeds() {
          try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all')
            const data = await response.json()
            setBreeds(data.message)
          } catch (error) {
            console.log(error);
          }
        }
        fetchBreeds()
    }, [])

    function handleSelection(breed) {
        setSelectedBreed(breed)
        setSubbreeds(breeds[breed])
        if (breeds[breed].length > 0 ) { // if breed has sub-breeds
            setCheckedSubbreeds([breeds[breed][0]]) // set the first checkbox to checked by default
        } else {
            setCheckedSubbreeds([]) // clear checkboxes
        }
        setIsDropdownOpen(false); // close dropdown after selection
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="custom-select-wrapper">
                <div className="selected-breed" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {selectedBreed ? capitalize(selectedBreed) : "Alle Hundrasse"}
                    <img 
                        src={arrowIcon} 
                        alt="Dropdown Arrow" 
                        className={`arrow-icon ${isDropdownOpen ? "rotate" : ""}`} 
                    />
                </div>
                {isDropdownOpen && (
                    <ul className="dropdown-list">
                        {Object.keys(breeds).map(breed => (
                            <li key={breed} className="dropdown-item" onClick={() => handleSelection(breed)}>
                                {capitalize(breed)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default BreedSelect