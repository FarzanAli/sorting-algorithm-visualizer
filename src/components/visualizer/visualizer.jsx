import React, { useEffect, useState } from 'react';
import './visualizer.css';
import Controls from './controls/controls.jsx';
import { Sorts } from '../sorts.js';

let Visualizer = (props) => {
    const sorts = new Sorts(props.array, props.name, props.playCallback.bind(this), props.setArrayCallback.bind(this));
    const distanceBetweenBars = 15;
    const visualizerWidth = 450;
    const barWidth = 9;
    const frameRefresh = 12 * (1 - props.speed/100);

    let identityRecorded = (record, id) => {
        for (let i = 0; i < record.length; i++) {
            if (record[i].id === id) {
                return true;
            }
        }
        return false;
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

    let moveBars = (record, finalArray) => {
        if (document.getElementsByClassName('bar').length === props.arraySize) {
            let travel = [];
            for(let i = 0; i < record.length; i++){
                const delta = record[i].newIndex - record[i].oldIndex;
                document.getElementById(record[i].id).style.zIndex = 1;
                travel.push({id: record[i].id, target: Math.abs(delta * distanceBetweenBars), delta: delta > 0 ? 1 : -1})
            }

            let targetReached = (travel) => {
                for(let i = 0; i < travel.length; i++){
                    if(travel[i].target > 0){
                        return false;
                    }
                }
                return true;
            }           
            
            let frame = () => {
                let flag = false;
                if(targetReached(travel)){
                    clearInterval(intervalId);
                    props.setArrayCallback(finalArray);
                    clearBars(finalArray);
                }
                if(flag === false){
                    for(let i = 0; i < travel.length; i++){
                        let elem = document.getElementById(travel[i].id);
                        let pos = parseInt(elem.style.marginLeft, 10);
                        if(travel[i].target > 0){
                            if(travel[i].delta > 0){
                                elem.style.marginLeft = (pos + 1).toString() + 'px';
                            }
                            else{
                                elem.style.marginLeft = (pos - 1).toString() + 'px';
                            }
                            travel[i].target -= 1;
                        }
                    }
                }
            }
            let intervalId = setInterval(frame, frameRefresh);
        }
    }

    let clearBars = (bars) => {
        for(let i = 0; i < bars.length; i++){
            document.getElementById(bars[i][0]).style.marginLeft = (i * 15).toString() + 'px';
            document.getElementById(bars[i][0]).style.zIndex = 0;
        }
    }

    let maxTime = (record) => {
        let max = 0;
        for(let i = 0; i < record.length; i++){
            if(Math.abs(record[i].newIndex - record[i].oldIndex) > max){
                max = Math.abs(record[i].newIndex - record[i].oldIndex)
            }
        }
        //Max distance traveled in given step (px)
        max = max * distanceBetweenBars;

        //Time taken to travel max distance
        max = max * frameRefresh;
        return max;
    }

    let startSort = () => {
        if (props.playing === false) {
            sorts.sortHandler();            
            let steps = sorts.getSteps();
            let wait = 0;
            let i = 1;
            let progress = () => {
                if(i < steps.length){
                    let record = checkChange(steps[i - 1], steps[i]);
                    wait = maxTime(record);
                    moveBars(record, steps[i]);
                    i++;
                    setTimeout(progress, wait);
                }
                else{
                    props.playCallback();
                }
            }
            setTimeout(progress, wait);
        }
        props.playCallback();
    }
    return (
        <div style={{ display: 'inline' }}>
            <div className='visualizer-container' style={{ width: visualizerWidth.toString() + 'px' }}>
                <div className='bar-container'>
                    {props.array.map((value, idx) =>
                        <div
                            className='bar'
                            id={value[0]}
                            key={idx}
                            style={{
                                position: 'absolute',
                                display: 'inline-block',
                                marginLeft: (idx * 15).toString() + 'px',
                                height: value[1].toString() + 'px',
                                width: barWidth,
                                backgroundColor: value[2] === '' ? '#222222' : value[2],
                                borderRadius: '2px 2px 0px 0px',
                                zIndex: 0
                            }}
                        ></div>
                    )}
                </div>
            </div>
            <Controls
                startSort={() => startSort}
                playing={props.playing}
                resetCallback={() => props.resetCallback}
                speedCallback={() => props.speedCallback}
                speed={props.speed}
                arraySize={props.arraySize}
                sizeCallback={() => props.sizeCallback}
            />
        </div>
    );
}

export default Visualizer;