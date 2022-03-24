import React from 'react';

let Button = (props) => {
    return(
        <button className='algorithm-button' onClick={() => props.callback(props.name)}>{props.name}</button>
    );
}

export default Button;