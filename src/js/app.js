document.addEventListener("DOMContentLoaded", function () {
  const sweetScroll = new SweetScroll({});
}, false);

var lines = [];
var linesCount = 5;
var lastCreated = new Date();
var colors = ["#0B5351", "#00A9A5", "#4E8098", "#90C2E7"];

sketch = Sketch.create({
  container: document.getElementById('header'),
  retina: 'auto',
});
  
sketch.setup = function() { 
  spawn();
  spawn();
};

sketch.update = function() {
  if (lines.length != linesCount) {
    if (new Date() - lastCreated > random(1500, 2000)) {
      spawn();
      lastCreated = new Date();
    }
  };
  
  lines.forEach(function(line, i) {
    if (line.alive !== true) {
      lines.splice(i, 1);
    } else {
      line.update();
    }
  });
};

sketch.draw = function() {
  lines.forEach(function(line) {
    if (line.alive) {
      line.draw(sketch);
    }
  });
};
  
spawn = function() {
  lines.push(new Line(
    sketch.width * random(0, 1),
    random(50, 100),
    random(-20, 20)
  ));
};

Line = function(x, width, velocity, opacity) {
  this.init(x, width, velocity, opacity);
};

Line.prototype = {
  init: function(x, width, velocity) {
    this.alive = true;
    this.x = x || 0.0;
    this.width = width || 1.0;
    this.opacity = 0;
    this.velocity = Math.floor(velocity) || 1.0;
    this.vx = 0.1;
    this.vy = 0.1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.xModif = random(-100, 100);
    this.widthModif = random(0.1, 0.4);
    this.t = 0;
    this.opacityFadeout = random(200, 300);
  },
  
  update: function() {
    this.x += this.velocity/50;
    this.width += this.widthModif;
    this.opacity = Math.sin(this.t/this.opacityFadeout)
    if (this.opacity < 0) {
      this.alive = false;
    }
    this.t += 1;
  },
  
  draw: function(context) {
    context.globalAlpha = this.opacity/2;
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.moveTo(this.x, -50);
    context.lineTo(this.x + this.xModif, window.innerHeight + 200);
    context.stroke();
    context.closePath();
  }
}

