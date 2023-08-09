# Welcome to cupLang!
CupLang is a simple compiled language for beginners and performance!
# Syntax
## Variables
In CupLang there are 3 modes for variables!<br>
Const, Let and Returning
### Const
You can't edit the value of the variable.
<br>
Here's how to create a const variable
```cup
const String myConst = "Hello, world!"
```
### Let
Let if the default variable you can edit the value of the variable.
<br>
Here's how to create a let variable
```cup
let String myLet = "Hello, world!";
// you can also remove the let if you want (it's the default so if you don't put anything the variable is a let)
String myLet = "Hello, world!";
```
### Returning
The non common one, what is a returning type?
<br>
A variable for lazy people, the variable that the function will return at the end of the function execution
<br>
Example
<br>
```cup
func this_function_returns_hello() -> String {
    returning String myreturning = "Hello";
}
```
The function now returns Hello!
<br>
The returning variable can take another type for instance
```cup
use (
    "file-manager"
)

func delete_all(normal: Dict, to_delete: String) -> Dict {
    returning const Dict myreturning = normal.remove(to_delete);
    FileDelete(normal[to_delete]);
}

```
(You can also write const returning Dict myreturning = normal.remove(to_delete))
<br>
In CupLang there are 5 variables types!
<br>
String, Int, Float, Dict and Array

### String
Strings are used to represent text. They have no character limits, allowing you to work with any text-based data.

Example:
```cup
String message = "Hello, cupLang!";
```
String formating is a bit simpler than every languages here!
<br>
Here's an example :
```cup
String message = "Hello, {username}!";
```
To put {} into your string just place a backslash before { 
### Int
Integers are whole numbers, both positive and negative, without decimal points.

Example:

```cup
Int age = 25;
```
### Float
Floats are used to represent numbers with decimal points.

Example:

```cup
Float pi = 3.14159;
```
### Dict (Dictionary)
Dictionaries store key-value pairs, allowing you to associate values with unique keys.

Example:

```cup
Dict person = dict{
    "name": "John",
    "age": 30,
    "city": "New York"
};
```
### Array
Arrays store lists of values. Each value can be accessed using its index.

Example:

```cup
Array fruits = array["apple", "banana", "orange"];
```
## Functions
### Main
The Main function is a very special function!
<br>
It runs when you launch your program of course but it's the only way you can get any arguments parsed by the shell
<br>
Example
<br>
Code
```cup
use (
    "betterstd"
)

func Main(Array arguments) {
    BetterPrint("Hello {arguments[0]}!");
}
```
If you want to have your arguments as a String, you can simply replace Array by String
Main will always return a void!
### Syntax
The syntax of a function is pretty simple
```cup
func Name(ArgumentType ArgumentName) -> returnType {
    // the code
}
```
For kwargs/infinite/default arguments or void type func the syntax is like that
```cup
func Name(Any all_of_my_arguments*, String my_kwargs, String my_default_kwarg = "Hi") {

}
```
(if the function returns nothing you don't have to put a return type)
### Execution
As simple as in all of the easy languages!
```cup
MyFuncName(argumentn1, kwargn1=kwargn1Value);
String myFuncValue = MyFuncName(argumentn1, kwargn1=kwargn1Value);
```
### For loops
You see in other languages for loops are boring and long to type?
<br>
Well not in CupLang!
<br>
Here is a for loop that will count to 80!
```cup
for (i*80) {
    BetterPrint(i);
}
```
That's so fast!
<br>
Here's a better example for an array length
```cup
for (ArrayNumber*length(MyArray)) {
    BetterPrint(i);
}
```
And for not starting from 0!
```cup
for (4+ArrayNumber*length(MyArray)) {
    BetterPrint(i);
}
```
And don't you dare even thinking about doing that!
```cup
for (ArrayNumber*length(MyArray)) {
    BetterPrint(MyArray[i]);
}
```
Because we once again have you covered :)
```cup
for (String content in MyArray) {
    BetterPrint(content);
}
```
And you tought that was everything !? No it's not!!!
```cup
for (String content in i*MyArray) {
    BetterPrint("{content} is the number {i}!");
}
```
And you tought that was all??? No!
```cup
for (String key, String value in MyDict) {
    BetterPrint("{key} is the key of the value {value}");
}
```
Again !?!?!? Well yes!
```cup
for (String key in MyDict) {
    BetterPrint("{key} is a key);
}
```
And last one!
```
for (String key, String value in i*MyDict) {
    BetterPrint("{key} is the key of the value {value} and number : {i}");
}
```
Note : You can also use typical ones (don't use them please.)
### While loops
While loops are like other languages but with a lazy way for true while loops
<br>
Example
<br>
Instead of
```cup
while (true) {
    BetterPrint("HIHIHI");
}
```
Do that
```cup
while {
    BetterPrint("HIHIHI");
}
```
# if, else, elif & finalif
## Signs
### ==
Comparing if the value of some things are the same
### =|=
Comparing if the type of the values are the same
### !=
Comparing if the type of the values are not the same
### <
Comparing if one value is smaller then the other (For integer/float only if variables are strings the length of the string are going to be compared)
### >
### <
Comparing if one value is bigger then the other (For integer/float only if variables are strings the length of the string are going to be compared)
### !
Reverse the condition
### and/&&
You can use ether && or and it's up to you, it unifies multiples conditions
### or/||
You can use ether || or or it's up to you, it adds multiples conditions that can return true if one is right
## if
The if statement is used to compare two values or more with a condition
<br>
Example:
```
if (hello == "Hello, world!") {
    BetterPrint("Hi");
}
```
## else
If the condition is false then else (if present) will be activated!
<br>
Example:
```
if (hello == "Hello, world!") {
    BetterPrint("Hi");
} else {
    BetterPrint("GoodBye!");
}
```
## elif
If the condition is false and you want to recheck with if it can take a lot place in your code and else if looks horrible so we made elif
<br>
Example:
```
if (hello == "Hello, world!") {
    BetterPrint("Hi");
} elif (hello == "hi") {
    BetterPrint("Hi!");
} else {
    BetterPrint("...");
}
```
## finalif
The new one, finalif is a function onlyif that will end the function in a proper way
<br>
For example:
<br>
Instead of
```cup
func Hello(String argument) {
    if (argument == "hi") {
        BetterPrint("Hello!");
        return;
    }
    BetterPrint("Ok");
}
```
Do that
```cup
func Hello(String argument) {
    finalif (argument == "hi") {
        BetterPrint("Hello!");
    }
    BetterPrint("Ok");
}
```
Or that, depends on your preferences
```cup
func Hello(String argument) {
    finalif (argument == "hi") {
        BetterPrint("Hello!");
    } else {
        BetterPrint("Ok");
    }
}
```
# Use
