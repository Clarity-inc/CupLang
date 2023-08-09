section .data
    string_format db "[ ", 0   ; Format for the resulting string
    comma db ", ", 0           ; Comma separator
    string_end db " ]", 0      ; String end

section .bss
    result_string resb 100
    int_buffer resb 11

Stringify:
    mov eax, my_variable
    test eax, eax
    jnz itsanint
    mov eax, [ebp + 8]
    mov edi, [ebp + 12]
    mov esi, [ebp + 16]
    push eax
    push edi
    push esi
    call ArrayToString
    jmp exit
    itsanint:
        mov eax, [ebp + 8]
        mov edi, [ebp + 12]
        push eax
        push edi
        call IntToString
    exit:
        pop ebp
        ret

ArrayToString:
    push ebp
    mov ebp, esp
    push ebx
    push ecx
    push edx

    mov edi, [ebp + 8]
    mov ebx, [ebp + 12]
    mov ecx, [ebp + 16]
    mov eax, string_format
    mov edx, 2
    call CopyString
    xor eax, eax
LoopStart:
    cmp eax, ecx
    jge LoopEnd

    mov edx, [ebx + eax * 4]
    test edx, 1
    jz ProcessInteger
    call ProcessString
    inc eax
    cmp eax, ecx
    jge LoopEnd
    mov edx, comma
    call CopyString

    jmp LoopStart

ProcessString:
    mov edx, [edx]
    call CopyString
    ret

ProcessInteger:
    push eax
    mov eax, edx
    lea edi, int_buffer
    call IntToString
    pop eax
    call CopyString
    ret

LoopEnd:
    mov edx, string_end
    call CopyString
    mov eax, edi
    lea edi, [result_string]
    call CopyString

    ; Epilogue
    pop edx
    pop ecx
    pop ebx
    mov esp, ebp
    pop ebp
    ret

CopyString:
    pusha
    mov eax, edi
    cld
    xor ecx, ecx
    not ecx
    xor al, al
    repne scasb
    not ecx 
    dec ecx
    mov edi, eax
    sub edi, ecx
    mov eax, edx
    mov edx, ecx
    shr edx, 2
    rep movsd
    mov ecx, edx
    and ecx, 3
    rep movsb
    popa
    ret

IntToString:
    push ebp
    mov ebp, esp
    mov eax, [ebp + 8]
    mov edi, [ebp + 12]
    cmp eax, 0
    jnz not_zero
    mov byte [edi], '0'
    inc edi
    mov byte [edi], 0
    jmp done

    not_zero:
        test eax, eax
        js handle_negative
        jmp convert

    handle_negative:
        mov byte [edi], '-'
        inc edi
        neg eax 

    convert:
        xor ecx, ecx
        mov ebx, 10

    find_num_digits:
        xor edx, edx
        div ebx
        inc ecx
        test eax, eax
        jnz find_num_digits
        add edi, ecx
        mov ebx, 10

    convert_loop:
        xor edx, edx
        div ebx
        add dl, '0'
        dec edi
        mov [edi], dl
        test eax, eax
        jnz convert_loop

    done:
        pop ebp
        ret