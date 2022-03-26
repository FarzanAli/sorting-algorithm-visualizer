import React from 'react';
import './visualizer.css';
import Controls from './controls/controls.jsx';
import { Sorts } from '../sorts.js';

let Visualizer = (props) => {

    const sorts = new Sorts(props.array, props.name, props.playCallback.bind(this), props.setArrayCallback.bind(this));
    let array1 = [[0, 30], [1, 40], [2, 10], [3, 20]];
    let array2 = [[1, 40], [0, 30], [2, 10], [3, 20]];

    let identityRecorded = (record, id) => {
        for (let i = 0; i < record.length; i++) {
            if (record[i].id === id) {
                return true;
            }
        }
        return false;
    }

    if(document.getElementById(0) != null){
        document.getElementById(0).classList.add("moving");
    }

    let checkChange = (a1, a2) => {
        let record = []
        for (let i = 0; i < a1.length; i++) {
            if (a1[i][0] !== a2[i][0] && identityRecorded(record, a1[i][0]) === false) {
                for (let j = 0; j < a2.length; j++) {
                    if (a2[j][0] === a1[i][0]) {
                        record.push({
                            id: a1[i][0],
                            oldIndex: i,
                            newIndex: j
                        });
                    }
                }
            }
        }
        return record;
    }

    let startSort = () => {
        if (props.playing === false) {
            sorts.sortHandler();
        }
        props.playCallback();
    }

    const visualizerWidth = 450;
    const barWidth = 9;

    return (
        <div style={{ display: 'inline' }}>
            <div className='visualizer-container' style={{ width: visualizerWidth.toString() + 'px' }}>
                <div className='bar-container'>
                    {array1.map((value, idx) =>
                        <div
                            className='bar'
                            id={value[0]}
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