ArrayRemove:
    mov eax, [ebp+8]
    mov ebx, [ebp+12]
    add eax, ebx
    mov ecx, [ebp+16] - 1
    sub ecx, ebx
    mov esi, eax
    add esi, 1
    mov edi, eax
    cld
    rep movsb
    dec [ebp+8]
    pop ebp
    ret