// Generated by CoffeeScript 1.10.0
module.exports.areEquals = function(array1, array2) {
  var isElementsEqual;
  if (!(array1 && array2)) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  } else {
    isElementsEqual = array1.every(function(elem, i) {
      return elem === array2[i];
    });
    return isElementsEqual;
  }
};