# Scope

## Learning Objectives

- Define 'scope' in the context of programming
- Describe the rules of scope in Javascript
- Give an example of a function declaration and a function expression
- Describe the impact of hoisting on variable scope
- Describe the purpose of `use strict`

## Why Scope? Why Now?

>Understanding JavaScript scope is key to writing bulletproof code and being a better developer. You’ll understand where variables/functions are accessible, be able to change the scope of your code’s context and be able to write faster and more maintainable code, as well as debug much faster.

## What is Scope?

In programming, scope is where a variable can be referenced; in other words, where it can be used.

Another way to think of scopes is that the scope is a list of all variables that can be accessed from the current line.

## Quick Example

```js
function demo0() {
  thingToDo = "boop";
}

demo0();
console.log(thingToDo);


function demo1() {
  var recipient = "ur nose";
}

demo1();
console.log(recipient);
```

What do we expect this code to do? Run it and see! Why?


## Rules of Scope in JS

In Javascript, there are two types of scope, **global scope** and **local scope**.

There are four simple rules regarding scope in JS:

1. Variables created **without** the `var` keyword, no matter where in a program, are placed in the global scope.
2. Variables created **with** the `var` keyword are created in the current local scope. **This is bad form.**
3. All functions (and only functions) create a new local scope.
4. The current scope includes all outer (enclosing) scopes.

Another way to say this:

* Local variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function.
* However, a function can access all variables and functions defined inside the scope in which it is defined.

**Note:** One consequence of rule 3 is that variables defined outside of any function are inherently global, even if the `var` keyword is used.

### Example

```js
teamName = "Giraffes";  // no var -> global
var teamCity = "Sioux Falls"; // global because not in any function

function playBaseball() {
  console.log("From " + teamCity + "..."); // works, local variable in outer scope
  console.log("Welcome the " + teamName + "!"); // works, globals always in scope

  pitcherName    = "Jesse Shawl";
  var batterName = "Breece Horper";

  console.log(batterName);  // works, local variable in scope
  console.log(pitcherName); // works, globals always in scope
}

playBaseball()

console.log(teamName); // works, globals always in scope
console.log(teamCity);   // works, local variable in current scope

console.log(pitcherName); // works, globals always in scope
console.log(batterName);  // DOES NOT WORK, variable is an inner scope

console.dir(window); // note how favoriteAnimal / favoriteFood are properties of window.
```

### Strict Mode

The fact that Javascript lets you declare variables without `var` is heavily-criticized: it can make for some pretty gnarly code.

So, "Strict Mode" was introduced. When you enable Strict Mode it "converts mistakes into errors": bad habits that would normally be swept under the rug by your browser now throw errors, forcing you to write better code.

To enbale Strict Mode, simply make the first line of your `.js` file `"use strict";`.

For example:

```js
fruit = "banana";

// ...
```

```js
"use strict";

fruit = "banana";

// Uncaught ReferenceError: fruit is not defined
```

## Hoisting

### Functions

There are two ways to declare functions in Javascript:

```js
var sayHello = function(){
    console.log("Hello!");
}

function sayHello(){
    console.log("Hello!");
}
```

`var sayHello = function` is called a **function expression**. It follows the same rules as variables (except it's a function): it's only available in the lines after it.

`function sayHello`is a **function declaration**. No matter where you put it in your code, it behaves as if you wrote it as the very first line in your code. This is called **hoisting**.

Aside from that, they are functionally equivalent.

### Variables

Variables are hoisted too, but *their values are not*.

```js
console.log("My name is " + name);

var name = "John";

// My name is undefined
```

```js
console.log("My name is " + name);

// Uncaught ReferenceError: name is not defined
```

### More Interesting / Complex

```javascript
var firstName = 'John';
var lastName = 'Dowd';
var age = 19;

console.log(displayPerson(firstName, lastName));
console.log(removeYears());

function displayPerson(fname, lname){
  var prefix = 'Mr';
  var fullName = null;

  function getFullName(){
    var suffix = "Esq.";
    return  fullName = prefix + " " + fname + " " + lname + " " + suffix;
  };

  return getFullName();
};

function removeYears(){ // 8
  var minusYears = 10
  var age = 49;
  return age - minusYears;
};

```

## Scope Matching

```js
/* A */
var username = "XxXskaterBoi2004XxX";
/* B */
function logIn(){
    /* C */
    var session_id = "8675309";
    /* D */
    return decrypt(session_id);
    /* E */
    function decrypt(string){
        /* F */
        var token = profile_id;
        /* G */
    }
    /* H */
}
/* I */
logIn();
/* J */
var profile_id = 04011989;
/* K */
```

1. The **value** of the variable `username` is defined on which lines? (That is: on which lines will `console.log`ging it not return `undefined`?)
    1. A, B, I, J, K
    - A and B
    - All lines
    - All lines except A
- The **value** of the variable `profile_id` is defined on which lines?
    2. A, B, I, J, K
    - K
    - All lines
    - All lines except A
- The variable `profile_id` **itself** is defined on which lines? (That is: on which lines can it be `console.log`ged without throwing an error?)
    3. A, B, I, J, K
    - K
    - All lines
    - All lines except A
- The variable `session_id` is defined on which lines?
    4. C, D, E, F, G, H
    - C, D, E, H
    - All lines
    - All lines except F and G
- The function `decrypt` is defined on which lines?
    5. C, D, E, F, G, H
    - C, D, E, H
    - All lines
    - All lines except F and G

## Sample Quiz Questions

1. Describe the rules of scope in JS.
2. Write an example program that tries to access a variable out of scope.

## References

* [Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
