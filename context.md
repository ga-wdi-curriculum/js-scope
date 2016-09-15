# Context

## Learning Objectives

- Explain Javascript 'context' and what the value of the 'this' keyword refers to
- Explain what the default context of Javascript executing in the browser is
- Use the 'this' keyword to set and retrieve a property in a Javascript function
- Use bind to create a new method bound to an object context
- Use apply/call to execute a method in a different context

## What is Context? (20 minutes / 1:30)

In Javascript, context tells us where functions are invoked.

In short, the context is the object that a function is attached to. We'll see that context can change under certain circumstances).

Every time a Javascript function is called, a context is determined / set. That context is always an object, and can be referenced in the function definition (code) using a special keyword in JS, `this`.

We use this similar to the way we use pronouns in natural languages like English and French. Say we write:

```
 “John is running fast because he is trying to catch the train.”
```

We could have written this:

```
“John is running fast because John is trying to catch the train.”
```

In a similar manner, we use the `this` keyword as a replacement for the subject in question.

### `this` in an Object

Here's an example of the most common way context is determined for a function. When a method is called on an object, that object becomes the context...

```js
var user = {
  firstName: "John",
  sayName: function(){
      alert("My name is " + this.firstName + ".");
  }
}
user.sayName();
```

<details>
  <summary><strong>What does <code>this</code> represent here?</strong></summary>

  > What's to the left of the period when `sayName` is called is `user`. So, `this === user`.

</details>

### A Rule of Thumb

In general, `this` is whatever was to the **left of the period** when it was called, unless...
- You're in an event listener function, in which case `this` is the thing that was clicked on.
- You're in another callback function, in which case `this` is probably the `Window`.

If you're ever unsure what `this` is at a given point in your code.

```js
console.log(this)
```

### 'Getting' Properties using `this`

```js
var instructor = {
  fullName: "Adam Bray",
  favoriteFood: "Spicy Miso Ramen",
  sayHello: function() {
    console.log("Hi! My name is " + this.fullName + ", and my favorite food is " + this.favoriteFood);
  }
}

instructor.sayHello() // for this function invocation, `this` is `instructor`
```

### 'Setting' Properties using `this`

This feature allows not just 'getting' property info on objects, but also setting properties. Consider this example:

```js
var xwing = {
    pilot: null,

    setPilot: function(newPilot) {
        this.pilot = newPilot;
    }
};

xwing.setPilot("Luke Skywalker"); //
xwing.pilot //  >> "Luke Skywalker"

xwing.setPilot("Andy Kim");
xwing.pilot;  // >> "Andy Kim"
```

*But what if we want more control?*

Because we've written a method to set the `pilot` property, we can use that method to provide more control. For example... what if we wanted to prevent inexperienced pilots from flying?

```js
var xwing = {
    pilot: null,

    setPilot: function(newPilot) {
      if (newPilot === "Andy Kim") {
        console.log("Still in training, that pilot is.")  
      }
      else {        
        this.pilot = newPilot;
        console.log("Pilot changed!")
      }
    }
  };

xwing.setPilot("Luke Skywalker"); // "Pilot changed!"
xwing.pilot //  >> "Luke Skywalker"


xwing.setPilot("Andy Kim"); // "Still in training, that pilot is."
xwing.pilot;  // >> "Luke Skywalker"
```

### 'Running' methods using `this`

We can also use `this` to reference and call other methods on the object.

```js
var xwing = {
    pilot: null,

    setPilot: function(newPilot) {
        this.pilot = newPilot;
        this.updateYoda();
    },

    updateYoda: function() {
      console.log("Yoda, we have got a new pilot!");
    }
};

xwing.setPilot("Luke Skywalker"); // "Yoda, we have got a new pilot!"
xwing.pilot //  >> "Luke Skywalker"
```

## Other `this` Cases (10 minutes / 1:40)

### Events

```html
<button>Hi there</button>
```

