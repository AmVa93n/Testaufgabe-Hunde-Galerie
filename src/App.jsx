import './App.css'
import BreedSelect from './components/BreedSelect'
import SubbreedCheckboxes from './components/SubbreedCheckboxes'
import SubbreedsGallery from './components/SubbreedsGallery'
import FavoritesGallery from './components/FavoritesGallery'

function App() {
  return (
    <>
      <h1>Testaufgabe</h1>
      <div>
        <h2>Auswahl Hunderasse</h2>
        <BreedSelect />
      </div>
      
      <div>
        <h2>Gallerie Subrassen</h2>
        <SubbreedCheckboxes />
        <SubbreedsGallery />
      </div>

      <div>
        <h2>Gallerie Favoriten</h2>
        <FavoritesGallery />
      </div>
    </>
  )
}

export default App
