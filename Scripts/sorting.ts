// Each sorting algorithm must be implemented in a generator returning the array state on each step of the iteration
type SortingAlgorithm = (a: number[]) => Generator<[number[], number], void, void>
type MergeSortingAlgorithm = (a: number[], p: number, r: number) => Generator<[number[], number, number], void, void>

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

let selectionSort: SortingAlgorithm = function*(A) {
    for (let i = 0; i < A.length-1; i++) {
        yield [A, i]
        let min: number = i
        for (let j = i+1; j < A.length; j++) {
            if (A[j] < A[min]) {min = j}
        }
        [A[i], A[min]] = [A[min], A[i]]
    }
    yield [A, A.length-1]
}

let mergeSortFn: MergeSortingAlgorithm = function*(A, p, r) {
    if (p < r) {
        let q: number = Math.floor((p+r)/2)
        yield* mergeSortFn(A, p, q)
        yield* mergeSortFn(A, q+1, r)
        merge(A, p, q, r)
        yield [A, p, r]
    }
}

let merge: (a: number[], p:number, q: number, r: number) => void = function(A, p, q, r) {
    let n1: number = q-p+1, n2: number = r-q
    let L: number[] = [], R: number[] = []
    for (let i = 0; i < n1; i++) {
        L[i] = A[p+i]
    }
    for (let j = 0; j < n2; j++) {
        R[j] = A[q+j+1]
    }
    L[n1] = Infinity
    R[n2] = Infinity
    let i: number = 0, j: number = 0
    for (let k = p; k < r+1; k++) {
        if (L[i] <= R[j]) {
            A[k] = L[i]
            i++
        }
        else {
            A[k] = R[j]
            j++
        }
    }
}

let quickSort = function*(A: number[], p: number, r: number): Generator<[number[], number], void, void> {
    if (p < r) {
        let q: number = partition(A, p, r)
        yield [A, q]
        yield* quickSort(A, p, q-1)
        yield* quickSort(A, q+1, r)
    }
}

let partition = function(A: number[], p: number, r: number): number {
    let x: number = A[r]
    let i: number = p-1
    for (let j=p; j<r; j++) {
        if (A[j] <= x) {
            i++
            [A[i], A[j]] = [A[j], A[i]]
        }
    }
    [A[i+1], A[r]] = [A[r], A[i+1]]
    return i+1
}