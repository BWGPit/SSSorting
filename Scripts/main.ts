function draw(mainDiv: Element, currentStatus: number[], higlightKey: number = -1, higlightInterval: [number, number] = [Infinity, -Infinity]): void {
    mainDiv.innerHTML = ""
    for (let memberIndex of currentStatus) {
        let s: number = memberIndex+1
        let member: tripleSmember = tripleS[memberIndex]
        let hk: string = ''
        if (
            (higlightKey > -1 && memberIndex === higlightKey) ||
            ((higlightInterval[0] < higlightInterval[1]) && (currentStatus.indexOf(memberIndex) >= higlightInterval[0]) && (currentStatus.indexOf(memberIndex) <= higlightInterval[1]))
        ) {
            hk = ' highlighted'
        }
        mainDiv.innerHTML += '<div class="member' + hk + '"><img class="member_poca" src="' + member.pocaUrl + '"><p class="member_name">S' + String(s) + '<br>' + member.name + '</p></div>\n'
    }
    let highlightedMember: Element | null = mainDiv.getElementsByClassName("highlighted")[0]
    console.log(highlightedMember)
    if (highlightedMember != null) highlightedMember.scrollIntoView({behavior:"auto", block:"center", inline:"center"})
}

console.log("Hi S - we are tripleS!")
let tripleSmap: Map<Element, number[]> = new Map()

for (let d of document.getElementsByClassName("main")) {
    let mappedArray: number[] = shuffle(indexArray(24))
    tripleSmap.set(d, mappedArray)
    draw(d, mappedArray)
}

// Insertion sort
let isField: Element | null = document.getElementById("tripleS_field_insertionsort")
if (isField == null) {throw new TypeError("IS field null")}
let isArray: number[] | undefined = tripleSmap.get(isField)
if (isArray == null) {throw new TypeError("Array null")}
let is: Generator<[number[], number], void, void> = insertionSort(isArray)

function nextStepInsertion(): void {
    let curr: [number[], number]|void = is.next().value
    
    if (curr != undefined && isField != null) {
        draw(isField, ...curr)
    }
}

// Selection sort
let ssField: Element | null = document.getElementById("tripleS_field_selectionsort")
if (ssField == null) {throw new TypeError("SS field null")}
let ssArray: number[] | undefined = tripleSmap.get(ssField)
if (ssArray == null) {throw new TypeError("Array null")}
let ss: Generator<[number[], number], void, void> = selectionSort(ssArray)

function nextStepSelection(): void {
    let curr: [number[], number]|void = ss.next().value
    
    if (curr != undefined && ssField != null) {
        draw(ssField, ...curr)
    }
}

// Merge sort
let msField: Element | null = document.getElementById("tripleS_field_mergesort")
if (msField == null) {throw new TypeError("MS field null")}
let msArray: number[] | undefined = tripleSmap.get(msField)
if (msArray == null) {throw new TypeError("Array null")}
let ms: Generator<[number[], number, number], void, void> = _mergeSortFn(msArray, 0, msArray.length-1)  // Transpiler puts a _ before mergeSortFn only, idk why

function nextStepMerge(): void {
    let curr: [number[], number, number]|void = ms.next().value
    if (curr != undefined && msField != null) {
        draw(msField, curr[0], -1, [curr[1], curr[2]])
    }
}

//Quick sort
let qsField: Element | null = document.getElementById("tripleS_field_quicksort")
if (qsField == null) {throw new TypeError("QS field null")}
let qsArray: number[] | undefined = tripleSmap.get(qsField)
if (qsArray == null) {throw new TypeError("Array null")}
let qs: Generator<[number[], number], void, void> = _quickSort(qsArray, 0, qsArray.length-1)

function nextStepQuick(): void {
    let curr: [number[], number] | void = qs.next().value
    if (curr != undefined && qsField != null) {
        draw(qsField, ...curr)
    }
}