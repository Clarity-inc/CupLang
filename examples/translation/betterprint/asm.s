use (
    "std",
    "memory_management",
    "String",
    "Array",
    "Any",
    "Boolean"
)



section .data:
    forifwiwief dd 0
    betterprintcontentsoinaswdf db "", 0, "", 0
    betterprintendoinaswdf db 10, 0
    betterprintsplitoinaswdf db ' ', 0

section .bss
    final_content resb 1024

_betterprint:
    push ebp
    mov ebp, esp
    sub esp, 12

    xor ecx, ecx
    mov edi, final_content
    while_loopfirst:
        mov eax, [esi + 4 * ecx]
        test eax, eax
        jz loop_end
        push eax
        cupcake Stringify
        push final_content
        push eax
        cupcake AppendString
        mov al, ' '
        stosb

        inc ecx
        jmp while_loop
    
    loop_end:
        push final_content
        push betterprintendoinaswdf
        cupcake ReplaceEnd
        push final_content
        cupcake raw_std_input
        mov eax, 1
        jmp cleanup
    
    catch_exception:
        mov eax, 0