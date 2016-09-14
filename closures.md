# Closures

## Learning Objectives

- Define what a closure is
- Explain why closures are used
- Write a function that uses a closure to control access to data
- Explain why and from what we are trying to protect data

## What are Closures?

**In real life:** "Closure" is the process of closing something and sealing it up, like a box or a container.

Dip a bottle in the ocean, let the water flow in, close the bottle, then drive over to a freshwater lake and -- leaving it sealed -- drop the bottle in the lake. Even though the water outside the bottle has changed, the water inside the bottle is still the same.

**In Javascript:** Functions have closure.

Closure is the property of a function such that it can access variables in the same scope it was declared in.

Regardless of where you *call* a function, it will always have access to the same variables and other functions it did when you first *declared* it.

All functions in Javascript are closures. This has four key implications...
  1. We can pass functions around by putting them in variables or referencing them by name.  
  2. Functions can be passed in as arguments to other functions.  
  3. Functions can return other functions.  
  4. No matter how they are passed around, a function 'remembers' the variables in scope at the time of it's definition.  

## Storing Functions

We've already seen that we can store functions in variables...

```js
var sayHello = function() {
  console.log("hello!");
}

sayHello();
```

## Passing Functions as Arguments

We've already seen that we can use functions as arguments. Consider this event listener...

```js
function alertUser() {
  console.log("Warning!");
}

var button = document.getElementById("big-red-button")
button.addEventListener("click", alertUser);

// or
var button = document.getElementById("big-red-button")
button.addEventListener("click", function() {
  console.log("Warning!");
});
```

### Returning Functions / Remembering Scope

```js
function sayHelloGenerator(){
  var prefix = "Hello ";

  function hey(name){
    return prefix + name;
  };

  return hey;
};

var sayHey = sayHelloGenerator();

var msg = sayHey("Bart");
console.log(msg);
// "Hello Bart"
```

#### You Do: Scope Diagram

Write the scope diagram for the code above, and describe what happens as it runs step by step.

## A More Complex Example

The key to understanding closure is to know that a function declared in a scope can always access other variables in that scope.

This is true even when that function is executing outside of the declaring function. For example...

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

## Encapsulation

Encapsulation is a software concept where one separates the implementation from the interface that is used by clients.

It's often good to *hide* the details of how something is being done from outside code, that is the client code.

This will reduce the knowledge needed by the client.

For example, when we drive our cars we don't worry about the specifics of the engine or drivetrain. We interface with the car using the gas pedal, brake and steering wheel.

The engine and drivetrain are part of the car's implementation.

The gas pedal, brake pedal and steering wheel are the car's interface to client, the driver.

**Create a file `js/makePerson.js`**

Below is a people factory. Give it a name and an age and it'll create a person.
That is, it will create objects that represent a specific person.

```js
function makePerson( fullName, currentAge ){
  var name = fullName;  // 1
  var age = currentAge;  // 1

  var person = {   // 2  and 3
    getName: function(){
      return( name );
    },

    getAge: function(){
      return( age - 10 );
    }
  };

  return( person );
}

// Create a new person instance.
var bob = makePerson( "Bob", 45 ); //5

// Check to see if the age property exists in a public
// portion of the person instance.
// 7
console.log("Can we access the Bob's age?")
console.log("age" in bob)  

// Get the age using the accessors.
// 8
console.log("Age is (little lie here):")
console.log(bob.getAge())
);

```

1. We are creating an object literal, `{ ... }`. This will have two properties, getName and getAge. The value for both of these properties are functions.  
2. We assign this object literal to the variable person.  
3. We return the object person to the calling function.
4. We use the factory to create a "bob" person.  
5. We check to see if we can access the private variable `age` outside of the factory function. **We can't**  
6. We get bob's age by calling the getAge method. *Of course it lies*. And we're hiding the lie!


Note, the interface to the object 'bob' is two functions/methods, getName and getAge. That's all that client code needs to know about bob.

The implementation are the private variables `name`, `age` and the code inside the getName and getAge functions.

Client code does **NOT** need to be concerned with implementation details. Only with the interface.

## Test Your Closure Knowledge

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
- What would be the result of `createUser("steve").greet()` at `B`?
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
    <li>`undefined` or an error, because `sayHello` has been attached to a property called `greet`.</li>
    <li>`undefined` or an error. In order for `sayBye` to be available outside the `user` object's scope, it needs to be `return`ed like `sayHello`.</li>
    <li>`undefined` or an error. `capitalize` is not attached to the `user`.</li>
    <li>`"Hi! I'm John!"`</li>
    <li>`Window`, because there is nothing *to the left of the period* -- nor any period at all -- when `createUser` is called.</li>
  </ol>
</details>

## References

* [Getting Closure](http://markdaggett.com/blog/2013/02/25/getting-closure/)
* [Understand closures with ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)  
* [Closure FAQ](http://jibbering.com/faq/notes/closures)
* [Closure Use Cases](http://www.bennadel.com/blog/2134-a-random-exploration-of-closure-use-cases-in-javascript.htm)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
