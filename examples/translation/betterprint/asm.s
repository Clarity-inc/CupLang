; The code of theses files
;    "std",
;    "memory_management",
;    "String",
;    "Array",
;    "Any",
;    "Boolean"

section .data:
    forifwiwief dd 0
    betterprintcontentsoinaswdf db "", 0, "", 0
    betterprintendoinaswdf db 10, 0
    betterprintsplitoinaswdf db ' ', 0
    final_content db "", 0
    length_contents dd 0
    content db "", 0

BetterPrint:
    mov eax, [ebp + 8]
    mov ebx, [ebp + 12]
    cmp ebx, 0
    jz betterprintenddefault
    BetterPrintnext:
        mov ecx, [ebp + 16]
        cmp ecx, 0
        jz betterprintsplitdefault
    jmp Betterprintvarend
    betterprintenddefault:
        mov ebx, betterprintendoinaswdf
        jmp BetterPrintnext
    betterprintsplitdefault:
        mov ecx, betterprintsplitoinaswdf
    Betterprintvarend:
        mov edi, [ebp + 20]
    mov rax, final_content
    mov esi, 0
    mov edx, length_contents
    push eax
    push edx
    call length
    mov rbx, content
    while_loop:
        cmp esi, edx
        jg end_while_loop
        push eax
        push esi
        push rbx
        call ArrayGet
        push rbx
        push rbx
        call Stringify
        push rax
        push rbx
        call AppendString
        push rax
        push ecx
        call AppendString
        push esi
        push 1
        push esi
        call addition;
        jmp while_loop
    end_while_loop:
        mov esi, 0
        push rax
        push ecx
        call replace_end
        push rax
        push ebx
        call AppendString
        push rax
        call raw_std_input
        mov edi, 1
        mov [ebp + 20], edi
        pop edi
        pop ecx
        pop ebx
        pop eax
        pop esi
        pop rax
        pop rbx
        pop ebp
        ret