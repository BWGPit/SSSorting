"use strict";
let insertionSort = function* (a) {
    for (let j = 1; j < a.length; j++) {
        let key = a[j];
        let i = j - 1;
        while (i >= 0 && a[i] > key) {
            a[i + 1] = a[i];
            i = i - 1;
        }
        a[i + 1] = key;
        yield [a, key];
    }
};
let selectionSort = function* (A) {
    for (let i = 0; i < A.length - 1; i++) {
        yield [A, i];
        let min = i;
        for (let j = i + 1; j < A.length; j++) {
            if (A[j] < A[min]) {
                min = j;
            }
        }
        [A[i], A[min]] = [A[min], A[i]];
    }
    yield [A, A.length - 1];
};
let mergeSortFn = function* (A, p, r) {
    if (p < r) {
        let q = Math.floor((p + r) / 2);
        yield* mergeSortFn(A, p, q);
        yield* mergeSortFn(A, q + 1, r);
        merge(A, p, q, r);
        yield [A, p, r];
    }
};
let merge = function (A, p, q, r) {
    let n1 = q - p + 1, n2 = r - q;
    let L = [], R = [];
    for (let i = 0; i < n1; i++) {
        L[i] = A[p + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = A[q + j + 1];
    }
    L[n1] = Infinity;
    R[n2] = Infinity;
    let i = 0, j = 0;
    for (let k = p; k < r + 1; k++) {
        if (L[i] <= R[j]) {
            A[k] = L[i];
            i++;
        }
        else {
            A[k] = R[j];
            j++;
        }
    }
};
let quickSort = function* (A, p, r) {
    if (p < r) {
        let q = partition(A, p, r);
        yield [A, q];
        yield* quickSort(A, p, q - 1);
        yield* quickSort(A, q + 1, r);
    }
};
let partition = function (A, p, r) {
    let x = A[r];
    let i = p - 1;
    for (let j = p; j < r; j++) {
        if (A[j] <= x) {
            i++;
            [A[i], A[j]] = [A[j], A[i]];
        }
    }
    [A[i + 1], A[r]] = [A[r], A[i + 1]];
    return i + 1;
};
class Heap extends Array {
    heapSize;
    constructor(...arr) {
        super(...arr);
        this.heapSize = this.length;
    }
}
function heapLeft(i) { return 2 * i + 1; }
function heapRight(i) { return 2 * i + 2; }
function maxHeapify(A, i) {
    let l = heapLeft(i);
    let r = heapRight(i);
    let largest;
    if (l <= A.heapSize - 1 && A[l] > A[i]) {
        largest = l;
    }
    else {
        largest = i;
    }
    if (r <= A.heapSize - 1 && A[r] > A[largest]) {
        largest = r;
    }
    if (largest != i) {
        [A[i], A[largest]] = [A[largest], A[i]];
        maxHeapify(A, largest);
    }
}
function buildMaxHeap(A) {
    let AHeap = new Heap(...A);
    for (let i = Math.floor(A.length / 2); i >= 0; i--) {
        maxHeapify(AHeap, i);
    }
    return AHeap;
}
let heapSort = function* (a) {
    let AHeap = buildMaxHeap(a);
    yield [[...AHeap], 0, AHeap.heapSize - 1];
    for (let i = AHeap.length - 1; i >= 0; i--) {
        [AHeap[0], AHeap[i]] = [AHeap[i], AHeap[0]];
        AHeap.heapSize--;
        maxHeapify(AHeap, 0);
        yield [[...AHeap], 0, AHeap.heapSize - 1];
    }
};
