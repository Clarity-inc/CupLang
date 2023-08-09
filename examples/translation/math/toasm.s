use (
    "betterstd",
    "String",
    "Int",
    "std",
    "Array",
    "Any"
)

func Main {
    arguments []
    let Int result = 0;
    push 29
    push 30
    push result
    call division
    push 7
    push result
    push result
    call mutliplication
    push 9
    push result
    push result
    call division
    push result
    call BetterPrint
}