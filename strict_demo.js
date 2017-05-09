```js
// this is an example of an IIFE, or an Individually Invoked Function Expression
// none of the references inside of this function can be accessed outside of it
// an IIFE therefore introduces a closure around the variables, which are scoped
// the to the IIFE
(function() {
  // including the string "use strict" will single to the browser to throw an error if you declare a global variable
  "use strict";

  var instructor = {
    name: "Adam Bray",
    favoriteFoods: ["Ramen", "Capn Crunch", "Butter"],
    displayFoods: function() {
      this.favoriteFoods.forEach( function(food) {
        console.log(this.name + " likes " + food);
      });
    }
  };

  instructor.displayFoods();
})();
