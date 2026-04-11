let mainDiv: Element = document.getElementsByClassName("main")[0]

function draw(currentStatus: number[], higlightKey: number = -1): void {
    mainDiv.innerHTML = ""
    for (let memberIndex of currentStatus) {
        let s: number = memberIndex+1
        let member: tripleSmember = tripleS[memberIndex]
        let hk: string = ''
        if (higlightKey > -1 && memberIndex === higlightKey) {
            hk = 'id="highlighted"'
        } 
        mainDiv.innerHTML += '<div class="member"' + hk + '><img class="member_poca" src="' + member.pocaUrl + '"><p class="member_name">S' + String(s) + '<br>' + member.name + '</p></div>\n'
    }
    let highlightedMember: Element | null = document.getElementById("highlighted")
    if (highlightedMember != null) highlightedMember.scrollIntoView({behavior:"auto", block:"center", inline:"center"})
}

console.log("Hi S - we are tripleS!")
let sss: number[] = shuffle(indexArray(24))
draw(sss)

// Insertion sort
// TODO: Describe the algorithm and higlight the i-th member
let is: Generator<[number[], number], void, void> = insertionSort(sss)

function nextStepInsertion(): void {
    let curr: [number[], number]|void = is.next().value
    console.log(curr)
    if (curr != undefined) {
        draw(...curr)
    }
}