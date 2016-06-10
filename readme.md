# Scope, Context, and Closure

This lesson will cover lots of concepts commonly covered in **interview questions**.

This is because these are some of Javascript's most unique and nuanced features.

## Scope

**In real life:** Your "scope" is what your eyes can see from wherever you're standing.

**In Javascript:** Variables and functions have scope.

A variable's *scope* refers to the parts of the code from which the variable can be "seen" and used, or to the other variables and functions it can "see".

"If I define a variable in this part of my code, can I use it in that other part of the code?"

```js
var variableA = 1;
// I can access variableA here
// I CANNOT access variableB here
function myFunction(){
  var variableB = 2;
  // I can access variableA here
  // I can access variableB here
}
// I can access variableA here
// I CANNOT access variableB here
```

### Function Declarations and Expressions

#### Function Declaration

```js
function sayHello(){
    console.log("Hello!");
}
```

#### Function Expression

```js
var sayHello = function(){
    console.log("Hello!");
}
```

The only difference is that function declarations are "hoisted", and function expressions are not.

### Hoisting

**In real life:** When you "hoist" something, you raise it to the top of something else.

**In Javascript:** Functions and variables declared with `var` are hoisted.

Regardless of where you actually declare them in your code, they behave as if you declared them on the first line of their context.

```js
sayHello();
// "Hello, world!"

function sayHello(){
  alert("Hello, world!");
}
```

### Strict Mode

**In real life:** "Strict" means there are rules that must be followed.

**In Javascript:** Strict mode is a way in which your browser interprets Javascript.

Putting `"use strict";` as the first line of a page of code enables Strict Mode, which tells your browser to force you to write "better" code. For example, in strict mode, all variables must be declared with `var`: you cannot omit the `var` to make a global variable.

```js
name = "Steve";
// No error
```

```js
"use strict";

name = "Steve";
// Uncaught ReferenceError: name is not defined
```

### [More in-depth](scope.md)


### Review


```js
/* A */
var username = "XxXskaterBoi2004XxX";
/* B */
function logIn(){
    /* C */
    var sessionID = "8675309";
    /* D */
    return decrypt(sessionID);
    /* E */
    function decrypt(string){
        /* F */
        var token = profileID;
        /* G */
    }
    /* H */
}
/* I */
logIn();
/* J */
var profileID = 04011989;
/* K */
```

1. The variable `username` **has a value** on which lines? (That is: on which lines will `console.log`ging it not return `undefined`?)
    1. A, B, I, J, K
    - A and B
    - All lines
    - All lines except A
- The variable `profileID` **has a value** on which lines?
    2. A, B, I, J, K
    - K
    - All lines
    - All lines except A
- The variable `profileID` **is accessible** on which lines? (That is: on which lines can it be `console.log`ged without throwing an error?)
    3. A, B, I, J, K
    - K
    - All lines
    - All lines except A
- The variable `sessionID` **is accessible** on which lines?
    4. C, D, E, F, G, H
    - C, D, E, H
    - All lines
    - All lines except F and G
- The function `decrypt` **is accessible** on which lines?
    5. C, D, E, F, G, H
    - C, D, E, H
    - All lines
    - All lines except F and G

<details>
  <summary>When you've finished...</summary>
  <ol>
    <li>All lines except A. The variable is available on all lines due to hoisting, but it only has a value after `username =`.</li>
    <li>K. The variable is available on all lines due to hoisting, but it only has a value after `profileID =`.</li>
    <li>All lines.</li>
    <li>C, D, E, F, G, H</li>
    <li>C, D, E, F, G, H</li>
  </ol>
</details>

## Context

**In real life:** Something's "context" is the situation in which it occurs.

**In Javascript:** Lines of code have context.

This is because *every line of code in Javascript is run inside an object.* "Context" refers to the object inside which the line of code is being run.

The `this` variable refers to the object inside which the line of code is being run.

```
var user = {
  name: "Steve",
  sayHello: function(){
    console.log("My name is " + this.name);
  }
}
user.sayHello();
```

### [More in-depth](context.md)

### Review

```
/*A*/
var user = {
    name: "john",
    capitalized: function(){
        /*B*/
        return this.name.substring(0,1).toUpperCase() + this.name.substring(1);
    },
    sayName: function(){
        /*C*/
        alert("My name is " + this.capitalized() + ".");
    }
}

console.log("Welcome, " + user.capitalized() + "!");
$("button").on("click", user.sayName);
$("input").on("keydown", function(){
    /*D*/
    console.log("Keypress detected for " + this.name);
});
user.sayName();
/*E*/
```

