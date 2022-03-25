import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header/header.jsx';
import Visualizer from './components/visualizer/visualizer.jsx';
import Information from './components/Information/information.jsx';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            algorithm: "Quicksort",
            array: [],
            arraySize: 30
        }
    }

    componentDidMount(){
        this.resetCallback();
    }

    setAlgorithmCallback(name){
        if(name !== this.state.algorithm){
            this.setState({algorithm: name}, () => {console.log(this.state.algorithm)});
        }
    }

    resetCallback(){
        console.log("a")
        let arr = []
        for(let i = 0; i < this.state.arraySize; i++){
            arr.push(Math.floor((Math.random() * 300) + 10));
        }
        this.setState({array: arr});
    }

    render(){
        return(
            <div className='main-container'>
                <Header
                selectedAlgorithm={this.state.algorithm}
                setAlgorithmCallback={this.setAlgorithmCallback.bind(this)}
                />
                <div className='main-content'>
                    <Information
                    name={this.state.algorithm}
                    />
                    <Visualizer
                    array={this.state.array}
                    arraySize={this.state.arraySize}
                    reset={this.resetCallback.bind(this)}
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