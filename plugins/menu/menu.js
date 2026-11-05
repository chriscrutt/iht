/*
 * Mobile menu for the site header. Below 992px wide, the CSS hides the menu
 * links and shows the hamburger (.mobile-menu-trigger) instead. This file
 * makes the hamburger work: it slides .menu-block in from the left and dims
 * the page with .menu-overlay. The close button, a tap on the dimmed page or
 * the Escape key closes it again.
 *
 * demo/ loads this file but has no menu, so it does nothing there.
 */
(function () {
  "use strict";

  function init() {
    var trigger = document.querySelector(".mobile-menu-trigger");
    var menu = document.querySelector(".menu-block");
    var overlay = document.querySelector(".menu-overlay");
    if (!trigger || !menu || !overlay) {
      return;
    }
    var closeButton = menu.querySelector(".mobile-menu-close");

    function isOpen() {
      return menu.classList.contains("active");
    }

    function setOpen(open) {
      if (open) {
        menu.classList.add("active");
        overlay.classList.add("active");
      } else {
        menu.classList.remove("active");
        overlay.classList.remove("active");
      }
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    // The trigger is a <div>, so make it reachable and usable from the keyboard.
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", "Menu");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", function () {
      setOpen(!isOpen());
    });
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(!isOpen());
      }
    });
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        setOpen(false);
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
      }
    });
    // From 992px up the links show in the header, so close the menu if the
    // window gets that wide while it is open.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991 && isOpen()) {
        setOpen(false);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
