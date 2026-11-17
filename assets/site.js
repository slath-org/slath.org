// SPDX-FileCopyrightText: 2026 Erich Seifert <dev@erichseifert.de>
// SPDX-License-Identifier: CC-BY-SA-4.0
//
// Two small enhancements; the page works without them.
//
// Choices: radios with data-remember="KEY" keep the last choice in this
// browser. Without the script, the first option is chosen.
//
// Copy buttons: <button data-copy="ID" hidden> copies the text of the
// element with that id. They stay hidden without the script or a
// clipboard, since the text can always be selected.
(function () {
  "use strict";
  var PREFIX = "slath.choice.";

  function load(key) {
    try {
      return localStorage.getItem(PREFIX + key);
    } catch (e) {
      return null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(PREFIX + key, value);
    } catch (e) {
      // Storage unavailable: the choice lasts for this page only.
    }
  }

  var radios = document.querySelectorAll('input[type="radio"][data-remember]');
  for (var i = 0; i < radios.length; i++) {
    if (load(radios[i].getAttribute("data-remember")) === radios[i].value) radios[i].checked = true;
    radios[i].addEventListener("change", function (ev) {
      save(ev.target.getAttribute("data-remember"), ev.target.value);
    });
  }

  // The menu of the top bar on narrow screens closes on Escape, on a click
  // outside it, and after following one of its links.
  var menu = document.querySelector(".nav-menu");
  if (menu) {
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    document.addEventListener("click", function (ev) {
      if (menu.open && (!menu.contains(ev.target) || ev.target.closest(".menu-panel a"))) menu.open = false;
    });
  }

  if (!navigator.clipboard) return;
  var status = document.getElementById("copy-status");
  var buttons = document.querySelectorAll("button[data-copy]");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].hidden = false;
    buttons[j].addEventListener("click", function (ev) {
      var button = ev.currentTarget;
      var source = document.getElementById(button.getAttribute("data-copy"));
      if (!source) return;
      var tip = button.querySelector(".tip");
      navigator.clipboard.writeText(source.textContent.trim()).then(
        function () {
          button.classList.add("copied");
          if (tip) tip.textContent = "Copied";
          if (status) status.textContent = "Commands copied.";
          setTimeout(function () {
            button.classList.remove("copied");
            if (tip) tip.textContent = "Copy commands";
            if (status) status.textContent = "";
          }, 2000);
        },
        function () {
          if (status) status.textContent = "Couldn't copy. Select the commands and copy them by hand.";
        }
      );
    });
  }
})();
