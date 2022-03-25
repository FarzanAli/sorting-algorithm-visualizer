import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { GiPauseButton } from 'react-icons/gi';
import { VscDebugRestart } from 'react-icons/vsc';
import './controls.css';

let Controls = (props) => {
    return(
        <div className='controls-container'>
            {/* <button><BsFillPlayFill style={{width: '100%', height: '100%'}}/></button> */}
            {/* <button><GiPauseButton style={{width: '80%', height: '80%'}}/></button> */}
            <button onClick={props.reset()}><VscDebugRestart style={{width: '80%', height: '80%'}}/></button>
        </div>
    );
}

export default Controls;