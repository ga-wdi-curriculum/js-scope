# Scope, Context, and Closure

This lesson will cover lots of concepts commonly covered in **interview questions**.

This is because these are some of Javascript's most unique and nuanced features.

## Scope

**In real life:** Your "scope" is what your eyes can see from wherever you're standing.

**In Javascript:** Variables and functions have scope.

A variable's *scope* refers to the parts of the code from which the variable can be "seen" and used, or to the other variables and functions it can "see".

"If I define a variable in this part of my code, can I use it in that other part of the code?"

[More in-depth](scope.md)

## Context

**In real life:** Something's "context" is the situation in which it occurs.

**In Javascript:** Lines of code have context.

This is because *every line of code in Javascript is run inside an object.* "Context" refers to the object inside which the line of code is being run.

The `this` variable refers to the object inside which the line of code is being run.

[More in-depth](context.md)

## Closure

**In real life:** "Closure" is the process of closing something and sealing it up, like a box or a container.

**In Javascript:** Functions have closure.

Regardless of where you *call* a function, it will always have access to the same variables and other functions it did when you first *declared* it.

Dip a bottle in the ocean, let the water flow in, close the bottle, then drive over to a freshwater lake and -- leaving it sealed -- drop the bottle in the lake. Even though the water outside the bottle has changed, the water inside the bottle is still the same.

When a function is declared it "lets in" all the variables in its scope, and then **closes** itself up -- hence, "closure".

[More in-depth](closures.md)
