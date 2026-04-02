// Each sorting algorithm must be implemented in a generator returning the array state on each step of the iteration
type SortingAlgorithm = (a: number[]) => Generator<[number[], number], void, void>

let insertionSort: SortingAlgorithm = function*(a) {
    for (let j = 1; j < a.length; j++) {
        let key: number = a[j]
        let i = j-1
        while (i >= 0 && a[i] > key) {
            a[i+1] = a[i]
            i = i - 1
        }
        a[i+1] = key
        yield [a, key]
    }
}