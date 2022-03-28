export class Sorts{
    constructor(array, name, playCallback, setArrayCallback){
        this.playCallback = playCallback;
        this.setArrayCallback = setArrayCallback;
        this.name = name;
        this.array = array;
        this.history = [];
        this.steps = [
            [[0, 30], [1, 40], [2, 10], [3, 20]],
            [[0, 30], [3, 20], [1, 40], [2, 10]],
            [[3, 20], [0, 30], [1, 40], [2, 10]],
            [[2, 10], [0, 30], [1, 40], [3, 20]]
        ]
    }

    sortHandler(){
        if(this.array.length !== 0){
            if(this.name === 'Quicksort'){
                this.array = this.quicksort(this.array);
            }
        }
    }

    setAlgorithm(name){
        this.algorithm = name;
    }

    getSteps(){
        return this.steps;
    }

    quicksort(array){
        if(array.length === 1 || array.length === 0){
            return array;
        }

        let pivot = array[0];
        let lesser = [];
        let greater = [];

        for(let i = 1; i < array.length; i++){
            if(array[i][1] > pivot[1]){
                greater.push(array[i]);
            }
            else{
                lesser.push(array[i]);
            }
        }

        this.history.push([lesser, pivot, greater]);

        return this.quicksort(lesser).concat([pivot]).concat(this.quicksort(greater));
    }
}