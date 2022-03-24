import React, {useState} from 'react';
import './visualizer.css';

let Visualizer = (props) => {
    const [array, setArray] = useState([10,20]);
    
    return(
        <div className='visualizer-container'>
            <div className='bar-container'>
                {array.map((value, idx) => 
                    <div
                    className='bar'
                    key={idx}
                    style={{
                            display: 'inline-block',
                            margin: '3px',
                            height: value.toString() + 'px',
                            width: '8px',
                            backgroundColor: 'black'            
                        }}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default Visualizer;