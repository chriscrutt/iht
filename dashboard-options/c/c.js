/*
 * Dashboard option C, the follow-up worklist: one list of every sample patient who is Actionable
 * in any program, filtered by the tiles above it, then a panel per program. shared.js supplies
 * the data and the pieces.
 */
(function () {
  "use strict";

  const D = window.DASH;
  const h = D.h;

  // Everyone who needs follow-up: program by program, and within a program in its own order
  // (PHQ-9's highest scores first).
  const work = D.programs.flatMap((program) => {
    const column = program.columns.find((c) => c.key === program.sortBy);
    const value = column.sort || ((row) => row[column.key]);
    return program.rows
      .filter((row) => row.actionable)
      .sort((a, b) => program.sortDir * (value(a) - value(b)))
      .map((row) => ({ program: program, row: row }));
  });

  let chosen = "all";   // a program's id, or everyone
  const shown = () => work.filter((item) => chosen === "all" || item.program.id === chosen);

  // ---------- The tiles ----------
  const tiles = [{ id: "all", name: "All programs", actionable: D.totals.actionable }].concat(D.programs)
    .map((tile) => {
      const button = h("button", { type: "button", class: "dash-tile" },
        h("span", { class: "dash-tile__name" }, tile.name),
        h("span", { class: "dash-tile__number" }, D.count(tile.actionable)),
        h("span", { class: "dash-tile__note" }, "Actionable"));
      button.addEventListener("click", () => {
        chosen = tile.id;
        draw();
      });
      return { id: tile.id, name: tile.name, button: button };
    });
  document.getElementById("dash-tiles").append.apply(document.getElementById("dash-tiles"),
    tiles.map((tile) => tile.button));

  // ---------- The list ----------
  const body = document.getElementById("dash-work");
  const status = document.getElementById("dash-shown");

  function draw() {
    const items = shown();
    tiles.forEach((tile) => tile.button.setAttribute("aria-pressed", String(tile.id === chosen)));
    body.replaceChildren.apply(body, items.map((item) =>
      h("tr", null,
        h("th", { scope: "row" }, item.row.name),
        h("td", null, item.program.name),
        h("td", null, D.flagged(item.row.reason)),
        h("td", null, item.row.id),
        h("td", null, String(item.row.age)))));
    status.textContent = "Showing " + items.length + " sample patients" +
      (chosen === "all" ? "" : " from " + tiles.find((tile) => tile.id === chosen).name);
  }

  document.getElementById("dash-download").addEventListener("click", () => {
    D.saveCsv("follow-up-list.csv", ["Name", "Program", "Why", "Patient ID", "Age"],
      shown().map((item) => [item.row.name, item.program.name, item.row.reason, item.row.id, String(item.row.age)]));
  });

  draw();

  // ---------- How each program is doing ----------
  const programs = document.getElementById("dash-programs");
  D.programs.forEach((program) => {
    programs.append(h("article", { class: "dash-card", "aria-labelledby": program.id + "-title" },
      h("div", { class: "dash-card__grid" },
        h("div", null,
          h("p", { class: "dash-group" }, program.group),
          h("h3", { class: "dash-card__name", id: program.id + "-title" }, program.name),
          D.figuresFor(program)),
        h("div", null,
          h("h4", { class: "dash-h2" }, program.chartTitle),
          D.bars(program))),
      h("details", { class: "dash-details" },
        h("summary", null, "Patient List", h("span", null, program.rows.length + " patients")),
        D.patientList(program))));
  });
  document.getElementById("dash-more").textContent = "Not part of this demo: " + D.notInDemo.join(", ") + ".";
})();
