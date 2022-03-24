import React from 'react';
import './information.css';

let Information = (props) => {
    return(
        <div className='information-container'>
            {props.name}
        </div>
    );
}

export default Information;