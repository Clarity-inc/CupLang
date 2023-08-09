replace_string_end:
    push ebp
    mov ebp, esp
    mov edi, [ebp + 8]
    mov esi, [ebp + 12]
    xor ecx, ecx
    mov eax, edi
    find_end_of_string:
        cmp byte [eax], 0
        je found_end_of_string
        inc eax
        inc ecx
        jmp find_end_of_string

    found_end_of_string:
        xor edx, edx
        mov ebx, esi
        find_end_of_end_string:
            cmp byte [ebx], 0
            je found_end_of_end_string
            inc ebx
            inc edx
            jmp find_end_of_end_string

    found_end_of_end_string:
        cmp ecx, edx
        jb not_found
        sub eax, edx
        cmp dword [edi + eax], esi
        jne not_found
        mov byte [edi + eax], 0

    not_found:
        pop ebp
        ret