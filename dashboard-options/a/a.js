/*
 * Dashboard option A, the sidebar app: the programs down the left, one view on the right. The
 * address's #name says which view shows (#overview, #phq-9, ...), so the browser's Back button
 * works and a view can be linked to. shared.js supplies the data and the pieces.
 */
(function () {
  "use strict";

  const D = window.DASH;
  const h = D.h;
  const views = {};   // id -> its <section>
  const links = {};   // id -> its sidebar link

  const sample = () => h("span", { class: "dash-sample" }, "Sample data");

  // ---------- The views ----------

  // Everything at a glance: the totals, then a row per program that leads to its view.
  function overview() {
    return h("section", { id: "view-overview", class: "dash-view" },
      h("div", { class: "dash-title" }, h("h1", { class: "dash-h1", tabindex: "-1" }, "Overview"), sample()),
      D.figuresFor(D.totals),
      h("h2", { class: "dash-h2 dash-view__h2" }, "Programs"),
      h("ul", { class: "dash-programs", role: "list" }, D.programs.map((program) =>
        h("li", { class: "dash-program" },
          h("div", { class: "dash-program__name" },
            h("a", { href: "#" + program.id }, program.name),
            h("span", null, program.group)),
          h("dl", { class: "dash-program__numbers" },
            h("div", null, h("dt", null, "Total Responses"), h("dd", null, D.count(program.total))),
            h("div", { class: "is-followup" }, h("dt", null, "Actionable"), h("dd", null, D.count(program.actionable)))),
          D.strip(program)))),
      h("p", { class: "dash-note" }, "Not part of this demo: " + D.notInDemo.join(", ") + "."));
  }

  // One program: its numbers, its results as bars, and its patients, right on the page.
  function programView(program) {
    return h("section", { id: "view-" + program.id, class: "dash-view" },
      h("p", { class: "dash-group" }, program.group),
      h("div", { class: "dash-title" }, h("h1", { class: "dash-h1", tabindex: "-1" }, program.name), sample()),
      D.figuresFor(program),
      h("h2", { class: "dash-h2 dash-view__h2" }, program.chartTitle),
      D.bars(program),
      h("h2", { class: "dash-h2 dash-view__h2" }, "Patient List"),
      D.patientList(program));
  }

  // ---------- The sidebar, and the phone's picker ----------

  function sidebar() {
    const link = (id, label, extra) => {
      links[id] = h("a", { href: "#" + id }, h("span", null, label), extra);
      return h("li", null, links[id]);
    };
    return h("div", { class: "dash-nav__inner" },
      h("ul", { role: "list" }, link("overview", "Overview")),
      D.groups.map((group, i) => [
        h("p", { class: "dash-nav__group", id: "dash-group-" + i }, group.name),
        h("ul", { role: "list", "aria-labelledby": "dash-group-" + i }, group.items.map((name) => {
          const program = D.byName(name);
          return program
            ? link(program.id, name, h("span", { class: "dash-nav__count" }, D.count(program.actionable),
              h("span", { class: "iht-sr-only" }, " actionable")))
            : h("li", null, h("span", { class: "dash-nav__off" }, name,
              h("span", { class: "iht-sr-only" }, " (not part of this demo)")));
        })),
      ]),
      h("p", { class: "dash-nav__note" }, "Dimmed programs aren't part of this demo."));
  }

  const picker = document.getElementById("dash-program");

  function fillPicker() {
    picker.append(h("option", { value: "overview" }, "Overview"));
    D.groups.forEach((group) => {
      picker.append(h("optgroup", { label: group.name }, group.items.map((name) => {
        const program = D.byName(name);
        return h("option", { value: program ? program.id : null, disabled: program ? null : "" }, name);
      })));
    });
    picker.addEventListener("change", () => {
      location.hash = picker.value;
    });
  }

  // ---------- Which view shows ----------

  function show(id, arrived) {
    Object.keys(views).forEach((key) => {
      views[key].hidden = key !== id;
      if (key === id) {
        links[key].setAttribute("aria-current", "page");
      } else {
        links[key].removeAttribute("aria-current");
      }
    });
    picker.value = id;
    const title = views[id].querySelector("h1");
    document.title = title.textContent + " | Dashboard | IHT";
    if (arrived) {
      // A view someone just chose starts at its top, and its title takes focus so it's read out.
      window.scrollTo(0, 0);
      title.focus({ preventScroll: true });
    }
  }

  // No #name at all means the overview (as when Back returns to the first address). A #name that
  // isn't a view (the skip link's #main) leaves the view alone, or opens the overview on the
  // first load.
  function route(arrived) {
    const id = location.hash.slice(1) || "overview";
    if (views[id]) {
      show(id, arrived);
    } else if (!arrived) {
      show("overview", false);
    }
  }

  const root = document.getElementById("dash-views");
  [overview()].concat(D.programs.map(programView)).forEach((view) => {
    // A view's own id is "view-" plus its name, so the browser finds nothing to jump to for the
    // address's #name and leaves the scrolling to show().
    views[view.id.slice(5)] = view;
    root.append(view);
  });
  document.getElementById("dash-nav").append(sidebar());
  fillPicker();
  window.addEventListener("hashchange", () => route(true));
  route(false);
})();
