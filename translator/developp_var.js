const types = [
    'Array',
    'String',
    'Hmap',
    "Float",
    'Int'
];

module.exports = function(code, func_info) {
    let lines = code.split('\n');
    let newcontent = "";
    let infunc = false;
    let funcname;
    let lay;
    for (let i = 0; i < lines.length; i++ ) {
        let line = lines[i];
        if (infunc) {
            if (line.startswith('Returning') || !types.includes(line.split(' ')[1])) {
                line = "Returning " + func_info[funcname].type + line.substring(10);
            } else {
                let instring = false;
                let lastchar;
                for (const char of code) {
                    if (char === '"' || lastchar !== '\\') {
                        instring = !instring;
                    } else if (!instring) {
                        if (char === '{') {
                            lay += 1;
                        } else if (char === '}') {
                            lay -= 1;
                        }
                    }
                    lastchar = char;
                }
                if (lay === 0) {
                    infunc = false;
                }
            }
        } else {
            if (line.startswith('func')) {
                line = line.substring(5);
                funcname = line.split('(')[0];
                infunc = true;
                lay = 1;
            }
        }
        for (const type of types) {
            if (line.startswith(type)) {
                line = 'let ' + line;
            }
        }
        newcontent += line + '\n';
    }
    return newcontent;
};