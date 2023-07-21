ArrayGet:
    push ebp
    mov ebp, esp
    mov ecx, [ebp + 8]
    mov edx, [ebp + 12]
    mov eax, [ebp + 16]
    movzx eax, edx
    imul eax, eax, 4
    mov esi, ecx
    add esi, eax
    mov eax, [esi]
    mov [ebp + 16], eax
    mov esp, ebp
    pop ebp
    ret