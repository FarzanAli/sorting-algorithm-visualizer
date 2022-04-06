import React from 'react';
import Button from './button.jsx';
import './header.css';

let Header = (props) => {

    const handleChange = (event) => {
        props.setAlgorithmCallback(event.target.value);
    }

    return(
        <div className='header-container'>
            <div className='title'>Sorting Algorithm Visualizer</div>
            <div className='algorithms-menu'>
                <Button selected={true} name={'Quicksort'} callback={props.setAlgorithmCallback}/>
                <Button name={'Insertion Sort'} callback={props.setAlgorithmCallback}/>
                <Button name={'Selection Sort'} callback={props.setAlgorithmCallback}/>
            </div>
            <select className='algorithms-dropdown' onChange={handleChange}>
                <option defaultValue={props.selectedAlgorithm === "Quicksort" ? true : false}>Quicksort</option>
                <option defaultValue={props.selectedAlgorithm === "Insertion Sort" ? true : false}>Insertion Sort</option>
                <option defaultValue={props.selectedAlgorithm === "Selection Sort" ? true : false}>Selection Sort</option>
            </select>
        </div>
    );
}

export default Header;