// SPDX-FileCopyrightText: 2026 Erich Seifert <dev@erichseifert.de>
// SPDX-License-Identifier: CC-BY-SA-4.0
//
// Theme switcher. Loaded synchronously in <head> so a stored choice applies
// before first paint. "system" (the default) leaves the decision to the
// prefers-color-scheme media query in site.css.
(function () {
  "use strict";
  var KEY = "slath-theme";
  var root = document.documentElement;

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : "system";
    } catch (e) {
      return "system";
    }
  }

  function apply(choice) {
    if (choice === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", choice);
  }

  function store(choice) {
    try {
      if (choice === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, choice);
    } catch (e) {
      // Storage unavailable (private mode, blocked): the choice lasts for this page only.
    }
  }

  apply(read());

  document.addEventListener("DOMContentLoaded", function () {
    var group = document.getElementById("theme-switch");
    if (!group) return;
    var current = read();
    var inputs = group.querySelectorAll('input[name="theme"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = inputs[i].value === current;
      inputs[i].addEventListener("change", function (ev) {
        apply(ev.target.value);
        store(ev.target.value);
      });
    }
    group.hidden = false;
  });
})();
