power:
    push ebp
    mov ebp, esp
    push ebx
    mov eax, 1
    power_loop:
        cmp ebx, 0
        je end_power_loop
        imul eax, eax, [ebp + 8]
        dec ebx
        jmp power_loop

    end_power_loop:
    mov [ebp + 16], eax
    pop ebx
    mov esp, ebp
    pop ebp
    ret