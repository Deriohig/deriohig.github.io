// Deri O hUiginn — portfolio interactions. Vanilla JS, no dependencies.
(function () {
  "use strict";

  /* =========================================================
     Hero "rainbow scramble" typing animation (restored from the
     original app.js — same effect, no jQuery). Types a prefix +
     a rotating skill line, with a shimmering tail of random
     rainbow characters at the leading edge.
     ========================================================= */
  function heroTyper() {
    var el = document.getElementsByClassName("i-am")[0];
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = "Hey there, I'm Deri.";
      return;
    }

    var prefix = "Hey there, I'm Deri and I ";
    var skills = [
      "build high-stakes web platforms.",
      "love React and Vue.",
      "sweat performance and accessibility.",
      "ship faster with AI in the loop.",
      "lead frontend across distributed teams.",
      "am fond of a bit of 🍽 and 🍷.",
      "am always up for a good challenge.",
    ];

    var step = 1, tail = 5, timeout = 75, delay = 2;
    var colors = [
      "rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)",
      "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)",
      "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)",
      "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)",
      "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)",
    ];

    function randColor() { return colors[Math.floor(Math.random() * colors.length)]; }
    function randChar() { return String.fromCharCode(Math.random() * (127 - 33) + 33); }
    function coloredTail(n) {
      var out = "";
      for (var i = 0; i < n; i++) {
        out += '<span style="color:' + randColor() + '">' + randChar() + "</span>";
      }
      return out;
    }

    var s = { solid: "", prefixP: -tail, skillI: 0, skillP: 0, dir: "forward", delay: delay, step: step };

    function render() {
      var skill = skills[s.skillI];
      if (s.step) {
        s.step--;
      } else {
        s.step = step;
        if (s.prefixP < prefix.length) {
          if (s.prefixP >= 0) s.solid += prefix[s.prefixP];
          s.prefixP++;
        } else if (s.dir === "forward") {
          if (s.skillP < skill.length) {
            s.solid += skill[s.skillP];
            s.skillP++;
          } else if (s.delay) {
            s.delay--;
          } else {
            s.dir = "backward";
            s.delay = delay;
          }
        } else {
          if (s.skillP > 0) {
            s.solid = s.solid.slice(0, -1);
            s.skillP--;
          } else {
            s.skillI = (s.skillI + 1) % skills.length;
            s.dir = "forward";
          }
        }
      }
      var n = s.prefixP < prefix.length
        ? Math.min(tail, tail + s.prefixP)
        : Math.min(tail, skill.length - s.skillP);
      el.innerHTML = s.solid + coloredTail(n);
      setTimeout(render, timeout);
    }
    setTimeout(render, 500);
  }

  /* ---- Mobile nav toggle ---- */
  function mobileNav() {
    var icon = document.getElementById("nav-icon3");
    var header = document.querySelector("header");
    if (!icon || !header) return;
    icon.addEventListener("click", function () {
      icon.classList.toggle("open");
      header.classList.toggle("nav-open");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    heroTyper();
    mobileNav();
  });
})();
