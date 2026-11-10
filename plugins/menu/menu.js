/*
 * Mobile menu for the site header. Below 992px wide, the CSS hides the menu
 * links and shows the hamburger (.mobile-menu-trigger) instead. This file
 * makes the hamburger work: it slides .menu-block in (from the right, next to
 * the hamburger, in css/theme.css) and dims the page with .menu-overlay. The
 * close button, a tap on the dimmed page, Escape, picking a link or tabbing
 * out of the menu closes it again.
 *
 * It's plain ES5 so it also runs on older phones and tablets.
 */
(function () {
  "use strict";

  // Must match the mobile breakpoint in css/theme.css.
  var MOBILE_QUERY = "(max-width: 991.98px)";

  // Older browsers only give key codes, or older key names ("Esc", "Spacebar").
  var KEYS = {
    enter: { names: ["Enter"], code: 13 },
    space: { names: [" ", "Spacebar"], code: 32 },
    escape: { names: ["Escape", "Esc"], code: 27 }
  };

  function isKey(event, key) {
    return KEYS[key].names.indexOf(event.key) !== -1 || event.keyCode === KEYS[key].code;
  }

  function isMobileLayout() {
    if (window.matchMedia) {
      return window.matchMedia(MOBILE_QUERY).matches;
    }
    return window.innerWidth < 992;
  }

  // The trigger and the close button are <div>s, so make them work as buttons.
  function makeButton(element, label, action) {
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", label);
    element.addEventListener("click", function () {
      action(false);
    });
    element.addEventListener("keydown", function (event) {
      if (isKey(event, "enter") || isKey(event, "space")) {
        event.preventDefault();
        // A held key repeats; act only on the first press.
        if (!event.repeat) {
          action(true);
        }
      }
    });
  }

  function init() {
    var trigger = document.querySelector(".mobile-menu-trigger");
    var menu = document.querySelector(".menu-block");
    var overlay = document.querySelector(".menu-overlay");
    if (!trigger || !menu || !overlay || trigger.getAttribute("data-menu-ready")) {
      return;
    }
    trigger.setAttribute("data-menu-ready", "true");
    var closeButton = menu.querySelector(".mobile-menu-close");

    function isOpen() {
      return menu.classList.contains("active");
    }

    function open(fromKeyboard) {
      menu.classList.add("active");
      overlay.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
      // Keyboard users start inside the menu instead of behind the overlay.
      if (fromKeyboard && closeButton) {
        closeButton.focus({ preventScroll: true });
      }
    }

    // focusIsLeaving: focus is already on its way out of the menu, so don't pull it back.
    function close(focusIsLeaving) {
      var returnFocus = !focusIsLeaving && menu.contains(document.activeElement);
      menu.classList.remove("active");
      overlay.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      if (returnFocus) {
        trigger.focus({ preventScroll: true });
      }
    }

    makeButton(trigger, "Menu", function (fromKeyboard) {
      if (isOpen()) {
        close();
      } else {
        open(fromKeyboard);
      }
    });
    trigger.setAttribute("aria-expanded", "false");
    if (menu.id) {
      trigger.setAttribute("aria-controls", menu.id);
    }
    if (closeButton) {
      makeButton(closeButton, "Close menu", function () {
        close();
      });
    }
    overlay.addEventListener("click", function () {
      close();
    });

    // Picking a link closes the menu. On the team page, "Our Team" only jumps to the top.
    menu.addEventListener("click", function (event) {
      for (var node = event.target; node && node !== menu; node = node.parentNode) {
        if (node.tagName === "A") {
          close();
          return;
        }
      }
    });
    // Focus landing anywhere outside the open menu, the hamburger included, closes it,
    // so keyboard focus never ends up behind the overlay. The exception is the window
    // getting focus back after a switch to another app or tab: that hands focus back
    // to the hamburger with no relatedTarget, and shouldn't close a menu opened by tap.
    document.addEventListener("focusin", function (event) {
      var returningToTrigger = event.target === trigger && !event.relatedTarget;
      if (isOpen() && !returningToTrigger && !menu.contains(event.target)) {
        close(true);
      }
    });
    document.addEventListener("keydown", function (event) {
      if (isOpen() && isKey(event, "escape")) {
        close();
      }
    });
    // From 992px up the links show in the header, so the menu has to close.
    window.addEventListener("resize", function () {
      if (isOpen() && !isMobileLayout()) {
        close();
      }
    });
    // Don't come back to an open menu after pressing Back. Close it without the
    // slide, or the restored page would play the closing animation.
    window.addEventListener("pagehide", function () {
      if (isOpen()) {
        menu.style.transition = overlay.style.transition = "none";
        close();
        void menu.offsetWidth; // apply the closed state before transitions come back
        menu.style.transition = overlay.style.transition = "";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
