raw_std_input:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8]
    mov ebx, eax
    mov eax, 4
    mov ecx, ebp 
    add ecx, 12
    sub edx, 12
    int 0x80
    mov esp, ebp
    pop ebp
    ret