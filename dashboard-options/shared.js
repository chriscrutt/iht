/*
 * The dashboard's sample data, and the pieces every layout draws from it: headline figures, bar
 * charts and patient lists. Shared by the three layout options (a/, b/ and c/). Everything hangs
 * off one global, DASH. No libraries.
 */
(function () {
  "use strict";

  // The sample patients (made up). Each program's answers below are in the same order.
  const PATIENTS = [
    ["Mary Johnson", "123456791", 55],
    ["Robert Lee", "123456792", 61],
    ["Emily Chen", "123456793", 45],
    ["Michael Brown", "123456794", 39],
    ["Sarah Wilson", "123456795", 50],
    ["David Martin", "123456796", 63],
    ["Linda Anderson", "123456797", 69],
    ["William Taylor", "123456798", 78],
    ["Ava Lewis", "123456799", 34],
    ["James Clark", "123456700", 56],
    ["Sophia Martinez", "123456701", 41],
    ["Joseph Hernandez", "123456702", 59],
    ["Olivia Nelson", "123456703", 48],
    ["John Doe", "123456704", 32],
    ["Emma Adams", "123456705", 29],
    ["Michaela King", "123456706", 60],
    ["Alexander Turner", "123456707", 64],
    ["Grace Miller", "123456708", 52],
    ["Ethan Parker", "123456709", 46],
    ["Chloe Brooks", "123456710", 37],
    ["Andrew Scott", "123456711", 44],
    ["Zoe Adams", "123456712", 57],
    ["Mason Sanchez", "123456713", 51],
    ["Leah Allen", "123456714", 49],
    ["William Turner", "123456715", 62],
    ["Abigail Foster", "123456716", 47],
    ["Lucas Simmons", "123456717", 36],
    ["Ella Watson", "123456718", 53],
    ["Oliver Carter", "123456719", 31],
  ];

  // PHQ-9: the total score, then the nine answers (0 to 3) in the questionnaire's order.
  const PHQ9_ANSWERS = [
    [10, 0, 1, 2, 2, 1, 1, 2, 1, 0],
    [22, 2, 3, 2, 2, 2, 3, 2, 3, 3],
    [8, 1, 1, 2, 3, 1, 0, 0, 0, 0],
    [5, 0, 0, 3, 1, 1, 0, 0, 0, 0],
    [12, 0, 2, 1, 2, 3, 2, 1, 1, 0],
    [17, 2, 1, 3, 3, 2, 1, 3, 1, 1],
    [19, 3, 3, 3, 1, 1, 3, 1, 1, 3],
    [24, 3, 3, 3, 3, 3, 1, 3, 3, 2],
    [3, 0, 0, 1, 1, 0, 0, 0, 1, 0],
    [13, 2, 3, 0, 3, 1, 2, 2, 0, 0],
    [7, 1, 2, 2, 0, 1, 0, 1, 0, 0],
    [18, 3, 3, 3, 3, 2, 2, 2, 0, 0],
    [11, 3, 3, 3, 1, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [16, 3, 0, 3, 2, 3, 3, 0, 2, 0],
    [21, 2, 3, 3, 3, 3, 3, 3, 1, 0],
    [9, 2, 3, 0, 1, 1, 1, 0, 1, 0],
    [6, 0, 0, 2, 0, 2, 2, 0, 0, 0],
    [4, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [7, 1, 1, 3, 1, 0, 1, 0, 0, 0],
    [12, 2, 3, 3, 1, 1, 1, 1, 0, 0],
    [10, 2, 1, 1, 1, 2, 1, 2, 0, 0],
    [9, 2, 0, 3, 1, 0, 1, 1, 1, 0],
    [16, 2, 1, 2, 3, 0, 3, 3, 0, 2],
    [8, 1, 2, 3, 0, 1, 0, 1, 0, 0],
    [5, 1, 1, 1, 2, 0, 0, 0, 0, 0],
    [11, 3, 0, 0, 3, 1, 1, 3, 0, 0],
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  ];

  // Breast cancer screening: status, days since the last screening (null: none on record),
  // treatment plan, mammogram frequency.
  const BREAST_ANSWERS = [
    ["Positive", 134, "Chemotherapy", "Bi-Yearly"],
    ["Negative", 330, "None", "Yearly"],
    ["Negative", 30, "None", "Yearly"],
    ["Negative", 87, "None", "Yearly"],
    ["Unknown", null, "-", "-"],
    ["Unknown", null, "-", "-"],
    ["Negative", 314, "None", "Yearly"],
    ["Positive", 37, "Radiation", "Bi-Yearly"],
    ["Positive", 159, "Radiation", "Bi-Yearly"],
    ["Negative", 169, "None", "Yearly"],
    ["Negative", 101, "None", "Yearly"],
    ["Negative", 295, "None", "Yearly"],
    ["Unknown", null, "-", "-"],
    ["Unknown", null, "-", "-"],
    ["Unknown", null, "-", "-"],
    ["Positive", 30, "Chemotherapy", "Bi-Yearly"],
    ["Positive", 161, "Hormone therapy", "Bi-Yearly"],
    ["Negative", 131, "None", "Yearly"],
    ["Positive", 27, "Radiation", "Bi-Yearly"],
    ["Negative", 109, "None", "Yearly"],
    ["Negative", 119, "None", "Yearly"],
    ["Negative", 236, "None", "Yearly"],
    ["Positive", 133, "Surgery", "Bi-Yearly"],
    ["Positive", 134, "Hormone therapy", "Bi-Yearly"],
    ["Unknown", null, "-", "-"],
    ["Unknown", null, "-", "-"],
    ["Positive", 101, "Chemotherapy", "Bi-Yearly"],
    ["Unknown", null, "-", "-"],
    ["Negative", 211, "None", "Yearly"],
  ];

  // Fall prevention: problems with balance, fallen recently, talked to a doctor, share of the
  // video watched (%), reward chosen.
  const FALL_ANSWERS = [
    ["No", "Yes", "No", 100, "Target"],
    ["Yes", "No", "Yes", 78, "Walgreens"],
    ["Yes", "No", "No", 100, "Walgreens"],
    ["No", "No", "No", 100, "Walgreens"],
    ["Yes", "Yes", "Yes", 92, "Walgreens"],
    ["No", "No", "No", 96, "Target"],
    ["No", "No", "No", 100, "Target"],
    ["No", "Yes", "Yes", 100, "Target"],
    ["No", "No", "Yes", 100, "Target"],
    ["No", "Yes", "Yes", 100, "Target"],
    ["Yes", "No", "No", 100, "Walgreens"],
    ["Yes", "No", "Yes", 100, "Walgreens"],
    ["No", "No", "Yes", 100, "Walgreens"],
    ["Yes", "Yes", "No", 51, "Target"],
    ["No", "No", "Yes", 100, "Walgreens"],
    ["No", "No", "No", 100, "Walgreens"],
    ["No", "No", "Yes", 100, "Target"],
    ["Yes", "Yes", "No", 100, "Walgreens"],
    ["Yes", "No", "No", 92, "Target"],
    ["Yes", "No", "No", 100, "Walgreens"],
    ["Yes", "Yes", "No", 37, "Walgreens"],
    ["No", "No", "No", 100, "Target"],
    ["No", "Yes", "No", 92, "Target"],
    ["No", "No", "Yes", 100, "Walgreens"],
    ["Yes", "Yes", "Yes", 100, "Walgreens"],
    ["No", "No", "No", 100, "Target"],
    ["Yes", "No", "Yes", 96, "Walgreens"],
    ["No", "No", "Yes", 100, "Walgreens"],
    ["Yes", "Yes", "No", 100, "Target"],
  ];

  // ---------- Small helpers ----------

  // Build an element: h("p", { class: "x" }, "text", node, [more, nodes]). Strings go in as text,
  // never as markup. Attributes that are null or false are left out.
  function h(tag, attrs) {
    const el = document.createElement(tag);
    Object.keys(attrs || {}).forEach((name) => {
      if (attrs[name] != null && attrs[name] !== false) {
        el.setAttribute(name, attrs[name]);
      }
    });
    Array.prototype.slice.call(arguments, 2).flat(Infinity).forEach((child) => {
      if (child != null && child !== false) {
        el.append(child);
      }
    });
    return el;
  }

  const count = (n) => n.toLocaleString("en-US");
  const share = (part, whole) => Math.round((100 * part) / whole) + "%";

  // The date n days before today, as MM-DD-YYYY, so the sample never looks out of date.
  function daysAgo(n) {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()]
      .map((part) => String(part).padStart(2, "0"))
      .join("-");
  }

  // ---------- The programs ----------
  // A program has its headline counts, the groups its bar chart shows, and its patient list.
  //   categories: tone is the step of the blue ramp (4 = IHT blue, 1 = palest); the group counted
  //     as Actionable is red instead.
  //   columns: flag marks the column that shows why a patient is Actionable; sort gives a
  //     column something better to sort by than its text.
  //   rows: one per sample patient, keyed by column; actionable and reason say who needs follow-up.

  const NAME = { key: "name", label: "Name" };
  const ID = { key: "id", label: "Patient ID" };
  const AGE = { key: "age", label: "Age" };

  const PHQ9_BANDS = [[20, "Severe"], [15, "Moderately severe"], [10, "Moderate"], [5, "Mild"], [0, "Minimal"]];
  const PHQ9_ITEMS = ["Anhedonia", "Depression", "Sleep", "Fatigue", "Appetite", "Self-Worth", "Concentration",
    "Psychomotor", "Suicidal Thoughts"];
  // The sample's fall-risk level: one step up for each of problems with balance, a recent fall,
  // and not having talked to a doctor.
  const FALL_RISKS = ["None", "Mild", "Moderate", "Severe"];
  const BREAST_ORDER = ["Unknown", "Positive", "Negative"];

  const programs = [
    {
      id: "phq-9",
      name: "PHQ-9",
      group: "Mental Health Assessments",
      total: 123456,
      actionable: 23456,
      chartTitle: "PHQ-9 Responses",
      categories: [
        { label: "20-27 (severe)", count: 23456, actionable: true },
        { label: "15-19 (moderately severe)", count: 12345, tone: 4 },
        { label: "10-14 (moderate)", count: 15432, tone: 3 },
        { label: "5-9 (mild)", count: 35678, tone: 2 },
        { label: "0-4 (minimal)", count: 36545, tone: 1 },
      ],
      columns: [NAME, ID, AGE, { key: "score", label: "Score" },
        { key: "severity", label: "Severity", flag: true, sort: (row) => row.score }]
        .concat(PHQ9_ITEMS.map((label, i) => ({ key: "q" + (i + 1), label: label }))),
      rows: PATIENTS.map((patient, i) => {
        const answers = PHQ9_ANSWERS[i];
        const row = {
          name: patient[0], id: patient[1], age: patient[2],
          score: answers[0],
          severity: PHQ9_BANDS.find((band) => answers[0] >= band[0])[1],
          actionable: answers[0] >= 20,
          reason: "Score " + answers[0] + " (severe)",
        };
        PHQ9_ITEMS.forEach((item, k) => {
          row["q" + (k + 1)] = answers[k + 1];
        });
        return row;
      }),
      sortBy: "score",
      sortDir: -1,
    },
    {
      id: "breast-cancer-screening",
      name: "Breast Cancer Screening",
      group: "HEDIS-Related Assessments",
      total: 11233,
      actionable: 5432,
      chartTitle: "Breast Cancer Screening Results",
      categories: [
        { label: "Has Breast Cancer", count: 3456, tone: 4 },
        { label: "Does Not Have Breast Cancer", count: 2345, tone: 2 },
        { label: "Awaiting Screening", count: 5432, actionable: true },
      ],
      columns: [NAME, ID, AGE,
        { key: "status", label: "Breast Cancer Status", flag: true, sort: (row) => BREAST_ORDER.indexOf(row.status) },
        // Oldest first when ascending; no screening on record comes before any date.
        { key: "screened", label: "Last Screening", sort: (row) => (row.days == null ? -Infinity : -row.days) },
        { key: "plan", label: "Treatment Plan" },
        { key: "frequency", label: "Mammogram Frequency" }],
      rows: PATIENTS.map((patient, i) => {
        const answers = BREAST_ANSWERS[i];
        return {
          name: patient[0], id: patient[1], age: patient[2],
          status: answers[0],
          days: answers[1],
          screened: answers[1] == null ? "-" : daysAgo(answers[1]),
          plan: answers[2],
          frequency: answers[3],
          actionable: answers[0] === "Unknown",
          reason: "Awaiting screening",
        };
      }),
      sortBy: "status",
      sortDir: 1,
    },
    {
      id: "fall-prevention",
      name: "Fall Prevention",
      group: "Incentive Programs",
      total: 32015,
      actionable: 6321,
      payouts: 16075,
      chartTitle: "Patient Risk Levels",
      categories: [
        { label: "Severe", count: 6321, actionable: true },
        { label: "Moderate", count: 7495, tone: 3 },
        { label: "Mild", count: 9463, tone: 2 },
        { label: "None", count: 8736, tone: 1 },
      ],
      columns: [NAME, ID, AGE,
        { key: "risk", label: "Risk Level", flag: true, sort: (row) => FALL_RISKS.indexOf(row.risk) },
        { key: "balance", label: "Problems with Balance" },
        { key: "fallen", label: "Fallen Recently" },
        { key: "doctor", label: "Talked to Doctor" },
        { key: "video", label: "Watched Video", text: (row) => row.video + "%" },
        { key: "reward", label: "Reward Type" }],
      rows: PATIENTS.map((patient, i) => {
        const answers = FALL_ANSWERS[i];
        const risk = FALL_RISKS[(answers[0] === "Yes") + (answers[1] === "Yes") + (answers[2] === "No")];
        return {
          name: patient[0], id: patient[1], age: patient[2],
          risk: risk,
          balance: answers[0],
          fallen: answers[1],
          doctor: answers[2],
          video: answers[3],
          reward: answers[4],
          actionable: risk === "Severe",
          reason: "Severe fall risk",
        };
      }),
      sortBy: "risk",
      sortDir: -1,
    },
  ];

  // Every screening the old tabs listed, in their three groups. Only the three above are part of
  // this demo; the rest are shown dimmed.
  const groups = [
    { name: "Mental Health Assessments", items: ["PHQ-9", "GAD-7", "PCL-5"] },
    { name: "HEDIS-Related Assessments",
      items: ["Breast Cancer Screening", "Colorectal Cancer Screening", "Comprehensive Diabetes Care"] },
    { name: "Incentive Programs", items: ["Fall Prevention", "Incontinence", "Medication Adherence"] },
  ];
  const byName = (name) => programs.find((program) => program.name === name);
  const byId = (id) => programs.find((program) => program.id === id);
  const notInDemo = groups.flatMap((group) => group.items).filter((name) => !byName(name));

  const sum = (key) => programs.reduce((total, program) => total + (program[key] || 0), 0);
  const totals = { total: sum("total"), actionable: sum("actionable"), payouts: sum("payouts") };

  // ---------- Headline figures ----------

  // A row of large numbers. kind "followup" gives the label the red key, "reward" the green one.
  function figures(items) {
    return h("dl", { class: "dash-figures" }, items.map((item) =>
      h("div", { class: "dash-figure" + (item.kind ? " dash-figure--" + item.kind : "") },
        h("dt", null, item.label),
        h("dd", null, item.value),
        item.note && h("dd", { class: "dash-figure__note" }, item.note))));
  }

  function figuresFor(numbers) {
    return figures([
      { label: "Total Responses", value: count(numbers.total) },
      { label: "Actionable", value: count(numbers.actionable), kind: "followup",
        note: share(numbers.actionable, numbers.total) + " of responses" },
      numbers.payouts && { label: "Reward Payouts", value: "$" + count(numbers.payouts), kind: "reward" },
    ].filter(Boolean));
  }

  // ---------- Bar charts ----------

  const tone = (category) => "dash-tone--" + (category.actionable ? "followup" : category.tone);

  // One bar per group, the longest as wide as the chart, each with its count and its share of
  // the responses. The bars are for the eye; the numbers beside them are the text.
  function bars(program) {
    const longest = Math.max.apply(null, program.categories.map((category) => category.count));
    const list = h("ul", { class: "dash-bars", role: "list" }, program.categories.map((category) =>
      h("li", { class: "dash-bar" },
        h("span", { class: "dash-bar__label" }, category.label),
        h("span", { class: "dash-bar__track", "aria-hidden": "true" },
          h("span", { class: "dash-bar__fill " + tone(category),
            style: "width: " + ((100 * category.count) / longest).toFixed(1) + "%" })),
        h("span", { class: "dash-bar__count" }, count(category.count)),
        h("span", { class: "dash-bar__share" }, share(category.count, program.total)))));
    growOnce(list);
    return list;
  }

  // The same groups as one thin strip, the Actionable group first, for comparing programs at a
  // glance. Decoration: the numbers are always beside it.
  function strip(program) {
    const ordered = program.categories.filter((c) => c.actionable).concat(program.categories.filter((c) => !c.actionable));
    return h("div", { class: "dash-strip", "aria-hidden": "true" }, ordered.map((category) =>
      h("span", { class: tone(category), style: "flex-grow: " + category.count })));
  }

  // Bars grow from nothing the first time they come into view, unless the reader's device asks
  // for less motion (then they're simply there).
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const grower = !calm && "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        grower.unobserve(entry.target);
        entry.target.classList.replace("is-waiting", "is-drawn");
      }
    });
  }, { threshold: 0.3 });

  function growOnce(list) {
    if (grower) {
      list.classList.add("is-waiting");
      grower.observe(list);
    }
  }

  // ---------- Patient lists ----------

  const cellText = (column, row) => (column.text ? column.text(row) : String(row[column.key]));

  // What marks a patient as Actionable in a list: the red key, and the word for screen readers.
  function flagged(text) {
    return h("span", { class: "dash-flag" }, text, h("span", { class: "iht-sr-only" }, " (actionable)"));
  }

  // A program's patient list: a filter (everyone, or only the Actionable), a Download button, and
  // the table. Clicking a heading sorts by it, and again reverses it. The table scrolls inside its
  // box, which can take focus so the keyboard can scroll it.
  function patientList(program) {
    let filter = "all";
    let sortBy = program.sortBy;
    let sortDir = program.sortDir;
    const flaggedRows = program.rows.filter((row) => row.actionable).length;

    const body = h("tbody");
    const headings = program.columns.map((column) => {
      const button = h("button", { type: "button", class: "dash-sort" }, column.label);
      button.addEventListener("click", () => {
        sortDir = sortBy === column.key ? -sortDir : 1;
        sortBy = column.key;
        draw();
      });
      return h("th", { scope: "col" }, button);
    });
    const everyone = h("button", { type: "button" }, "All (" + program.rows.length + ")");
    const onlyFlagged = h("button", { type: "button" }, "Actionable (" + flaggedRows + ")");
    const download = h("button", { type: "button", class: "iht-btn dash-quiet" }, "Download");

    function shown() {
      const column = program.columns.find((c) => c.key === sortBy);
      const value = column.sort || ((row) => row[column.key]);
      return program.rows
        .filter((row) => filter === "all" || row.actionable)
        .sort((a, b) => {
          const x = value(a);
          const y = value(b);
          const order = typeof x === "number" && typeof y === "number"
            ? x - y
            : String(x).localeCompare(String(y), undefined, { numeric: true });
          return sortDir * order;
        });
    }

    function draw() {
      headings.forEach((heading, i) => {
        if (program.columns[i].key === sortBy) {
          heading.setAttribute("aria-sort", sortDir === 1 ? "ascending" : "descending");
        } else {
          heading.removeAttribute("aria-sort");
        }
      });
      everyone.setAttribute("aria-pressed", String(filter === "all"));
      onlyFlagged.setAttribute("aria-pressed", String(filter === "actionable"));
      body.replaceChildren.apply(body, shown().map((row) =>
        h("tr", null, program.columns.map((column, i) => {
          const text = cellText(column, row);
          const content = column.flag && row.actionable ? flagged(text) : text;
          return i === 0 ? h("th", { scope: "row" }, content) : h("td", null, content);
        }))));
    }

    everyone.addEventListener("click", () => {
      filter = "all";
      draw();
    });
    onlyFlagged.addEventListener("click", () => {
      filter = "actionable";
      draw();
    });
    download.addEventListener("click", () => {
      saveCsv(program.id + "-patient-list.csv",
        program.columns.map((column) => column.label),
        shown().map((row) => program.columns.map((column) => cellText(column, row))));
    });

    draw();
    return h("div", { class: "dash-list" },
      h("div", { class: "dash-list__tools" },
        h("div", { class: "dash-toggle", role: "group", "aria-label": "Show" }, everyone, onlyFlagged),
        download),
      h("div", { class: "dash-table-wrap", role: "region", tabindex: "0", "aria-label": program.name + " patient list" },
        h("table", { class: "dash-table" }, h("thead", null, h("tr", null, headings)), body)));
  }

  // Save rows as a CSV file, the way a spreadsheet expects it.
  function saveCsv(fileName, headings, rows) {
    const cell = (value) => (/[",\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value);
    const text = [headings].concat(rows).map((line) => line.map(cell).join(",")).join("\r\n");
    const link = h("a", { href: URL.createObjectURL(new Blob([text], { type: "text/csv" })), download: fileName });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  window.DASH = {
    programs: programs, groups: groups, byName: byName, byId: byId, notInDemo: notInDemo, totals: totals,
    h: h, count: count, share: share,
    figures: figures, figuresFor: figuresFor, bars: bars, strip: strip, flagged: flagged,
    patientList: patientList, saveCsv: saveCsv,
  };
})();