```js
$("button").on("click", function(){
  alert($(this).html());
});
```

<details>
  <summary><strong>What does <code>this</code> represent here?</strong></summary>

  > `this ===` the button, so it alerts "Hi there".

</details>

### Default Context

When a function is called, but it's not a method on an object, and no context is otherwise assigned (see later sections), then the context is set to the default context. In a browser, the default context is the `window` object.

```js
function revealThis() {
  console.log(this);
}

revealThis();
```

### Non-Event Callbacks

```js
var fruits = ["apple", "banana", "cantaloupe"];

fruits.forEach(function(){
  // this === the `Window` object
});
```

#### Aside: `forEach`

`forEach` is a Javascript method used to iterate through a collection and do something with each item in it.

```js
var fruits = ["apples", "bananas", "cherries"];

for(var i = 0; i < fruits.length; i++) {
  console.log("Every day I eat two " + fruits[i]);
}

fruits.forEach(function(currentFruit) {
  console.log("Every day I eat two " + currentFruit)
});
```

Note that it is very rare to intentionally use `this` to refer to the window object. Usually this happens when we mistakenly use this incorrectly (a very easy/common mistake for new and even experienced JS developers).

## You Do: Write, Pair, Share (5 minutes / 1:45)

Consider the following example...

```js
var instructor = {
  fullName: "Adam Bray",
  favoriteFoods: ["Ramen", "Capn Crunch", "Tacos"],

  displayFoods: function() {
    console.log("Things " + this.fullName + " likes:")
    this.favoriteFoods.forEach(function(food) {
      console.log(food);
    })
  }

}

instructor.displayFoods();
```

Using what we know about forEach, what do we expect the output to be?

Now what about this *slightly* modified example...

```js
var instructor = {
  fullName: "Adam Bray",
  favoriteFoods: ["Ramen", "Capn Crunch", "Tacos"],

  displayFoods: function() {
    this.favoriteFoods.forEach(function(food) {
      console.log(this.fullName + " likes " + food);
    })
  }

}

instructor.displayFoods();
```

### Answer

In the first case, `this` behaves like we would expect. It references `instructor` since it's inside a function attached to an `instructor`.

In the second case, `this` is inside an anonymous function, so it refers to the global object.

Note that this issue frequently appears anytime we use a callback / anonymous function, such as...
* using `setTimeout()` or `setInterval()` to schedule callbacks
* using `forEach()` or other iteration functions
* for event listeners passed into `someElement.addEventListener()`

## Fixing the Global `this` Gotcha (5 minutes / 1:50)

One trick is to store the `this` you want in another variable, commonly named `self` or `that`.

```js
var instructor = {
  fullName: "Adam Bray",
  favoriteFoods: ["Ramen", "Cap'n Crunch", "Tacos"],
  displayFoods: function() {
    var self = this;
    this.favoriteFoods.forEach(function(food) {
      console.log(self.fullName + " likes " + food);
    })
  }
}

instructor.displayFoods();
```

## Exercise: [Cat Surprise](https://github.com/ga-wdi-exercises/cat-surprise)

Use what we know about scope to explain why this works.

<!-- AM: Is there a more valuable exercise that can be used here? -->

## You Do: Test Your Context Knowledge (15 minutes / 2:05)

> 10 minutes exercise. 5 minutes review.

