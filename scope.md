# Scope

## Learning Objectives

- Describe **scope** and how it governs how data is able to be accessed in code
- Give an example of a **function declaration** and a **function expression**
- Describe the impact of **hoisting** on variable **scope**

## Why Scope? Why Now?

Understanding JavaScript scope is key to writing bulletproof code and being a better developer. You’ll understand where variables and functions are accessible, be able to change the scope of your code’s context and be able to write faster and more maintainable code. Plus, you'll be able to debug much faster.

Chances are, you'll be asked about it during technical interviews too.

## What Is Scope? (15 minutes / 0:15)

**In real life:** Your "scope" is what your eyes can see from wherever you're standing.

**In Javascript:** scope is...
* Where a variable can be referenced/used.
* A list of all variables that can be accessed from a given line of code.

> Two ways of saying the same thing.

## Quick Example

Here's a code snippet that demonstrates some of Javascript's fundamental rules of scope...

```js
function getColor() {
  color = "red";
}

getColor();
console.log(color); // What should we see in the console?


function getAnotherColor() {
  var anotherColor = "green";
}

getAnotherColor();
console.log(anotherColor); // What should we see in the console?
```

## Rules of Scope in JS

In Javascript, there are two types of scope: **global scope** and **local scope**.

There are four simple rules that are helpful in introducing the concept of scope in JS...

1. Variables created **without** the `var` keyword, no matter where in a program, are placed in the global scope. **This is bad form.**
2. Variables created **with** the `var` keyword are created in the current local scope.
3. All functions create a new local scope.
4. The current scope includes all outer (enclosing) scopes.

> One consequence of rule 3 is that variables defined outside of any function are inherently global, even if the `var` keyword is used.

![scope diagram](http://www.datchley.name/content/images/2015/08/js-es5-scope-2.png)

Another way to say this...

* **Local variables** defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function.
* However, a function can access all variables and functions defined inside the scope in which it is defined.

### We Do: A More Complex Example (15 minutes / 0:30)

Let's walk through this example in two steps...
  1. Identify and diagram the scope of each variable.  
  2. Determine whether each `console.log` will error out or not.

```js
teamName = "Giraffes"; // What scope is this?
var teamCity = "Sioux Falls"; // What scope is this?

function playBaseball() {
  console.log("From " + teamCity + "..."); // Does this work?
  console.log("Welcome the " + teamName + "!"); // Does this work?

  pitcherName    = "Jesse Shawl"; // What scope is this?
  var batterName = "Breece Horper"; // What scope is this?

  console.log(batterName);  // Does this work?
  console.log(pitcherName); // Does this work?
}

playBaseball();

console.log(teamCity); // Does this work?
console.log(teamName);   // Does this work?

console.log(pitcherName); // Does this work?
console.log(batterName);  // Does this work?
```

<details>
  <summary><strong>List of scopes for this example...</strong></summary>

  > `teamName` = global (no var)  
  > `teamCity` = global (not in a function)  
  > `pitcherName` = global (no var)  
  > `batterName` = local to `playBaseball`  

</details>

## Hoisting

### Functions

A Javascript feature that may impact scope is **hoisting**. This applies to Javascript functions.

Recall that there are two ways to declare functions in Javascript, **function declarations** and **function expressions**.

```js
var sayHello = function(){
    console.log("Hello!");
}

function sayHello(){
    console.log("Hello!");
}
```

#### Hoisting Review

<details>
  <summary>
    Which is a <strong>function declaration</strong>? Which is a <strong>function expression</strong>?
  </summary>
  <code>var sayHello = function(){}</code> is a <strong>function expression</strong>.
  <code>function sayHello(){}</code> is a <strong>function declaration</strong>.
</details>

<details>
  <summary>
    How does a <strong>function declaration</strong> differ from a <strong>function expression</strong>?
  </summary>
  A <strong>function expression</strong> follows the same rules as variable assignment. Since the value of the reference is a function, that function is only available in the lines after the value assignment.

  With a <strong>function declaration</strong>, no matter where you put it in your code, it behaves as if you wrote it as the very first line in your code.

  Aside from that, they are functionally equivalent.
</details>





### Variables

Variable are hoisted too, but *their values are not*. More precisely, variable initializations are hoisted, but value assignments are not hoisted.

Variables are first **initialized**, meaning a space in memory is reserved or allocated for the name, but no value is assigned. That variable (or **reference**) will return `undefined` instead of triggering a `ReferenceError`.


```js
console.log("My name is " + firstName);

var firstName = "John";

// My name is undefined
```

### You Do: An Even More Complex Example (15 minutes / 0:45)

> 10 minutes exercise. 5 minutes review.

In pairs, follow the same process we did in the "We Do" earlier.
  1. Identify and diagram the scope of each variable.  
  2. Determine whether each `console.log` will error out or not.

```javascript
var firstName = 'John'; // What scope is this?
var lastName = 'Dowd';  // What scope is this?
var age = 19;  // What scope is this?

console.log(displayPerson(firstName, lastName));  // Does this work?
console.log(removeYears()); // Does this work?

function displayPerson(fname, lname){ // What scope are these arguments?
  var prefix = 'Mr';  // What scope is this?
  var fullName = null;  // What scope is this?

  function getFullName(){
    var suffix = "Esq.";  // What scope is this?
    return fullName = prefix + " " + fname + " " + lname + " " + suffix;
  };

  return getFullName();
};

var removeYears = function(){
  var minusYears = 10  // What scope is this?
  var age = 49; // What scope is this?
  return age - minusYears;
};
```

## You Do: Test Your Scope Knowledge (15 minutes / 1:00)

> 10 minutes exercise. 5 minutes review.

Answer the questions below the following code snippet. The letters in the questions and answer choices reference lines in the snippet.

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
var profileID = 4011989;
/* K */
```

1. The variable `username` **has a value** on which lines? (That is: on which lines will `console.log`ing it not return `undefined`?)
  - A, B, I, J, K
  - A and B
  - All lines
  - All lines except A
1. The variable `profileID` **has a value** on which lines?
  - A, B, I, J, K
  - K
  - All lines
  - All lines except A
1. The variable `profileID` **is accessible** on which lines? (That is: on which lines can it be `console.log`ged without throwing an error?)
  - A, B, I, J, K
  - K
  - All lines
  - All lines except A
1. The variable `sessionID` **is accessible** on which lines?
  - C, D, E, F, G, H
  - C, D, E, H
  - All lines
  - All lines except F and G
1. The function `decrypt` **is accessible** on which lines?
  - C, D, E, F, G, H
  - C, D, E, H
  - All lines
  - All lines except F and G

<details>

  <summary><strong>When you've finished...</strong></summary>

  <ol>
    <li>All lines except A. The variable is available on all lines due to hoisting, but it only has a value after `username =`.</li>
    <li>K. The variable is available on all lines due to hoisting, but it only has a value after `profileID =`.</li>
    <li>All lines.</li>
    <li>C, D, E, F, G, H</li>
    <li>C, D, E, F, G, H</li>
  </ol>

</details>

## Break (10 minutes / 1:10)

-------

## Sample Quiz Questions

1. Describe the rules of scope in JS.
2. Write an example program that tries to access a variable out of scope.

## References

* [Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
