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
    let infunc;
    let func_content = "";
    let openpar = 0;
    let info = new Map();
    let result = "";
    let arguments = "";
    let letter = "";
    let argumentsobj;
    let argument = "";
    let argument_res = "";
    let in_string = false;
    let char = "";
    let letters = [];
    let waiting = false;
    let no_space = false;
    let has_name = false;
    let line = "";
    let newi = 0;
    const lines = code.split('\n');
    for (let i = 0; i < lines.lenght; i++) {
        line = lines[i];
        if (line.startsWith('func ')) {
            infunc = true;
            func_content = "";
            openpar = 1;
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
                    arguments += letter
                    if (letter === ")") {
                        if (newi === 0) {
                            newi = i + 4;
                        }
                        if (i > newi) {
                            if (letter === " ") {
                                for (let i = 0; i < arguments.length; i++) {
                                    char = arguments.charAt(i)
                                    if (in_string) {
                                        if (char === '"') {
                                            in_string = false;
                                        }
                                    } else {
                                        if (char === '"') {
                                            in_string = true;
                                        } else {
                                            if (!no_space) {
                                                if (char !== " ") {
                                                    no_space = true;
                                                    argument_res += char;
                                                }
                                            } else {
                                                if (char === ",") {
                                                    no_space = false;
                                                }
                                                argument_res += char;
                                            }
                                        }
                                    }
                                }
                                arguments = argument_res.split(",");
                                argument_res = "";
                                argumentsobj = {};
                                for (let i = 0; i < arguments.length; i++) {
                                    argument = arguments[i].split(' ');
                                    if (!argument[2]) {
                                        argumentsobj.set(argument[1], {type: argument[0], optional: false});
                                    } else {
                                        for (let i = 3; i < argument.length; i++) {
                                            argument_res += argument[i];
                                        }
                                        argumentsobj.set(argument[1], {type: argument[0], optional: true, default: argument_res});
                                    }
                                }
                                info.set(funcname, {type: result, arguments: argumentsobj, where: i});
                                waiting = false;
                                in_string = false;
                                newi = 0;
                                result = '';
                            }
                            result += letter;
                        }
                    }
                }
            }
        }
        if (infunc) {
            for (let i = 0; i < line.length; i++) {
                letter = line[i];
                if (in_string) {
                    if (letter === '"') {
                        in_string = false;
                    }
                } else {
                    if (letter === '"') {
                        in_string = true;
                    } else {
                        if (letter === "{") {
                            openpar += 1;
                        } else if (letter === '}') {
                            openpar -= 1;
                            if (openpar === 0) {
                                infunc = false;
                                info[funcname].content = func_content + '}';
                                info[funcname].end = i;
                            }
                        }
                    }
                }
                func_content += letter;
            }
        }
    }
    return info;
}