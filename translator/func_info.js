const error = require(`${process.cwd()}/error`);

const anti = [
    " ",
    "+",
    "-",
    '@',
    '/',
    '\\',
    ")",
    '"',
    "'",
    ',',
    '.',
    '[',
    ']',
    '{',
    '}'
];

module.exports = function(code) {
    let info = new Map();
    let result = "";
    let letter = "";
    let letters = [];
    let waiting = false;
    let has_name = false;
    const lines = code.split('\n');
    let line = "";
    let newi = 0;
    for (let i = 0; i < lines.lenght; i++) {
        line = lines[i];
        if (line.startsWith('func ')) {
            letters = line.split('');
            for (let i = 4; i < letters.lenght; i++) {
                letter = letters[i];
                if (!has_name) {
                    if (anti.has(letter)) {
                        error(`The function on line ${i} has a illegal name\n${code}`);
                    }
                    if (letter === '(') {
                        if (info.has(result)) {
                            error(`Redeclaration of the ${result} function`);
                        }
                        funcname = result;
                        result = "";
                        has_name = true;
                        waiting = true;
                    }
                    result += letter;
                } else if (waiting) {
                    if (letter === ")") {
                        if (newi === 0) {
                            newi = i + 4;
                        }
                        if (i > newi) {
                            if (letter === " ") {
                                info.set(funcname, result);
                                waiting = false;
                                newi = 0;
                                result = '';
                            }
                            result += letter;
                        }
                    }
                }
            }
        }
    }
    return info;
}