module.exports = function(code) {
    let old_letter = "";
    let is_big_comment = false;
    let is_comment = false;
    let new_code = "";
    for (const letter in code.split('')) {
        if (is_big_comment) {
            if (letter === '/'  && old_letter === '*') {
                    is_big_comment = false;
            }
        } else if (is_comment) {
            if (letter === '\n') {
                is_comment = false;
            }
        } else {
            if (letter === '*'  && old_letter === '/') {
                is_big_comment = true;
            } else if (letter === '/' && old_letter === '/') {
                is_comment = true;
            } else {
                new_code += letter;
            }
        }
        old_letter = letter;
    }
    return new_code;
}