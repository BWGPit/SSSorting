function colorString(x: string, color: string): string {
    return '<span style="color:' + color + ';">' + x + '</span>'
}

let Colors: {[k: string]: string} = {
    Literals: "#09b1c4",
    Numbers: "#2f9ddd",
    Keywords: "orange",
    CurlyBrackets: "#a34fb1",
    SquareBrackets: "#297add",
    Functions: "#7396db",
    AddSubtract: "#4adfbe",
    Property: "#cc74f2"
}

let syntax: [string | RegExp, (x: string) => string][] = [
    [/[0-9]/gi, (x: string): string => colorString(x, Colors.Numbers)],
    ["FOR", (x: string): string => colorString(x, Colors.Keywords)],
    ["WHILE", (x: string): string => colorString(x, Colors.Keywords)],
    ["TO", (x: string): string => colorString(x, Colors.Keywords)],
    ["DO", (x: string): string => colorString(x, Colors.Keywords)],
    ["{", (x: string): string => colorString(x, Colors.CurlyBrackets)],
    ["}", (x: string): string => colorString(x, Colors.CurlyBrackets)],
    ["[", (x: string): string => colorString(x, Colors.SquareBrackets)],
    ["]", (x: string): string => colorString(x, Colors.SquareBrackets)],
    [/[A-Z_-]+[(].*[)]/gi, (x: string): string => colorString(x, Colors.Functions)],
    [/[0-9a-zA-Z_-][+][+]/gi, (x: string): string => colorString(x, Colors.AddSubtract)],
    [/[0-9a-zA-Z_-][-][-]/gi, (x: string): string => colorString(x, Colors.AddSubtract)],
    [/[.][0-9a-zA-Z_-]+/gi, (x: string): string => colorString(x, Colors.Property)]
]

for (let pre of document.getElementsByClassName("pseudocode")) {
    for (let syn of syntax) {
        pre.innerHTML = pre.innerHTML.replaceAll(syn[0], syn[1])
    }
}