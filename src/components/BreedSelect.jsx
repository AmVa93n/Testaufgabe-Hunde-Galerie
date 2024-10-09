import { useState, useEffect, useContext } from 'react';
import { StateContext } from '../context/StateProvider';

function BreedSelect() {
    const [breeds, setBreeds] = useState({}); // array of breed list
    const { selectedBreed, setSelectedBreed, setSubbreeds, setCheckedSubbreeds, capitalize } = useContext(StateContext);

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

    function handleSelection(e) {
        setSelectedBreed(e.target.value)
        setSubbreeds(breeds[e.target.value])
        if (breeds[e.target.value].length > 0 ) { // if breed has sub-breeds
            setCheckedSubbreeds([breeds[e.target.value][0]]) // set the first checkbox to checked by default
        } else {
            setCheckedSubbreeds([]) // clear checkboxes
        }
    }

    return (
        <select value={selectedBreed} onChange={handleSelection}>
            {Object.keys(breeds).map(breed => (
                <option key={breed} value={breed}>{capitalize(breed)}</option>
            ))}  
        </select>
    )
}

export default BreedSelect