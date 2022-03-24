import React from 'react';

let Information = (props) => {
    return(
        <div className='information-container' style={{width: 'fit-content'}}>
            {props.name}
        </div>
    );
}

export default Information;