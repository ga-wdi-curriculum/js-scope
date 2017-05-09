(function() {
  "use strict";

  var instructor = {
    name: "Adam Bray",
    favoriteFoods: ["Ramen", "Capn Crunch", "Butter"],
    displayFoods: function() {
      this.favoriteFoods.forEach(function(food) {
        console.log(this.name + " likes " + food);
      });
    }
  };

  instructor.displayFoods();
})();
