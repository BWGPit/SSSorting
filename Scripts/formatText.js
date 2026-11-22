"use strict";
function colorString(x, color) {
    return '<span style="color:' + color + ';">' + x + '</span>';
}
let Colors = {
    Literals: "#09b1c4",
    Numbers: "#2f9ddd",
    Keywords: "orange",
    CurlyBrackets: "#a34fb1",
    SquareBrackets: "#297add",
    Functions: "#7396db",
    AddSubtract: "#4adfbe",
    Property: "#cc74f2",
    Comment: "#00680c",
    Nihil: "#aeaeae"
};
let syntax = [
    [/[^a-zA-Z][0-9]/gi, (x) => colorString(x, Colors.Numbers)],
    ["FOR", (x) => colorString(x, Colors.Keywords)],
    ["WHILE", (x) => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]TO[^a-zA-Z]/gi, (x) => colorString(x, Colors.Keywords)],
    ["DOWNTO", (x) => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]IF[^a-zA-Z]/gi, (x) => colorString(x, Colors.Keywords)],
    ["THEN", (x) => colorString(x, Colors.Keywords)],
    ["ELSE", (x) => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]DO[^a-zA-Z]/gi, (x) => colorString(x, Colors.Keywords)],
    ["RETURN", (x) => colorString(x, Colors.Keywords)],
    ["NIL", (x) => colorString(x, Colors.Nihil)],
    ["∧", (x) => colorString(x, Colors.Keywords)],
    ["{", (x) => colorString(x, Colors.CurlyBrackets)],
    ["}", (x) => colorString(x, Colors.CurlyBrackets)],
    ["[", (x) => colorString(x, Colors.SquareBrackets)],
    ["]", (x) => colorString(x, Colors.SquareBrackets)],
    [/[A-Z_-]+[(].*[)]/gi, (x) => colorString(x, Colors.Functions)],
    [/[0-9a-zA-Z_-][+][+]/gi, (x) => colorString(x, Colors.AddSubtract)],
    [/[0-9a-zA-Z_-][-][-]/gi, (x) => colorString(x, Colors.AddSubtract)],
    [/[.][0-9a-zA-Z_-]+/gi, (x) => colorString(x, Colors.Property)],
    [/[\/][\/].*[.]*$/gim, (x) => colorString(x, Colors.Comment)]
];
for (let pre of document.getElementsByClassName("pseudocode")) {
    for (let syn of syntax) {
        pre.innerHTML = pre.innerHTML.replaceAll(syn[0], syn[1]);
    }
}
