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
            algorithm: "Quicksort"
        }
    }

    setAlgorithmCallback(name){
        if(name !== this.state.algorithm){
            this.setState({algorithm: name}, () => {console.log(this.state.algorithm)});
        }
    }

    render(){
        return(
            <div className='main-container'>
                <Header
                selectedAlgorithm={this.state.algorithm}
                setAlgorithmCallback={this.setAlgorithmCallback.bind(this)}
                />
                <div className='main-content'>
                    <Visualizer />
                    <Information
                    name={this.state.algorithm}
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