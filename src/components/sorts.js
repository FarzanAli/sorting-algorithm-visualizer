export class Sorts {
    constructor(array, name, playCallback, setArrayCallback) {
        this.playCallback = playCallback;
        this.setArrayCallback = setArrayCallback;
        this.name = name;
        this.array = array;
        this.history = [];
        this.steps = [array]
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

    includes(a, b){
        for(let i = 0; i < a.length; i++){
            if(a[i][0] === b[0] && a[i][1] === b[1]){
                return true;
            }
        }
        return false;
    }

    sortHandler() {
        if (this.array.length !== 0) {
            if (this.name === 'Quicksort') {
                this.array = this.quicksort(this.array);
                for(let i = 0; i < this.history.length; i++){
                    let lesser = this.history[i][0].map((value) => {return value.slice();});
                    let pivot = [...this.history[i][1]];
                    let greater = this.history[i][2].map((value) => {return value.slice();});
                    let currentArray = this.steps[i] || [];
                    currentArray = currentArray.map((value) => {return value.slice();})
                    const valuesToRemove = lesser.concat(greater);

                    currentArray = currentArray.filter((value) => {
                        return !this.includes(valuesToRemove, value);
                    });

                    for(let j = 0; j < currentArray.length; j++){
                        if(currentArray[j][0] === pivot[0] && currentArray[j][1] === pivot[1]){
                            currentArray = this.merge(currentArray, greater, j + 1);
                            currentArray = this.merge(currentArray, lesser, j);
                            break;
                        }
                    }
                    currentArray.map((value) => {
                        return value[2] = '';
                    });
                    this.steps.push(currentArray);
                }
                for(let i = 0; i < this.steps.length - 1; i++){
                    secondary:
                    for(let j = 0; j < this.steps[i].length; j++){
                        //Lesser
                        for(let l = 0; l < this.history[i][0].length; l++){
                            if(this.steps[i][j][0] === this.history[i][0][l][0] && this.steps[i][j][1] === this.history[i][0][l][1]){
                                this.steps[i][j][2] = this.history[i][0][l][2];
                                continue secondary;
                            }
                        }

                        //Pivot
                        if(this.steps[i][j][0] === this.history[i][1][0]){
                            this.steps[i][j][2] = this.history[i][1][2]
                            continue secondary;
                        }

                        //Greater
                        for(let m = 0; m < this.history[i][2].length; m++){
                            if(this.steps[i][j][0] === this.history[i][2][m][0] && this.steps[i][j][1] === this.history[i][2][m][1]){
                                this.steps[i][j][2] = this.history[i][2][m][2];
                                continue secondary;
                            }
                        }
                        this.steps[i][j][2] = '';
                    }
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

        let l = lesser.map((arr) => {return arr.slice();});
        l.map((value) => {return value[2] = 'red'});

        let p = pivot.slice();
        p[2] = 'yellow';

        let g = greater.map((arr) => {return arr.slice();});
        g.map((value) => {return value[2] = ('green');});

        this.history.push([l, p, g]);

        return this.quicksort(lesser).concat([pivot]).concat(this.quicksort(greater));
    }
}