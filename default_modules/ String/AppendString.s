AppendString:
    push ebp
    mov ebp, esp
    mov edi, [ebp + 8]
    mov esi, [ebp + 12]
    xor ecx, ecx
    mov eax, edi
    find_end_of_dest_string:
        cmp byte [eax], 0
        je found_end_of_dest_string
        inc eax
        inc ecx
        jmp find_end_of_dest_string

    found_end_of_dest_string:
        mov ebx, esi

    copy_loop:
        mov al, [ebx]
        cmp al, 0
        je copy_done
        mov [eax + edi], al
        inc ebx
        inc edi
        jmp copy_loop

    copy_done:
    mov byte [edi], 0
    pop ebp
    ret