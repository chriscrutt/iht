/*
 * Dashboard option B, one scrolling page: the totals, then a band per program with its numbers,
 * its bars and a patient list that opens in place. The jump links mark the band in view.
 * shared.js supplies the data and the pieces.
 */
(function () {
  "use strict";

  const D = window.DASH;
  const h = D.h;

  document.getElementById("dash-totals").append(D.figuresFor(D.totals));

  // ---------- A band per program: white, Mist, white ----------
  const bands = document.getElementById("dash-programs");
  D.programs.forEach((program, i) => {
    bands.append(h("section",
      { id: program.id, class: "dash-band" + (i % 2 ? " iht-band iht-band--mist" : ""), "aria-labelledby": program.id + "-title" },
      h("div", { class: "iht-wrap" },
        h("div", { class: "dash-band__grid" },
          h("div", null,
            h("p", { class: "dash-group" }, program.group),
            h("h2", { class: "iht-h2", id: program.id + "-title" }, program.name),
            D.figuresFor(program)),
          h("div", null,
            h("h3", { class: "dash-h2" }, program.chartTitle),
            D.bars(program))),
        h("details", { class: "dash-details" },
          h("summary", null, "Patient List", h("span", null, program.rows.length + " patients")),
          D.patientList(program)))));
  });

  document.getElementById("dash-more").append.apply(document.getElementById("dash-more"),
    D.notInDemo.map((name) => h("li", null, name)));

  // ---------- The jump links ----------
  const jump = document.getElementById("dash-jump");
  const links = {};
  [{ id: "all-programs", name: "All programs" }].concat(D.programs).forEach((target) => {
    links[target.id] = h("a", { href: "#" + target.id }, target.name);
    jump.append(h("li", null, links[target.id]));
  });

  // The band crossing a line a third of the way down the window is the one "in view".
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Object.keys(links).forEach((id) => {
            if (id === entry.target.id) {
              links[id].setAttribute("aria-current", "true");
            } else {
              links[id].removeAttribute("aria-current");
            }
          });
        }
      });
    }, { rootMargin: "-33% 0px -66% 0px" });
    Object.keys(links).forEach((id) => spy.observe(document.getElementById(id)));
  }
})();
