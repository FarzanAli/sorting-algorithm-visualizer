import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header/header.jsx';
import Visualizer from './components/visualizer/visualizer.jsx';
import Information from './components/information/information.jsx';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            algorithmName: "Quicksort",
            array: [],
            arraySize: 4,
            playing: false
        }
    }

    componentDidMount(){
        this.resetCallback();
    }

    setAlgorithmCallback(name){
        if(name !== this.state.algorithm){
            this.setState({algorithmName: name}, () => {console.log(this.state.algorithmName)});
        }
    }

    setArrayCallback(arr){
        this.setState({array: arr}, () => {console.log(this.state.array)});
    }

    resetCallback(){
        let arr = []
        for(let i = 0; i < this.state.arraySize; i++){
            arr.push([i, Math.floor((Math.random() * 300) + 10)]);
        }
        // this.setState({array: arr});
        this.setState({array: [[0, 30], [1, 40], [2, 10], [3, 20]]});
    }

    playCallback(){
        this.setState({playing: !this.state.playing});
    }

    render(){
        return(
            <div className='main-container'>
                <Header
                algorithmName={this.state.algorithmName}
                setAlgorithmCallback={this.setAlgorithmCallback.bind(this)}
                />
                <div className='main-content'>
                    <Information
                    name={this.state.algorithmName}
                    />
                    <Visualizer
                    array={this.state.array}
                    name={this.state.algorithmName}
                    arraySize={this.state.arraySize}
                    resetCallback={this.resetCallback.bind(this)}
                    playCallback={this.playCallback.bind(this)}
                    playing={this.state.playing}
                    setArrayCallback={this.setArrayCallback.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)