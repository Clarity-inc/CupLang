ArrayAdd:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8]
    add eax, [ebp+12]
    mov byte [eax], byte [ebp+16]
    pop ebp
    ret