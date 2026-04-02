function randint(max: number, min: number = 0): number {
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // "The maximum is exclusive and the minimum is inclusive"
    return Math.floor(Math.random() * (Math.floor(max)-Math.ceil(min) + Math.ceil(min)))
}

function shuffle<T>(a: T[]): T[] {
    // Used to make a shuffled copy of an array
    let acopy: T[] = [...a]
    let aresult: T[] = []
    while (acopy.length > 0) {
        let index: number = randint(acopy.length)
        aresult.push(acopy[index])
        acopy = acopy.slice(0, index).concat(acopy.slice(index+1))
    }
    return aresult
}

function indexArray(len: number): number[] {
    let result: number[] = []
    for (let i = 0; i < len; i++) {
        result.push(i)
    }
    return result
}