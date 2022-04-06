import React from 'react';
import './information.css';
import Chart from './chart.js';


let Information = (props) => {
    return (
        <div className='information-container'>
            {props.name}
            {props.name === 'Quicksort' && <Chart className='chart-container' label={'O(Nlog(N))'} function={(i) => {return i*Math.log10(i)}}/>}
            {props.name === 'Insertion Sort' && <Chart label={'O(N²)'} function={(i) => {return (i*i)}}/>}
            {props.name === 'Selection Sort' && <Chart label={'O(N²)'} function={(i) => {return (i*i)}}/>}
        </div>
    );
}

export default Information;