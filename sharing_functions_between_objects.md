```js
function demo() {
  console.log("Hi! My name is " + this.name + ", and my favorite food is " + this.favoriteFood);
}

var instructor1 = {
  name: "Nayana Davis",
  favoriteFood: "Fried Chicken",
  sayHello: demo
}

var instructor2 = {
  name: "Andy Whitley",
  favoriteFood: "Alabama Football",
  sayHello: demo
}


instructor1.sayHello();
instructor2.sayHello();
```
