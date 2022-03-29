export class Sorts {
    constructor(array, name, playCallback, setArrayCallback) {
        this.playCallback = playCallback;
        this.setArrayCallback = setArrayCallback;
        this.name = name;
        this.array = array;
        this.history = [];
        this.steps = [array]
    }

    clear(){
        this.history = [];
        this.steps = [this.array];
    }

    merge(a, b, i = 0) {
        return a.slice(0, i).concat(b, a.slice(i));
    }

    equal(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    sortHandler() {
        if (this.array.length !== 0) {
            if (this.name === 'Quicksort') {
                this.array = this.quicksort(this.array);
                for(let i = 0; i < this.history.length; i++){
                    let lesser = this.history[i][0];
                    let pivot = this.history[i][1];
                    let greater = this.history[i][2];
                    let currentArray = this.steps[i] || [];
                    const valuesToRemove = new Set(lesser.concat(greater));

                    currentArray = currentArray.filter((value) => {
                        return !valuesToRemove.has(value);
                    });
                    
                    for(let j = 0; j < currentArray.length; j++){
                        if(this.equal(currentArray[j], pivot)){
                            currentArray = this.merge(currentArray, greater, j + 1);
                            currentArray = this.merge(currentArray, lesser, j);
                            break;
                        }
                    }
                    this.steps.push(currentArray);
                }
                console.log(this.steps);
            }
        }
    }

    setAlgorithm(name) {
        this.algorithm = name;
    }

    getSteps() {
        return this.steps;
    }

    quicksort(array) {
        if (array.length === 1 || array.length === 0) {
            return array;
        }
        let pivot = array[0];
        let lesser = [];
        let greater = [];

        for (let i = 1; i < array.length; i++) {
            if (array[i][1] > pivot[1]) {
                greater.push(array[i]);
            }
            else {
                lesser.push(array[i]);
            }
        }

        this.history.push([lesser, pivot, greater]);

        return this.quicksort(lesser).concat([pivot]).concat(this.quicksort(greater));
    }
}