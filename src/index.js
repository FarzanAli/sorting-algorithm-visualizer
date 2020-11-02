import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SortingVis extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < 200; i++){
            array.push(randomInt(5, 730));
        }
        this.setState({array});
    }

    render(){
        const {array} = this.state;
        const mappedArray = array.map((value, idx) => (
            <div className = "array-bar" key={idx} style={{height: `${value}px`}}></div>
        ))
        return(
            <div className = "array-container">
                {mappedArray}
            </div>
        );
    }
}

function randomInt(a, b){
    return Math.floor(a + Math.random() * (1 + b - a));
}

ReactDOM.render(
    <SortingVis/>,
    document.getElementById('root')
)