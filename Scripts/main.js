"use strict";
function draw(mainDiv, currentStatus, higlightKey = -1, higlightInterval = [Infinity, -Infinity]) {
    mainDiv.innerHTML = "";
    for (let memberIndex of currentStatus) {
        let s = memberIndex + 1;
        let member = tripleS[memberIndex];
        let hk = '';
        if ((higlightKey > -1 && memberIndex === higlightKey) ||
            ((higlightInterval[0] < higlightInterval[1]) && (currentStatus.indexOf(memberIndex) >= higlightInterval[0]) && (currentStatus.indexOf(memberIndex) <= higlightInterval[1]))) {
            hk = ' highlighted';
        }
        mainDiv.innerHTML += '<div class="member' + hk + '"><img class="member_poca" src="' + member.pocaUrl + '"><p class="member_name">S' + String(s) + '<br>' + member.name + '</p></div>\n';
    }
    let highlightedMember = mainDiv.getElementsByClassName("highlighted")[0];
    console.log(highlightedMember);
    if (highlightedMember != null)
        highlightedMember.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
}
console.log("Hi S - we are tripleS!");
let tripleSmap = new Map();
for (let d of document.getElementsByClassName("main")) {
    let mappedArray = shuffle(indexArray(24));
    tripleSmap.set(d, mappedArray);
    draw(d, mappedArray);
}
// Insertion sort
let isField = document.getElementById("tripleS_field_insertionsort");
if (isField == null) {
    throw new TypeError("IS field null");
}
let isArray = tripleSmap.get(isField);
if (isArray == null) {
    throw new TypeError("Array null");
}
let is = insertionSort(isArray);
function nextStepInsertion() {
    let curr = is.next().value;
    if (curr != undefined && isField != null) {
        draw(isField, ...curr);
    }
}
// Selection sort
let ssField = document.getElementById("tripleS_field_selectionsort");
if (ssField == null) {
    throw new TypeError("SS field null");
}
let ssArray = tripleSmap.get(ssField);
if (ssArray == null) {
    throw new TypeError("Array null");
}
let ss = selectionSort(ssArray);
function nextStepSelection() {
    let curr = ss.next().value;
    if (curr != undefined && ssField != null) {
        draw(ssField, ...curr);
    }
}
// Merge sort
let msField = document.getElementById("tripleS_field_mergesort");
if (msField == null) {
    throw new TypeError("MS field null");
}
let msArray = tripleSmap.get(msField);
if (msArray == null) {
    throw new TypeError("Array null");
}
let ms = mergeSortFn(msArray, 0, msArray.length - 1); // Transpiler puts a _ before mergeSortFn only, idk why
function nextStepMerge() {
    let curr = ms.next().value;
    if (curr != undefined && msField != null) {
        draw(msField, curr[0], -1, [curr[1], curr[2]]);
    }
}
//Quick sort
let qsField = document.getElementById("tripleS_field_quicksort");
if (qsField == null) {
    throw new TypeError("QS field null");
}
let qsArray = tripleSmap.get(qsField);
if (qsArray == null) {
    throw new TypeError("Array null");
}
let qs = quickSort(qsArray, 0, qsArray.length - 1);
function nextStepQuick() {
    let curr = qs.next().value;
    if (curr != undefined && qsField != null) {
        draw(qsField, ...curr);
    }
}
let hsField = document.getElementById("tripleS_field_heapsort");
if (hsField == null) {
    throw new TypeError("HS field null");
}
let hsArray = tripleSmap.get(hsField);
if (hsArray == null) {
    throw new TypeError("Array null");
}
let hs = heapSort(hsArray);
function nextStepHeap() {
    let curr = hs.next().value;
    if (curr != undefined && hsField != null) {
        draw(hsField, curr[0], -1, [curr[1], curr[2]]);
    }
}
