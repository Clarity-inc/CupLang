use (
    "betterstd",
    "String",
    "Int",
    "std",
    "Array",
    "Any"
)

section .data:
    result dd 0

section .text:
    global _start

_start:
    mov eax, result
    push 29
    push 30
    push eax
    call division
    push 7
    push eax
    push eax
    call mutliplication
    push 9
    push eax
    push eax
    call division
    push eax
    call BetterPrint
    pop eax
    ret