addition:
    push ebp
    mov ebp, esp
    mov eax, [ebp + 12]
    mov ebx, [ebp + 16]
    add eax, ebx
    mov [ebp + 8], eax
    pop ebp
    ret