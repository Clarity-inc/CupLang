division:
    push ebp
    mov ebp, esp
    mov eax, [ebp + 12]
    mov ebx, [ebp + 16]
    cmp ebx, 0
    je divide_by_zero_error
    cdq
    idiv ebx
    mov [ebp + 8], eax
    jmp exit
    divide_by_zero_error:
        mov [ebp + 8], 0
    exit:
        pop ebp
        ret