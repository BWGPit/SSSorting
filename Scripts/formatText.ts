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
    Property: "#cc74f2",
    Comment: "#00680c",
    Nihil: "#aeaeae"
}

let syntax: [string | RegExp, (x: string) => string][] = [
    [/[^a-zA-Z][0-9]/gi, (x: string): string => colorString(x, Colors.Numbers)],
    ["FOR", (x: string): string => colorString(x, Colors.Keywords)],
    ["WHILE", (x: string): string => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]TO[^a-zA-Z]/gi, (x: string): string => colorString(x, Colors.Keywords)],
    ["DOWNTO", (x: string): string => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]IF[^a-zA-Z]/gi, (x: string): string => colorString(x, Colors.Keywords)],
    ["THEN", (x: string): string => colorString(x, Colors.Keywords)],
    ["ELSE", (x: string): string => colorString(x, Colors.Keywords)],
    [/[^a-zA-Z]DO[^a-zA-Z]/gi, (x: string): string => colorString(x, Colors.Keywords)],
    ["RETURN", (x: string): string => colorString(x, Colors.Keywords)],
    ["NIL", (x: string): string => colorString(x, Colors.Nihil)],
    ["∧", (x: string): string => colorString(x, Colors.Keywords)],
    ["{", (x: string): string => colorString(x, Colors.CurlyBrackets)],
    ["}", (x: string): string => colorString(x, Colors.CurlyBrackets)],
    ["[", (x: string): string => colorString(x, Colors.SquareBrackets)],
    ["]", (x: string): string => colorString(x, Colors.SquareBrackets)],
    [/[A-Z_-]+[(].*[)]/gi, (x: string): string => colorString(x, Colors.Functions)],
    [/[0-9a-zA-Z_-][+][+]/gi, (x: string): string => colorString(x, Colors.AddSubtract)],
    [/[0-9a-zA-Z_-][-][-]/gi, (x: string): string => colorString(x, Colors.AddSubtract)],
    [/[.][0-9a-zA-Z_-]+/gi, (x: string): string => colorString(x, Colors.Property)],
    [/[\/][\/].*[.]*$/gim, (x: string): string => colorString(x, Colors.Comment)]
]

for (let pre of document.getElementsByClassName("pseudocode")) {
    for (let syn of syntax) {
        pre.innerHTML = pre.innerHTML.replaceAll(syn[0], syn[1])
    }
}