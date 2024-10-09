import { useContext } from 'react';
import { StateContext } from '../context/StateProvider';
import checkboxOpen from '../assets/checkbox_open.svg';
import checkboxDone from '../assets/checkbox_done.svg';

function SubbreedCheckboxes() {
    const { subbreeds, checkedSubbreeds, setCheckedSubbreeds, capitalize } = useContext(StateContext);

    function handleToggle(subbreed) {
        if (checkedSubbreeds.includes(subbreed)) { // if subbreed was already checked
            if (checkedSubbreeds.length === 1) return // force at least 1 checked box at a time
            setCheckedSubbreeds(prev => prev.filter((checkedSubbreed) => checkedSubbreed !== subbreed));
        } else {
            setCheckedSubbreeds(prev => [...prev, subbreed]);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap'}}>
            {subbreeds.map((subbreed) => (
                <div key={subbreed} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        id={subbreed}
                        value={subbreed}
                        checked={checkedSubbreeds.includes(subbreed)}
                        onChange={() => handleToggle(subbreed)}
                        style={{ display: 'none' }} // hide the default checkbox
                    />
                    <img
                        src={checkedSubbreeds.includes(subbreed) ? checkboxDone : checkboxOpen}
                        alt={checkedSubbreeds.includes(subbreed) ? 'Checked' : 'Unchecked'}
                        onClick={() => handleToggle(subbreed)} // toggle on image click
                        style={{ cursor: 'pointer', width: '24px', marginRight: '5px', marginLeft: '15px' }}
                    />
                    <label htmlFor={subbreed} style={{ cursor: 'pointer', color: "#004177" }}>{capitalize(subbreed)}</label>
                </div>
            ))}
        </div>
    )
}

export default SubbreedCheckboxes