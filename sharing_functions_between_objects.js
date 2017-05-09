function demo() {
  console.log("Hi! My name is " + this.name + ", and my favorite food is " + this.favoriteFood);
}

var instructor1 = {
  name: "Adam Bray",
  favoriteFood: "Spicy Miso Ramen",
  sayHello: demo
}

var instructor2 = {
  name: "Andy Kim",
  favoriteFood: "Blue Crab",
  sayHello: demo
}


instructor1.sayHello();
instructor2.sayHello();
