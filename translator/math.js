module.exports = function betterformula(formula) {
    function removeOuterParentheses(str) {
        if (str.charAt(0) === '(' && str.charAt(str.length - 1) === ')') {
            return str.slice(1, -1);
        }
        return str;
    }

    function splitByOperator(expr, operator) {
        const result = [];
        let parenthesesLevel = 0;
        let currentChunk = '';
        for (let i = 0; i < expr.length; i++) {
            const char = expr.charAt(i);
            if (char === '(') {
                parenthesesLevel++;
            } else if (char === ')') {
                parenthesesLevel--;
            }
            if (parenthesesLevel === 0 && operator === expr.charAt(i)) {
                result.push(currentChunk.trim());
                currentChunk = '';
            } else {
                currentChunk += char;
            }
        }
    if (currentChunk !== '') {
        result.push(currentChunk.trim());
    }

    return result;
    }

    if (!/[\+\-\*\/\^]/.test(formula)) {
        return formula.trim();
    }

    if (formula.includes('(')) {
        const regex = /\(([^()]*)\)/g;
        const match = regex.exec(formula);
        if (match) {
            const innerExpr = match[1];
            const replacement = parseMathFormula(innerExpr);
            formula = formula.replace(match[0], replacement);
            return parseMathFormula(formula);
        }
    }
    const operators = ['^', '*', '/', '+', '-'];
    for (const operator of operators) {
        const chunks = splitByOperator(formula, operator);
        if (chunks.length > 1) {
            return `${operator}(${chunks.map(parseMathFormula).join(` ${operator} `)})`;
        }
    }
    return formula;
}; 

module.exports = function(code) {
    const mathFormulasLines = [];
    const mathLineRegex = /^[^]*?[+\-*/()\^%=\d\s]+[^]*$/gm;
    const matches = code.match(mathLineRegex);
    if (!matches) {
        return code;
    } 
    mathFormulasLines.push(...matches);
    let lines = code.split('\n');
    let line;
    let formula;
    let newcode = "";
    for (let i = 0; i < lines.length; i++) {
        line = lines[i];
        if (mathFormulasLines.includes(line)) {
            const mathLineRegex = /[+\-*/()\^%=\d\s]+/g;
            const matches = line.match(mathLineRegex);
            formula = matches[0];
            newcode += line.slice(0, ((-formula.length) - 1)) + betterformula(matches[0]) + "\n";
        } else {
            newcode += line + '\n';
        }
    }
    return newcode;
};