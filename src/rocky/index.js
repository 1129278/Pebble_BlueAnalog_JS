var rocky = require('rocky');

function fractionToRadian(fraction) {
  return fraction * 2 * Math.PI;
}

// Funktion zum Zeichnen der Stunden-Striche
function drawHourLines(ctx, cx, cy) {

  ctx.lineWidth = 4;

  // Begin drawing
  ctx.beginPath();

  // Draw lines
  // Specs
  var lineLength = 6;
  ctx.strokeStyle = "cyan";
  // Move to ..., then draw lines
  // 3
  ctx.moveTo(ctx.canvas.unobstructedWidth, cy);
  ctx.lineTo(ctx.canvas.unobstructedWidth - lineLength, cy);
  // 6
  ctx.moveTo(cx, ctx.canvas.unobstructedHeight - (cy-cx) );
  ctx.lineTo(cx, ctx.canvas.unobstructedHeight - (cy-cx+lineLength) );
  // 9
  ctx.moveTo(0, cy);
  ctx.lineTo(lineLength, cy);
  // 12
  ctx.moveTo(cx, cy-cx);
  ctx.lineTo(cx, cy-cx+lineLength);
  
  // Stroke the line (output to display)
  ctx.stroke();  
}

// Funktion zum Zeichnen der Stunden-Punkte
function drawHourDots(ctx, cx, cy) {
  
  ctx.lineWidth = 4;
  
  // Begin drawing
  ctx.beginPath();
    
  // Draw dots
  // Specs
  ctx.strokeStyle = "vivid cerulean";
  // Move to ..., then draw lines
  
  // 1
  ctx.moveTo(cx + cx*(1/2), cy - cx*(Math.sqrt(3)/2));
  ctx.lineTo(cx + cx*(1/2), cy - cx*(Math.sqrt(3)/2));
  // 2
  ctx.moveTo(cx + cx*(Math.sqrt(3)/2), cy - cx*(1/2));
  ctx.lineTo(cx + cx*(Math.sqrt(3)/2), cy - cx*(1/2));
  // 4
  ctx.moveTo(cx + cx*(Math.sqrt(3)/2), cy + cx*(1/2));
  ctx.lineTo(cx + cx*(Math.sqrt(3)/2), cy + cx*(1/2));
  // 5
  ctx.moveTo(cx + cx*(1/2), cy + cx*(Math.sqrt(3)/2));
  ctx.lineTo(cx + cx*(1/2), cy + cx*(Math.sqrt(3)/2));
  // 7
  ctx.moveTo(cx - cx*(1/2), cy + cx*(Math.sqrt(3)/2));
  ctx.lineTo(cx - cx*(1/2), cy + cx*(Math.sqrt(3)/2));
  // 8
  ctx.moveTo(cx - cx*(Math.sqrt(3)/2), cy + cx*(1/2));
  ctx.lineTo(cx - cx*(Math.sqrt(3)/2), cy + cx*(1/2));
  // 10
  ctx.moveTo(cx - cx*(Math.sqrt(3)/2), cy - cx*(1/2));
  ctx.lineTo(cx - cx*(Math.sqrt(3)/2), cy - cx*(1/2));
  // 11
  ctx.moveTo(cx - cx*(1/2), cy - cx*(Math.sqrt(3)/2));
  ctx.lineTo(cx - cx*(1/2), cy - cx*(Math.sqrt(3)/2));
  
  // Stroke the line (output to display)
  ctx.stroke();
  
}

// Funktion zum Zeichnen der Stunden-Ziffern
function drawHourNumbers(ctx, cx, cy) {
  
  // Verschiebung nach oben, um Ziffern gleichmaessig mittig zu setzen
  var moveY = 10;
  // Verschiebung in Richtung Mittelpunkt
  var moveR = 17;
  
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  
  ctx.fillText('1', cx + (cx-moveR)*(1/2), cy - (cx-moveR)*(Math.sqrt(3)/2) - moveY);
  ctx.fillText('2', cx + (cx-moveR)*(Math.sqrt(3)/2), cy - (cx-moveR)*(1/2) - moveY);
  ctx.fillText('3', ctx.canvas.unobstructedWidth-moveR, cy - moveY);
  ctx.fillText('4', cx + (cx-moveR)*(Math.sqrt(3)/2), cy + (cx-moveR)*(1/2) - moveY);
  ctx.fillText('5', cx + (cx-moveR)*(1/2), cy + (cx - moveR)*(Math.sqrt(3)/2) - moveY);
  ctx.fillText('6', cx, ctx.canvas.unobstructedHeight - (cy-cx) - moveY - moveR);
  ctx.fillText('7', cx - (cx-moveR)*(1/2), cy + (cx-moveR)*(Math.sqrt(3)/2) - moveY);
  ctx.fillText('8', cx - (cx-moveR)*(Math.sqrt(3)/2), cy + (cx-moveR)*(1/2) - moveY);
  ctx.fillText('9', 0 + moveR, cy - moveY);
  ctx.fillText('10', cx - (cx-moveR)*(Math.sqrt(3)/2), cy - (cx-moveR)*(1/2) - moveY);
  ctx.fillText('11', cx - (cx-moveR)*(1/2), cy - (cx-moveR)*(Math.sqrt(3)/2) - moveY);
  ctx.fillText('12', cx, cy-cx - moveY + moveR);
}


// Funktion zum Zeichnen von verschiedenen Kleinigkeiten
function drawOtherStuff(ctx, cx, cy) {

  // Specs
  ctx.lineWidth = 8;
  ctx.strokeStyle = "white";

  // Begin drawing
  ctx.beginPath();

  // Move to the center point, then draw the line
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy);
  
  // Stroke the line (output to display)
  ctx.stroke();
}


function drawHand(ctx, cx, cy, angle, length, lw, color) {
  
  // Find the end points
  var x2 = cx + Math.sin(angle) * length;
  var y2 = cy - Math.cos(angle) * length;

  // Hand-Specs
  ctx.lineWidth = lw;
  ctx.strokeStyle = color;

  // Begin drawing
  ctx.beginPath();

  // Move to the center point, then draw the line
  ctx.moveTo(cx, cy);
  ctx.lineTo(x2, y2);

  // Stroke the line (output to display)
  ctx.stroke();
}

rocky.on('draw', function(event) {
  
  var ctx = event.context;
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Mittelpunkt des Displays finden
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var cx = w / 2;
  var cy = h / 2;

  // -20 so we're inset 10px on each side
  var maxLength = (Math.min(w, h) - 20) / 2;

  // Calculate the minute hand angle
  var minuteFraction = (d.getMinutes()) / 60;
  var minuteAngle = fractionToRadian(minuteFraction);

  // Zeichne Minuten-Zeiger
  drawHand(ctx, cx, cy, minuteAngle, maxLength, 3, "white");

  // Calculate the hour hand angle
  var hourFraction = (d.getHours() % 12 + minuteFraction) / 12;
  var hourAngle = fractionToRadian(hourFraction);

  // Zeichne Stunden-Zeiger
  drawHand(ctx, cx, cy, hourAngle, maxLength * 0.5, 4, "white");
  
  // Zeichne die Stunden-Striche
  drawHourLines(ctx, cx, cy);
  
  // Zeichne die Stunden-Ziffern
  drawHourNumbers(ctx, cx, cy);
  
  // Zeichne die Stunden-Punkte
  drawHourDots(ctx, cx, cy);
  
  // Zeichne die Stunden-Ziffern
  drawOtherStuff(ctx, cx, cy);
  
});

rocky.on('minutechange', function(event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});