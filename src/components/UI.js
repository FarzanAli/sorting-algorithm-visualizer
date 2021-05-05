import React, {Component} from 'react';

export default class UI extends Component{
    render(){
        return(
            <div className="ui-container">
                <input type="number" className="sizeInput" value={this.props.size} onChange={this.props.updateSearch} />
                <button className="button" onClick={this.props.resetArray}>New Array</button>
                <button className="button" onClick={this.props.iterateSteps}>Quick Sort</button>
            </div>
        );
    }
}