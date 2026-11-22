"use strict";
function randint(max, min = 0) {
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // "The maximum is exclusive and the minimum is inclusive"
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + Math.ceil(min)));
}
function shuffle(a) {
    // Used to make a shuffled copy of an array
    let acopy = [...a];
    let aresult = [];
    while (acopy.length > 0) {
        let index = randint(acopy.length);
        aresult.push(acopy[index]);
        acopy = acopy.slice(0, index).concat(acopy.slice(index + 1));
    }
    return aresult;
}
function indexArray(len) {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(i);
    }
    return result;
}