```js
/*A*/
var user = {
    firstName: "john",
    capitalized: function(){
        /*B*/
        return this.firstName.substring(0,1).toUpperCase() + this.firstName.substring(1);
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
    console.log("Keypress detected for " + this.firstName);
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
    - Because `user` is not accessible in the scope of the event listener
4. What is the value of `this` at D?
    1. The `keydown` event
    - `Window`
    - The element that was keyed-down upon
    - `user`
5. Why does the `user.sayName()` at the end **not** throw an error?
    1. Because `this` is `user`: what was to the left of the period
    - Because `user` didn't exist until it was created with the click event
    - Because it is called in the global scope

<details>

  <summary><strong>When you've finished...</strong></summary>

  <ol>
    <li>`Window`</li>
    <li>`user`</li>
    <li>Because `user.sayName` is in an event so `this` is not `user`. In an event listener `this` is always the HTML element that triggered the event.</li>
    <li>The element that was keyed-down upon</li>
    <li>Because `this` is `user`: what was to the left of the period</li>
  </ol>

</details>

## Next Steps

Read through the bonus section of this lesson plan, paying attention to the `bind`, `call` and `apply` methods. These are ways for you to exercise more control over and gain the ability to re-assign context.

Also take a look at this repo, which compares good and bad ways to apply context. We suggest reading up on `bind`, `call` and `apply` before doing so, however, since the examples make use of some of these methods.

## Peek Ahead: OOP Javascript

Often we have multiple pieces of data in our program that share the same structure. Think flash cards, trivia cards, bank accounts, etc.

In the future, we'll make these objects using "constructors" (think templates for each type), but then we need a way to talk about the structure in general. Context is a very necessary tool to accomplish this.

An example of what this might look like:

[ATM.js](https://github.com/ga-wdi-exercises/atm/blob/solution/solution/js/src/atm.js)
[Tunr Song Model](https://github.com/ga-wdi-exercises/tunr_node_oojs/blob/oojs_cud/public/js/models/artist.js)

-------

## Bind, Call and Apply (Bonus)

There are two other ways to invoke a function and change the context, which are very similar: `bind`, `call`, and `apply`.

These let you "force" `this` to be something specific.

### Bind

```js
var instructor = {
  name: "Adam Bray",
  favoriteFoods: ["Ramen", "Cap'n Crunch", "Tacos"],
  displayFoods: function() {
    this.favoriteFoods.forEach(function(food) {
      console.log(this.name + " likes " + food);
    }.bind(this))
  }
}

instructor.displayFoods();
```

[More information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### Call

```js
function sayHello() {
  console.log("Hi! My name is " + this.name);
}

var person = {name: "Manatee the Railyard Toreador"};
var cat = {name: "Hobbles McGillicudy"};
sayHello.call(person);
sayHello.call(cat);
```

`call` also lets us pass in the arguments to the function:

```js
function sayHello(favColor) {
  console.log("Hi! My name is " + this.name + " and I like " + favColor);
}

var person = {name: "Manatee the Railyard Toreador"};
var cat = {name: "Hobbles McGillicudy"};
sayHello.call(person, "blue");
sayHello.call(cat, "peachpuff");
```

[More information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

### Apply

`apply` works almost exactly like `call`, only you pass in *array* of arguments instead of a comma-separated list.

`apply` is useful when the number of arguments to pass to the function is unknown and/or arbitrary.

[More information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

--------

## Summary

Note that #1 is included here for correctness, we haven't covered object constructors yet, but will soon.

> 1. Is the function called with `new` (**new binding**)? If so, `this` is the newly constructed object.
>     `var supremePizza = new Pizza()`
>  
> 2. Is the function called with `call` or `apply` (**explicit binding**), even hidden inside a `bind` *hard binding*? If so, `this` is the explicitly specified object.
>     `var bakedPizza = bake.call( rawPizza )`
>  
> 3. Is the function called with a context (**implicit binding**), otherwise known as an owning or containing object? If so, `this` is *that* context object.
>     `var bakedPizza = rawPizza.bake()`
>  
> 4. Otherwise, default the `this` (**default binding**). If in `strict mode`, pick `undefined`, otherwise pick the `global` object.
>     `var probablyWontWork = bake()`
>
> Source: [You-Dont-Know-JS/ch2.md](https://github.com/getify/You-Dont-Know-JS/blob/58dbf4f867be0d9c51dfc341765e4e4211608aa1/this%20&%20object%20prototypes/ch2.md)

## References

* [Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
* [Understand JavaScript’s “this”](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
