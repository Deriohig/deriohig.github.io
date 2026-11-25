// Deri O hUiginn: portfolio interactions. Vanilla JS, no dependencies.
(function () {
  "use strict";

  /* Hero typing animation. The heading's accessible name comes from a
     visually hidden span; the animated span is aria-hidden, so screen
     readers hear one stable sentence instead of every frame. */
  function heroTyper() {
    var el = document.getElementsByClassName("i-am")[0];
    if (!el) return;

    var prefix = "Hey there, I'm Deri and I ";
    var lines = [
      "build booking and pricing UIs for air cargo.",
      "work in Vue, React and TypeScript.",
      "care about performance and accessibility.",
      "build LLM workflows with evals.",
      "run a frontend guild.",
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = prefix + lines[0];
      return;
    }

    var step = 1, tail = 5, timeout = 75, delay = 2;
    var colors = [
      "#6e40aa", "#bf3caf", "#e4419d", "#ff5e63", "#fb9633",
      "#c6d63c", "#30ef82", "#1ac7c2", "#368ce1", "#6054c8",
    ];

    function randColor() { return colors[Math.floor(Math.random() * colors.length)]; }
    function randChar() { return String.fromCharCode(Math.random() * (127 - 33) + 33); }
    function coloredTail(n) {
      var out = "";
      for (var i = 0; i < n; i++) {
        out += '<span style="color:' + randColor() + '">' + randChar().replace(/[<>&"']/g, "*") + "</span>";
      }
      return out;
    }

    var s = { solid: "", prefixP: -tail, lineI: 0, lineP: 0, dir: "forward", delay: delay, step: step };

    function render() {
      var line = lines[s.lineI];
      if (s.step) {
        s.step--;
      } else {
        s.step = step;
        if (s.prefixP < prefix.length) {
          if (s.prefixP >= 0) s.solid += prefix[s.prefixP];
          s.prefixP++;
        } else if (s.dir === "forward") {
          if (s.lineP < line.length) {
            s.solid += line[s.lineP];
            s.lineP++;
          } else if (s.delay) {
            s.delay--;
          } else {
            s.dir = "backward";
            s.delay = delay;
          }
        } else if (s.lineP > 0) {
          s.solid = s.solid.slice(0, -1);
          s.lineP--;
        } else {
          s.lineI = (s.lineI + 1) % lines.length;
          s.dir = "forward";
        }
      }
      var n = s.prefixP < prefix.length
        ? Math.min(tail, tail + s.prefixP)
        : Math.min(tail, line.length - s.lineP);
      el.innerHTML = s.solid + coloredTail(n);
      setTimeout(render, timeout);
    }
    setTimeout(render, 500);
  }

  /* Mobile menu: keeps aria-expanded and the button label in sync,
     closes on Escape and when a link is chosen. */
  function mobileNav() {
    var button = document.getElementById("nav-icon3");
    var header = document.querySelector(".hero");
    var nav = document.getElementById("primary-nav");
    if (!button || !header || !nav) return;

    function setOpen(open) {
      header.classList.toggle("nav-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    button.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        setOpen(false);
        button.focus();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    heroTyper();
    mobileNav();
  });
})();
