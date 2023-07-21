section .text
global Length

Length:
    push ebp
    mov ebp, esp

    mov eax, [ebp+8]
    xor ecx, ecx 
    jmp loop_check

    loop:
        cmp byte [eax], 0
        je done
        inc eax
        inc ecx
        jmp loop

    loop_check:
        cmp ecx, [ebp+12]
        jae done
        test byte [eax], [eax]
        jz done
        jmp loop

    done:
        pop ebp
        ret