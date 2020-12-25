import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SortingVis extends React.Component{
    constructor(props){
        super(props);
 
        this.state = {
            array: [],
            test: [],
            size: 0
        };
    }

    componentDidMount(){
        this.resetArray(this.state.size);
    }

    resetArray(){
        let array = [];
        for(let i = 0; i < this.state.size; i++){
            array.push(randomInt(5, 730));
        }

        let test = []
        for(let i = 0; i < array.length; i++){
            test.push(array[i])
        }
        test.sort(function(a, b) {
            return a - b;
        });

        this.setState({array, test})    
    }

    addToArray(l, c){
        if(typeof(c) === "object"){
            for(let i = 0; i < c.length; i++){
                l.push(c[i])
            }
        }
        else if(typeof(c) === "number"){
            l.push(c)
        }
        return l
    }

    quickSortHandler(e, t){
        if(e !== e.sort){
            let l = this.quickSort(e)
            
            if(JSON.stringify(l) === JSON.stringify(t)){
                this.setState({
                    array: l
                })
            }
            else{console.log(this.state, l)}
        }
    }

    quickSort(e){
        let l = []
        for(let i = 0; i < e.length; i++){
            l.push(e[i])
        }
        if(l.length === 1 || l.length === 0 || typeof(l) === "number"){
            return l
        }

        let pivot = l[0];
        let lesser = [];
        let greater = [];

        l.splice(0, 1);
        

        for(let i = 0; i < l.length; i++){
            
            if(l[i] < pivot){
                lesser.push(l[i]);
            }
            else if(l[i] >= pivot){
                greater.push(l[i]);
            }            
        }

        let final = []

        this.addToArray(final, this.quickSort(lesser))
        this.addToArray(final, pivot)
        this.addToArray(final, this.quickSort(greater))

        return final
    }

    updateSearch(event){
        this.setState({
            size: event.target.value.substr(0,3)
        })
    }

    render(){
        const {array} = this.state;
        const mappedArray = array.map((value, idx) => (
            <div className = "array-bar" key={idx} style={{height: `${value}px`}}></div>
        ))

        return(
            <div>
                <div className = "ui-container">
                    <button onClick={() => this.resetArray(10)}>New Array</button>
                    <button onClick={() => this.quickSortHandler(this.state.array, this.state.test)}>Quick Sort</button>
                    <label for="size">Size: </label>
                    <input type="number" id="size" value={this.state.size} onChange={this.updateSearch.bind(this)}/>
                </div>
                <div className = "array-container">
                    {mappedArray}
                </div>
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