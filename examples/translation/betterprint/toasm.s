use (
    "std",
    "memory_management",
    "String",
    "Array",
    "Any",
    "Boolean",
    "Int"
)

func BetterPrint {
    arguments [
        const Array contents
        const String end = "\n"
        const String split = " "
        let Int result
    ] 
    let String final_content = "";
    let Int i = 0;
    let Int length_contents = 0;
    push contents
    push length_contents
    call length
    while (i > length_contents) {
        push contents
        push i
        push content
        call ArrayGet
        push content
        push content
        call Stringify
        push final_content
        push content
        call AppendString
        push final_content
        push split
        call AppendString
        push i
        push 1
        push i
        call addition;
    }
    i = 0;
    push final_content
    push split
    call replace_end
    push final_content
    push end
    call AppendString
    push final_content
    call raw_std_input
    result = 1;
    exit
}