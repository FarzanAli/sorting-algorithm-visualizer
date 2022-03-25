import React, {useState} from 'react';
import './visualizer.css';
import Controls from './controls.jsx';

let Visualizer = (props) => {
    
    const visualizerWidth= 450;
    const barWidth = 9;

    return(
        <div style={{display: 'inline'}}>
            <div className='visualizer-container' style={{width: visualizerWidth.toString() + 'px'}}>
                <div className='bar-container'>
                    {props.array.map((value, idx) => 
                        <div
                        className='bar'
                        key={idx}
                        style={{
                                display: 'inline-block',
                                margin: '3px',
                                height: value.toString() + 'px',
                                width: barWidth,
                                backgroundColor: '#222222',
                                borderRadius: '2px 2px 0px 0px'        
                            }}
                        ></div>
                    )}
                </div>
            </div>
            <Controls
            reset={() => props.reset}
            />
        </div>
    );
}

export default Visualizer;