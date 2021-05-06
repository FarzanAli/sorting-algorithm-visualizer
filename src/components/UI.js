import React, {Component} from 'react';

export default class UI extends Component{
    render(){

        return(
            <div className="ui-container">
                <div className="size-container">
                    <label for="size" id="sizeLabel">Size:</label>
                    <input type="number" className="sizeInput" value={this.props.size} onChange={this.props.updateSearch} />
                </div>
                <button className="button" onClick={this.props.resetArray}>New Array</button>
                <button className="button" onClick={this.props.iterateSteps}>Quick Sort</button>
            </div>
        );
    }
}