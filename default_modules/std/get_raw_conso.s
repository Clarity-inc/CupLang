section .data
    _get_raw_consolebuffer db 1001
    _get_raw_consolebuffer_size equ 1001

get_raw_console:
    mov di, [ebp+8]
    mov ah, 0Ah
    mov dx, _get_raw_consolebuffer
    int 21h
    mov di, raw_console_return
    mov si, _get_raw_consolebuffer
    mov cx, _get_raw_consolebuffer_size
    rep movsb
    mov [ebp+8], di
    ret