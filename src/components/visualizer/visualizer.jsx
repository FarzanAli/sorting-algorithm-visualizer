import React from 'react';
import './visualizer.css';
import Controls from './controls/controls.jsx';
import { Sorts } from '../sorts.js';

let Visualizer = (props) => {

    const sorts = new Sorts(props.array, props.name, props.playCallback.bind(this), props.setArrayCallback.bind(this));
    

    let startSort = () => {
        if(props.playing === false){
            sorts.sortHandler();
        }
        props.playCallback();
    }

    const visualizerWidth = 450;
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
                                height: value[1].toString() + 'px',
                                width: barWidth,
                                backgroundColor: '#222222',
                                borderRadius: '2px 2px 0px 0px'        
                            }}
                        ></div>
                    )}
                </div>
            </div>
            <Controls
            startSort={() => startSort}
            playing={props.playing}
            resetCallback={() => props.resetCallback}
            />
        </div>
    );
}

export default Visualizer;