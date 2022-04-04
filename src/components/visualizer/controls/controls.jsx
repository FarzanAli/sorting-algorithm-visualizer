import React, { useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { GiPauseButton } from 'react-icons/gi';
import { VscDebugRestart } from 'react-icons/vsc';
import { BsSpeedometer } from 'react-icons/bs';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './controls.css';

let Controls = (props) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
            },

        },
        thumb:{
            backgroundImage: <BsSpeedometer/>
        }
    })

    return(
        <div className='controls-container'>
            {props.playing === false && <button onClick={props.startSort()}><BsFillPlayFill style={{width: '100%', height: '100%'}}/></button>}
            {props.playing && <button onClick={props.startSort()}><GiPauseButton style={{width: '80%', height: '80%'}}/></button>}
            <button onClick={props.resetCallback()}><VscDebugRestart style={{width: '80%', height: '80%'}}/></button>
            <ThemeProvider theme={theme}>
                <div style={{display: 'flex', alignItems: 'center', paddingLeft: '15px'}}>
                    Speed
                    <Slider sx={{width: '100px', marginLeft: '15px', marginRight: '25px'}} min={1} max={65} color={'primary'} valueLabelDisplay={"auto"} size={'small'} value={props.speed} onChange={props.speedCallback()}/>
                    Size
                    <Slider sx={{width: '100px', marginLeft: '15px'}} min={1} max={30} color={'primary'} valueLabelDisplay={"auto"} size={'small'} value={props.arraySize} onChange={props.sizeCallback()} onChangeCommitted={props.resetCallback()}/>
                </div>
            </ThemeProvider>
            {/* <input type='range' min='1' max='100' onChange={props.speedCallback()} value={props.speed} className='slider' id='myRange'></input> */}
        </div>
    );
}

export default Controls;