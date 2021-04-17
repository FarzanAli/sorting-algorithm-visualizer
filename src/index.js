import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        this.resetArray(this.state.size);
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

        let sortedSubArrays = [];
        for (let i = 0; i < this.state.history.lesser.length; i++) {
            sortedSubArrays.push(combineSteps(this.state.history.lesser[i], this.state.history.pivot[i], this.state.history.greater[i]))
        }

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

    quickSort(e) {
        let l = duplicateArray(e)

        if (l.length === 1 || l.length === 0) {
            return l
        }

        let pivot = l[0];
        let lesser = [];
        let greater = [];

        l.splice(0, 1);

        for (let i = 0; i < l.length; i++) {
            if (l[i][0] < pivot[0]) {
                lesser.push(l[i]);
            }
            else if (l[i][0] >= pivot[0]) {
                greater.push(l[i]);
            }
        }

        let final = []


        this.state.history.lesser.push(lesser)
        this.state.history.pivot.push(pivot)
        this.state.history.greater.push(greater)

        this.addToArray(final, this.quickSort(lesser))
        final.push(pivot)
        this.addToArray(final, this.quickSort(greater))

        return final
    }
    
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
                <div className="ui-container">
                    <label for="size">Size: </label>
                    <input type="number" id="size" value={this.state.size} onChange={this.updateSearch.bind(this)} />
                    <button onClick={() => this.resetArray(10)}>New Array</button>
                    <button onClick={() => this.quickSortHandler(this.state.array, this.state.test)}>Quick Sort</button>
                    <button onClick={() => this.iterateSteps()}>Show Steps</button>
                </div>
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

function duplicateArray(l) {
    let x = [];
    for (let i = 0; i < l.length; i++) { x.push(l[i]); }
    return x;
}

function randomInt(a, b) {
    return Math.floor(a + Math.random() * (1 + b - a));
}

ReactDOM.render(
    <SortingVis />,
    document.getElementById('root')
)