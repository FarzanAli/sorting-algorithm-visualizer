import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header/header.jsx';
import Visualizer from './components/visualizer/visualizer.jsx';
import Information from './components/Information/information.jsx';
import { Container, Box } from '@mui/material';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            algorithmName: "Quicksort",
            array: [],
            arraySize: 15,
            playing: false,
            speed: 3
        }
    }

    componentDidMount(){
        this.resetCallback();
    }

    setAlgorithmCallback(name){
        if(name !== this.state.algorithm){
            this.setState({algorithmName: name}, () => {console.log(this.state.algorithmName)});
            this.resetCallback();
        }
    }

    setArrayCallback(arr){
        this.setState({array: arr});
    }

    resetCallback(){
        let arr = []
        for(let i = 0; i < this.state.arraySize; i++){
            arr.push([i, Math.floor((Math.random() * 300) + 10), '']);
        }
        // this.setState({array: [[0, 20, ''], [1, 10, ''], [2, 40, ''], [3, 30, ''], [4, 45, ''], [5, 60, ''], [6, 90, ''], [7, 60, ''], [8, 70, '']]});
        this.setState({array: arr});
    }

    playCallback(){
        this.setState({playing: !this.state.playing}, () => {console.log(this.state.playing)});
    }

    speedCallback(value){
        this.setState({speed: value.target.value});
    }

    sizeCallback(value){
        this.setState({arraySize: value.target.value});
        
    }

    render(){
        return(
            <div className='main-container'>
                <Header
                algorithmName={this.state.algorithmName}
                setAlgorithmCallback={this.setAlgorithmCallback.bind(this)}
                />
                <Container maxWidth="md" sx={{marginTop: '100px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Information
                        name={this.state.algorithmName}
                        />
                        <Visualizer
                        array={this.state.array}
                        name={this.state.algorithmName}
                        arraySize={this.state.arraySize}
                        sizeCallback={this.sizeCallback.bind(this)}
                        resetCallback={this.resetCallback.bind(this)}
                        playCallback={this.playCallback.bind(this)}
                        playing={this.state.playing}
                        setArrayCallback={this.setArrayCallback.bind(this)}
                        speed={this.state.speed}
                        speedCallback={this.speedCallback.bind(this)}
                        />
                    </Box>
                </Container>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)