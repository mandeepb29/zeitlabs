$(function($) {
  "use strict";

  //aos initialization
  if (screen.height <= 520) {
    AOS.init({
      // Global settings:
      disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "load", // name of the event dispatched on the document, that AOS should initialize on
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 200, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1200, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
    });
  }
  if (screen.width <= 520 && screen.height >= 520) {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "load", // name of the event dispatched on the document, that AOS should initialize on
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 150, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1200, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
    });
  } else {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "load", // name of the event dispatched on the document, that AOS should initialize on
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 200, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1200, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
    });
  }
  AOS.refresh();

  //---------------HEADER-------------//

  //for sticking the header
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 80) {
      $(".navbar").addClass("navbar-on-scroll");
    } else {
      $(".navbar").removeClass("navbar-on-scroll");
    }
  });

  //toggle hamburger on toggle
  let hamburger = document.querySelector(".hamburger");
  let navLinks = document.querySelectorAll(".navlink");
  let links = document.querySelectorAll(".navlink a");
  let menu = document.querySelector(".menu");

  if (innerWidth <= 768) {
    $(links).on("click", function() {
      $(menu).toggleClass("menu-opened");
      $(hamburger).toggleClass("open");
    });
  }

  $(hamburger).on("click", function() {
    $(menu).toggleClass("menu-opened");
    $(this).toggleClass("open");
    //$(navLinks).toggleClass("fade");
    // console.log("menu-opened");
  });

  //initialize wow.js

  new WOW().init();

  // Smooth scroll for the navigation and links with .scrollto classes
  $(".navlink a, .scrollto").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($(".navbar").length) {
          top_space = $(".navbar").outerHeight();

          if (!$(".navbar").hasClass(".navbar-on-scroll")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1200,
          "easeInOutQuint"
        );

        // return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".menu");
  var main_nav_height = $(".navbar").outerHeight();

  $(window).on("scroll", function() {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find("li").removeClass("highlight");
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("highlight");
      }
    });
  });
});

//--------------------------------------------------------------------------------------------
//----------------------------canvas with circular disc animation-----------------------------
//--------------------------------------------------------------------------------------------

// Initial Setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 5,
  y: innerHeight / 2.5
};

if (innerWidth <= 768) {
  (mouse.x = innerWidth / 3.5), (mouse.y = innerHeight / 3.2);
}

if (innerWidth <= 480) {
  (mouse.x = innerWidth / 2), (mouse.y = innerHeight / 1.65);
}

// Variables

