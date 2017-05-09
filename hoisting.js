demo1(); // function declaration below is hoisted, so we can call it here

function demo1() {
  console.log("before: ");
  console.log(thingToBoop); // no error because variable declaration is hoisted
                            // to the top of the function, but it is 'undefined'

  var thingToBoop = "ur nose";

  console.log("after: ");
  console.log(thingToBoop); // variable has a value
}