When the code above is executed...

1. What is the value of `this` at A?
    1. `Window`
    - `null`
    - `user`
    - `$` (jQuery)
2. What is the value of `this` at B?
    1. `Window`
    - `null`
    - `user`
    - `$` (jQuery)
3. Why does the click event throw an error?
    1. Because there aren't parentheses after `user.sayName`
    - Because `user.sayName` is in an event so `this` is not `user`
    - Because you can't use `alert` inside a function
4. What is the value of `this` at D?
    1. The `keydown` event
    - `Window`
    - The element that was keyed-down upon
    - `user`
5. Why does the `user.sayName()` at the end **not** throw an error?
    1. Because `this` is `user`: what was to the left of the period
    - Because `user` didn't exist until it was created with the click event
    - Because I prayed really hard when writing this that it would work

<details>
  <summary>When you've finished...</summary>
  <ol>
    <li>`Window`</li>
    <li>`user`</li>
    <li>Because `user.sayName` is in an event so `this` is not `user`. In an event listener `this` is always the HTML element that triggered the event.</li>
    <li>The element that was keyed-down upon</li>
    <li>Because `this` is `user`: what was to the left of the period</li>
  </ol>
</details>

## Closure

**In real life:** "Closure" is the process of closing something and sealing it up, like a box or a container.

**In Javascript:** Functions have closure.

Regardless of where you *call* a function, it will always have access to the same variables and other functions it did when you first *declared* it.

Dip a bottle in the ocean, let the water flow in, close the bottle, then drive over to a freshwater lake and -- leaving it sealed -- drop the bottle in the lake. Even though the water outside the bottle has changed, the water inside the bottle is still the same.

When a function is declared it "lets in" all the variables in its scope, and then **closes** itself up -- hence, "closure".

```js
var name = "Steve";
function sayHello(){
  alert("Hi there, " + name + "!");
}

$(document).ready(function(){
  var name = "Moe";
  sayHello();
  // "Hi there, Steve!"
});
```

### [More in-depth](closures.md)

### Review

```js
function createUser(name){
  /* A */
  name = capitalize(name);
  function sayHello(){
    alert("Hi! I'm " + name + "!");
  }
  function sayBye(){
    alert("Hasta luego, Winnebago!");
  }
  return {
    name: name,
    greet: sayHello
  }
}
function capitalize(string){
  return string.substring(0,1).toUpperCase() + string.substring(1);
}
var user = createUser("john");
/* B */
```

1. What is the value of `user.name` at `B`?
  1. `undefined` or an error
  - `user`
  - `"john"`
  - `"John"`
  - `"Hi! I'm John!"`
- What would be the result of `user.sayHello()` at `B`?
  1. `undefined` or an error
  - `user`
  - `"john"`
  - `"John"`
  - `"Hi! I'm John!"`
- What would be the result of `user.sayBye()` at `B`?
  1. `undefined` or an error
  - `user`
  - `"john"`
  - `"John"`
  - `"Hi! I'm John!"`
- What would be the result of `user.capitalize('john')` at `B`?
  1. `undefined` or an error
  - `user`
  - `"john"`
  - `"John"`
  - `"Hi! I'm John!"`
- What would be the result of `createUser("steve").sayHello()` at `B`?
  1. `undefined` or an error
  - `user`
  - `"steve"`
  - `"Steve"`
  - `"Hi! I'm Steve!"`
- What is the value of `this` at `A`?
  1. `Window`
  - `user`

<details>
  <summary>When you've finished...</summary>
  <ol>
    <li>`"John"`</li>
    <li>`"Hi! I'm John!"`</li>
    <li>`undefined` or an error. In order for `sayBye` to be available outside the `user` object's scope, it needs to be `return`ed like `sayHello`.</li>
    <li>`undefined` or an error. `capitalize` is not attached to the `user`.</li>
    <li>`"Hi! I'm John!"`</li>
    <li>`Window`, because there is nothing *to the left of the period* -- nor any period at all -- when `createUser` is called.</li>
  </ol>
</details>

# Practice

## [Konami Kode](https://github.com/ga-wdi-exercises/konami_kode)
