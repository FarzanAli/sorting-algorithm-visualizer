import React, {Component} from 'react';

export default class UI extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <label for="size">Size: </label>
            <input type="number" id="size" value={this.props.size} onChange={this.props.updateSearch} />
            <button onClick={this.props.resetArray}>New Array</button>
            <button onClick={() => this.props.iterateSteps()}>Quick Sort</button>
            </>
        );
    }
}