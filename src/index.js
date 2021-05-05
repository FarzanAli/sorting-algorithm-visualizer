/**
 * @author: Farzan Ali Faisal
 * 
 * Implements quicksort algorithm to sort a randomized array.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UI from './components/UI';

class SortingVis extends React.Component {
    constructor(props) {
        super(props);
        //state
        this.state = {
            array: [],
            unsortedArray: [],
            test: [],
            size: 50,
            history: {
                lesser: [],
                pivot: [],
                greater: []
            },
            sortedSubArrays: [],
            steps: [],
            animatedSteps: [],
            stepsCounter: 0
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    //Sorting function.
    defaultSort(l) {
        let x = duplicateArray(l)
        x.sort(function (a, b) {
            return a - b;
        });
        return x
    }


    //Resets array in state along with other properties.
    resetArray() {
        let a = [];
        for (let i = 0; i < this.state.size; i++) {
            a.push(randomInt(5, 730));
        }

        let t = duplicateArray(a);
        t = this.defaultSort(t);

        for (let i = 0; i < a.length; i++) {
            a[i] = [a[i]];
            a[i].push(i);
        }

        let u = duplicateArray(a)

        this.setState({
            array: a,
            unsortedArray: u,
            test: t,
            history: {
                lesser: [],
                pivot: [],
                greater: []
            },
            sortedSubArrays: [],
            steps: [],
            animatedSteps: [],
            stepsCounter: 0
        });
    }

    //Adds contents of c to l. Copies array essentially.
    addToArray(l, c) {
        if (c.length !== 0) {
            for (let i = 0; i < c.length; i++) {
                l.push(c[i])
            }
        }
    }

    quickSortHandler(e, t) {

        //If array was sorted correctly, set it to state(Display it).
        let a = this.defaultSort(getValueArray(e));
        if (getValueArray(e) !== a) {
            e = this.quickSort(e);
            if (JSON.stringify(getValueArray(e)) === JSON.stringify(t)) {
                this.setState({
                    array: e
                });

            }
            else { console.log(this.state, e); }
        }

        //Creates an array of sorted sub arrays from the quicksort process.
        let sortedSubArrays = [];
        for (let i = 0; i < this.state.history.lesser.length; i++) {
            sortedSubArrays.push(combineSteps(this.state.history.lesser[i], this.state.history.pivot[i], this.state.history.greater[i]))
        }

        //Creates an array of steps the quicksort algorithm takes to sort using sortedSubArrays which used history.
        this.setState({ sortedSubArrays: sortedSubArrays }, () => {
            let s = [];
            for (let i = 0; i < this.state.sortedSubArrays.length + 1; i++) {
                if (i === 0) {
                    s.push(duplicateArray(this.state.unsortedArray))
                }
                if (i === 1) {
                    s.push(this.state.sortedSubArrays[0])
                }
                else if (i >= 1) {
                    let newArray = replaceItems(s[i - 1], this.state.sortedSubArrays[i - 1])
                    s.push(newArray)
                }
            }
            this.setState({ steps: s })
        })
    }

    //recursive quicksort algorithm.
    quickSort(e) {
        let l = duplicateArray(e)

        //base case.
        if (l.length === 1 || l.length === 0) {
            return l
        }


        let pivot = l[0];
        let lesser = [];
        let greater = [];

        l.splice(0, 1);

        //Pushes elements from unsorted array into their respective lesser or greater than pivot arrays.
        for (let i = 0; i < l.length; i++) {
            if (l[i][0] < pivot[0]) {
                lesser.push(l[i]);
            }
            else if (l[i][0] >= pivot[0]) {
                greater.push(l[i]);
            }
        }

        let final = []

        //Stores lesser, pivot, and greater in state.
        this.state.history.lesser.push(lesser)
        this.state.history.pivot.push(pivot)
        this.state.history.greater.push(greater)

        //Builds final sorted array.
        this.addToArray(final, this.quickSort(lesser))
        final.push(pivot)
        this.addToArray(final, this.quickSort(greater))

        return final
    }
    
    //Iterates over steps in a timely manner.
    iterateSteps() {
        this.quickSortHandler(this.state.array, this.state.test)
        setInterval(() => {
            let counter = this.state.stepsCounter
            if (counter < this.state.steps.length) {
                this.setState({
                    array: this.state.steps[counter],
                    stepsCounter: counter + 1
                })
            }
        }, 50)
    }

    updateSearch(event) {
        this.setState({
            size: event.target.value.substr(0, 3)
        })
    }

    render() {
        const array = getValueArray(this.state.array);
        const mappedArray = array.map((value, idx) => (
            <div className="array-bar" key={idx} style={{ height: `${value}px`}}></div>
        ))
        return (
            <div>
                <UI
                size={this.state.size}
                updateSearch={this.updateSearch.bind(this)}
                resetArray={this.resetArray.bind(this)}
                iterateSteps={this.iterateSteps.bind(this)}
                />
                <div className="array-container">
                    {mappedArray}
                </div>
            </div>
        );
    }
}


function replaceItems(l, c) {
    l = duplicateArray(l)
    c = duplicateArray(c)

    let mins = [];
    for (let i = 0; i < c.length; i++) {
        for (let j = 0; j < l.length; j++) {
            if (JSON.stringify(l[j]) === JSON.stringify(c[i])) {
                mins.push(j)
            }
        }
    }

    let index = Math.min(...mins);
    l.splice(index, c.length);

    let a = [];
    for (let i = 0; i < index; i++) {
        a.push(l[i]);
    }
    let b = [];
    for (let i = index; i < l.length; i++) {
        b.push(l[i]);
    }
    a = a.concat(c, b);

    return a;
}

function combineSteps(a, b, c) {
    let d = []
    function enterList(l, c) {
        if (typeof (c[0]) === "number") {
            l.push(c)
        }
        else {
            for (let i = 0; i < c.length; i++) {
                l.push(c[i])
            }
        }
    }
    enterList(d, a)
    enterList(d, b)
    enterList(d, c)
    return d
}

function getValueArray(l) {
    let a = [];
    for (let i = 0; i < l.length; i++) {
        a.push(l[i][0]);
    }
    return a;
}

//Duplicates array.
function duplicateArray(l) {
    let x = [];
    for (let i = 0; i < l.length; i++) { x.push(l[i]); }
    return x;
}

//generates random int.
function randomInt(a, b) {
    return Math.floor(a + Math.random() * (1 + b - a));
}

ReactDOM.render(
    <SortingVis />,
    document.getElementById('root')
)