//color of the circle
const colors = ["grey", "266da7", "slategrey"];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Particle(x, y, radius, color) {
  let vardistance;

  if (innerWidth <= 480) {
    vardistance = randomIntFromRange(innerHeight / 12, innerHeight / 5);
  } else if (innerWidth <= 768) {
    vardistance = randomIntFromRange(innerHeight / 10, innerHeight / 6);
  } else {
    vardistance = randomIntFromRange(innerWidth / 16, innerWidth / 7.5);
  }

  const distance = vardistance;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.045;
  this.distanceFromCenter = {
    x: distance,
    y: distance
  };

  this.prevDistanceFromCenter = {
    x: distance,
    y: distance
  };

  this.lastMouse = { x: x, y: y };

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y };
    // Move points over time
    this.radians += this.velocity;

    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    //Circular Motion
    this.distanceFromCenter.x =
      this.prevDistanceFromCenter.x + Math.sin(this.radians);
    this.distanceFromCenter.y =
      this.prevDistanceFromCenter.x + Math.sin(this.radians);

    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;

    this.draw(lastPoint);
  };

  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 60; i++) {
    if (innerWidth <= 420 || innerHeight <= 420) {
      // const radius = (Math.random() * 1) + 0.2;
      // particles.push(new Particle(25, 25, radius, randomColor(colors)));
    } else {
      const radius = Math.random() * 1 + 1;
      particles.push(new Particle(25, 25, radius, randomColor(colors)));
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(246, 192, 20, 0.06)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();

//--------------------------------------------------------------------------------------------
/*--------------------------------------bubbles animation---------------------------------- */
//--------------------------------------------------------------------------------------------

(function() {
  "use strict";

  var lava0;
  var ge1doot = {
    screen: {
      elem: null,
      callback: null,
      ctx: null,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      init: function(id, callback, initRes) {
        this.elem = document.getElementById(id);
        this.callback = callback || null;
        if (this.elem.tagName == "CANVAS")
          this.ctx = this.elem.getContext("2d");
        window.addEventListener(
          "resize",
          function() {
            this.resize();
          }.bind(this),
          false
        );
        this.elem.onselectstart = function() {
          return false;
        };
        this.elem.ondrag = function() {
          return false;
        };
        initRes && this.resize();
        return this;
      },
      resize: function() {
        var o = this.elem;
        this.width = o.offsetWidth;
        this.height = o.offsetHeight;
        for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
          this.left += o.offsetLeft;
          this.top += o.offsetTop;
        }
        if (this.ctx) {
          this.elem.width = this.width;
          this.elem.height = this.height;
        }
        this.callback && this.callback();
      }
    }
  };

  // Point constructor
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = x * x + y * y;
    this.computed = 0;
    this.force = 0;
  };
  Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
  };

  // Ball constructor
  var Ball = function(parent) {
    if (innerWidth <= 480) {
      var min = 0.5;
      var max = 1.5;
    } else {
      var min = 0.2;
      var max = 1;
    }

    this.vel = new Point(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25),

      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    );
    this.pos = new Point(
      parent.width * 0.2 + Math.random() * parent.width * 0.6,
      parent.height * 0.2 + Math.random() * parent.height * 0.6
    );
    this.size =
      parent.wh / 15 + (Math.random() * (max - min) + min) * (parent.wh / 15);
    this.width = parent.width;
    this.height = parent.height;
  };

  // move balls
  Ball.prototype.move = function() {
    // bounce borders
    if (this.pos.x >= this.width - this.size) {
      if (this.vel.x > 0) this.vel.x = -this.vel.x;
      this.pos.x = this.width - this.size;
    } else if (this.pos.x <= this.size) {
      if (this.vel.x < 0) this.vel.x = -this.vel.x;
      this.pos.x = this.size;
    }

    if (this.pos.y >= this.height - this.size) {
      if (this.vel.y > 0) this.vel.y = -this.vel.y;
      this.pos.y = this.height - this.size;
    } else if (this.pos.y <= this.size) {
      if (this.vel.y < 0) this.vel.y = -this.vel.y;
      this.pos.y = this.size;
    }

    // velocity
    this.pos = this.pos.add(this.vel);
  };

  // lavalamp constructor
  var LavaLamp = function(width, height, numBalls, c0, c1) {
    this.step = 5;
    this.width = width;
    this.height = height;
    this.wh = Math.min(width, height);
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);
    this.paint = false;
    this.metaFill = createRadialGradient(
      width,
      height,
      width,
      c0,

      c1
    );
    this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
    this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
    this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
    this.grid = [];
    this.balls = [];
    this.iter = 0;
    this.sign = 1;

    // init grid
    for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
      this.grid[i] = new Point(
        (i % (this.sx + 2)) * this.step,
        Math.floor(i / (this.sx + 2)) * this.step
      );
    }

    // create metaballs
    for (var k = 0; k < numBalls; k++) {
      this.balls[k] = new Ball(this);
    }
  };
  // compute cell force
  LavaLamp.prototype.computeForce = function(x, y, idx) {
    var force;
    var id = idx || x + y * (this.sx + 2);

    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
      force = 0.6 * this.sign;
    } else {
      force = 0;
      var cell = this.grid[id];
      var i = 0;
      var ball;
      while ((ball = this.balls[i++])) {
        force +=
          (ball.size * ball.size) /
          (-2 * cell.x * ball.pos.x -
            2 * cell.y * ball.pos.y +
            ball.pos.magnitude +
            cell.magnitude);
      }
      force *= this.sign;
    }
    this.grid[id].force = force;
    return force;
  };
  // compute cell
  LavaLamp.prototype.marchingSquares = function(next) {
    var x = next[0];
    var y = next[1];
    var pdir = next[2];
    var id = x + y * (this.sx + 2);
    if (this.grid[id].computed === this.iter) {
      return false;
    }
    var dir,
      mscase = 0;

    // neighbors force
    for (var i = 0; i < 4; i++) {
      var idn = x + this.ix[i + 12] + (y + this.ix[i + 16]) * (this.sx + 2);
      var force = this.grid[idn].force;
      if (
        (force > 0 && this.sign < 0) ||
        (force < 0 && this.sign > 0) ||
        !force
      ) {
        // compute force if not in buffer
        force = this.computeForce(
          x + this.ix[i + 12],
          y + this.ix[i + 16],
          idn
        );
      }
      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
    }
    if (mscase === 15) {
      // inside
      return [x, y - 1, false];
    } else {
      // ambiguous cases
      if (mscase === 5) dir = pdir === 2 ? 3 : 1;
      else if (mscase === 10) dir = pdir === 3 ? 0 : 2;
      else {
        // lookup
        dir = this.mscases[mscase];
        this.grid[id].computed = this.iter;
      }
      // draw line
      var ix =
        this.step /
        (Math.abs(
          Math.abs(
            this.grid[
              x +
                this.plx[4 * dir + 2] +
                (y + this.ply[4 * dir + 2]) * (this.sx + 2)
            ].force
          ) - 1
        ) /
          Math.abs(
            Math.abs(
              this.grid[
                x +
                  this.plx[4 * dir + 3] +
                  (y + this.ply[4 * dir + 3]) * (this.sx + 2)
              ].force
            ) - 1
          ) +
          1);
      ctx.lineTo(
        this.grid[
          x + this.plx[4 * dir] + (y + this.ply[4 * dir]) * (this.sx + 2)
        ].x +
          this.ix[dir] * ix,
        this.grid[
          x +
            this.plx[4 * dir + 1] +
            (y + this.ply[4 * dir + 1]) * (this.sx + 2)
        ].y +
          this.ix[dir + 4] * ix
      );
      this.paint = true;
      // next
      return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
    }
  };

  LavaLamp.prototype.renderMetaballs = function() {
    var i = 0,
      ball;
    while ((ball = this.balls[i++])) ball.move();
    // reset grid
    this.iter++;
    this.sign = -this.sign;
    this.paint = false;
    ctx.fillStyle = this.metaFill;
    ctx.beginPath();
    // compute metaballs
    i = 0;
    //ctx.shadowBlur = 50;
    //ctx.shadowColor = "green";
    while ((ball = this.balls[i++])) {
      // first cell
      var next = [
        Math.round(ball.pos.x / this.step),
        Math.round(ball.pos.y / this.step),
        false
      ];
      // marching squares
      do {
        next = this.marchingSquares(next);
      } while (next);
      // fill and close path
      if (this.paint) {
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.paint = false;
      }
    }
  };

  // gradients
  var createRadialGradient = function(w, h, r, c0, c1) {
    var gradient = ctx.createRadialGradient(w / 1, h / 1, 0, w / 1, h / 1, r);
    gradient.addColorStop(0, c0);
    gradient.addColorStop(1, c1);
    return gradient;
  };

  // main loop
  var run = function() {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, screen.width, screen.height);
    lava0.renderMetaballs();
  };
  // canvas
  var screen = ge1doot.screen.init("bubble", null, true),
    ctx = screen.ctx;
  screen.resize();
  // create LavaLamps
  lava0 = new LavaLamp(screen.width, screen.height, 3, "#fff", "#fff");

  run();
})();
