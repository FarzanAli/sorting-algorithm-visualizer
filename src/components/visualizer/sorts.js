export class Sorts{
    constructor(array, name, playCallback, setArrayCallback){
        this.playCallback = playCallback;
        this.setArrayCallback = setArrayCallback;
        this.name = name;
        this.array = array;
        this.history = [];
    }

    sortHandler(){
        if(this.array.length !== 0){
            if(this.name === 'Quicksort'){
                this.array = this.quicksort(this.array);
                this.setArrayCallback(this.array);
            }
        }
    }

    setAlgorithm(name){
        this.algorithm = name;
    }

    quicksort(array){
        if(array.length === 1 || array.length === 0){
            return array;
        }

        let pivot = array[0];
        let lesser = [];
        let greater = [];

        for(let i = 1; i < array.length; i++){
            if(array[i] > pivot){
                greater.push(array[i]);
            }
            else{
                lesser.push(array[i]);
            }
        }

        return this.quicksort(lesser).concat(pivot).concat(this.quicksort(greater))
    }
}