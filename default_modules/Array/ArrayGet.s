ArrayGet:
    push ebp
    mov ebp, esp
    mov ecx, [ebp + 8]
    mov eax, [ebp + 12]
    imul eax, eax, 4
    mov esi, ecx
    add esi, eax
    mov eax, [esi]
    mov [ebp + 16], eax
    mov esp, ebp
    pop ebp
    ret