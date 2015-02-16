var featurecollection = require('turf-featurecollection');
var point = require('turf-point');
var polygon = require('turf-polygon');
var distance = require('turf-distance');

module.exports = function (bbox, cell, units) {
  var fc = featurecollection([]);
  var xFraction = cell / (distance(point([bbox[0], bbox[1]]), point([bbox[2], bbox[1]]), units));
  var cellWidth = xFraction * (bbox[2] - bbox[0]);
  var yFraction = cell / (distance(point([bbox[0], bbox[1]]), point([bbox[0], bbox[3]]), units));
  var cellHeight = yFraction * (bbox[3] - bbox[1]);

  var currentX = bbox[0];
  while (currentX <= bbox[2]) {
    var currentY = bbox[1];
    while (currentY <= bbox[3]) {
      var cellPoly = polygon([[
          [currentX, currentY],
          [currentX, currentY+cellHeight],
          [currentX+cellWidth, currentY+cellHeight],
          [currentX+cellWidth, currentY],
          [currentX, currentY]
        ]]);
      fc.features.push(cellPoly);

      currentY += cellHeight;
    }
    currentX += cellWidth;
  }
  
  return fc
}