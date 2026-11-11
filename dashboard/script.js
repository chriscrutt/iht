/*
 * The clinic dashboard: a mock-up, drawn from the sample data below. The programs are listed down
 * the left, and one view shows on the right: the overview, or one program. The address's #name
 * says which (#phq-9, #fall-prevention, ...), so the browser's Back button works and a view can be
 * linked to.
 *
 * It's laid out for real numbers. A program has tens of thousands of patients, so no page shows
 * any of them, not even a few: a program's view has its totals, its results as bars, the
 * Actionable count by clinic, and how patients answered each question. The patients themselves
 * are a download ("Download responses" saves the sample's, as a CSV file).
 *
 * No libraries, and nothing here is global.
 */
(function () {
  "use strict";

  // ---------- Sample data (all of it made up) ----------

  // The clinics the sample's patients belong to.
  const CLINICS = ["Downtown Clinic", "Eastside Clinic", "Lakeside Clinic", "Northgate Clinic", "Riverside Clinic", "Westside Clinic"];

  // The sample patients: name, patient ID, age, and their clinic (an index into CLINICS). Each
  // program's answers below are in the same order. No page shows them: they're what "Download
  // responses" saves.
  const PATIENTS = [
    ["Mary Johnson", "123456791", 55, 2],
    ["Robert Lee", "123456792", 61, 2],
    ["Emily Chen", "123456793", 45, 1],
    ["Michael Brown", "123456794", 39, 1],
    ["Sarah Wilson", "123456795", 50, 1],
    ["David Martin", "123456796", 63, 0],
    ["Linda Anderson", "123456797", 69, 2],
    ["William Taylor", "123456798", 78, 3],
    ["Ava Lewis", "123456799", 34, 4],
    ["James Clark", "123456700", 56, 4],
    ["Sophia Martinez", "123456701", 41, 1],
    ["Joseph Hernandez", "123456702", 59, 1],
    ["Olivia Nelson", "123456703", 48, 4],
    ["John Doe", "123456704", 32, 5],
    ["Emma Adams", "123456705", 29, 5],
    ["Michaela King", "123456706", 60, 4],
    ["Alexander Turner", "123456707", 64, 0],
    ["Grace Miller", "123456708", 52, 2],
    ["Ethan Parker", "123456709", 46, 0],
    ["Chloe Brooks", "123456710", 37, 3],
    ["Andrew Scott", "123456711", 44, 1],
    ["Zoe Adams", "123456712", 57, 1],
    ["Mason Sanchez", "123456713", 51, 4],
    ["Leah Allen", "123456714", 49, 3],
    ["William Turner", "123456715", 62, 1],
    ["Abigail Foster", "123456716", 47, 2],
    ["Lucas Simmons", "123456717", 36, 2],
    ["Ella Watson", "123456718", 53, 0],
    ["Oliver Carter", "123456719", 31, 0],
  ];

  // PHQ-9: the total score, the nine answers (0 to 3) in the questionnaire's order, then how many
  // days ago the patient responded.
  const PHQ9_ANSWERS = [
    [10, 0, 1, 2, 2, 1, 1, 2, 1, 0, 15],
    [22, 2, 3, 2, 2, 2, 3, 2, 3, 3, 0],
    [8, 1, 1, 2, 3, 1, 0, 0, 0, 0, 18],
    [5, 0, 0, 3, 1, 1, 0, 0, 0, 0, 25],
    [12, 0, 2, 1, 2, 3, 2, 1, 1, 0, 15],
    [23, 3, 3, 3, 3, 3, 2, 3, 2, 1, 0],
    [26, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1],
    [24, 3, 3, 3, 3, 3, 1, 3, 3, 2, 1],
    [3, 0, 0, 1, 1, 0, 0, 0, 1, 0, 15],
    [13, 2, 3, 0, 3, 1, 2, 2, 0, 0, 17],
    [7, 1, 2, 2, 0, 1, 0, 1, 0, 0, 19],
    [25, 3, 3, 3, 3, 3, 3, 3, 1, 3, 2],
    [11, 3, 3, 3, 1, 0, 0, 1, 0, 0, 7],
    [2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 6],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 26],
    [20, 3, 2, 3, 3, 3, 3, 0, 3, 0, 3],
    [21, 2, 3, 3, 3, 3, 3, 3, 1, 0, 4],
    [9, 2, 3, 0, 1, 1, 1, 0, 1, 0, 17],
    [6, 0, 0, 2, 0, 2, 2, 0, 0, 0, 16],
    [4, 1, 1, 1, 0, 0, 1, 0, 0, 0, 21],
    [7, 1, 1, 3, 1, 0, 1, 0, 0, 0, 20],
    [12, 2, 3, 3, 1, 1, 1, 1, 0, 0, 26],
    [10, 2, 1, 1, 1, 2, 1, 2, 0, 0, 6],
    [9, 2, 0, 3, 1, 0, 1, 1, 1, 0, 4],
    [20, 3, 1, 3, 3, 1, 3, 3, 0, 3, 6],
    [8, 1, 2, 3, 0, 1, 0, 1, 0, 0, 15],
    [5, 1, 1, 1, 2, 0, 0, 0, 0, 0, 10],
    [11, 3, 0, 0, 3, 1, 1, 3, 0, 0, 5],
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
  ];

  // Breast cancer screening: status, days since the last screening (null: none on record),
  // treatment plan, mammogram frequency, days since responding.
  const BREAST_ANSWERS = [
    ["Positive", 134, "Chemotherapy", "Bi-Yearly", 16],
    ["Negative", 330, "None", "Yearly", 9],
    ["Negative", 30, "None", "Yearly", 22],
    ["Negative", 87, "None", "Yearly", 17],
    ["Unknown", null, "-", "-", 0],
    ["Unknown", null, "-", "-", 0],
    ["Negative", 314, "None", "Yearly", 22],
    ["Positive", 37, "Radiation", "Bi-Yearly", 12],
    ["Positive", 159, "Radiation", "Bi-Yearly", 5],
    ["Negative", 169, "None", "Yearly", 13],
    ["Negative", 101, "None", "Yearly", 1],
    ["Negative", 295, "None", "Yearly", 12],
    ["Unknown", null, "-", "-", 1],
    ["Unknown", null, "-", "-", 1],
    ["Unknown", null, "-", "-", 2],
    ["Positive", 30, "Chemotherapy", "Bi-Yearly", 16],
    ["Positive", 161, "Hormone therapy", "Bi-Yearly", 9],
    ["Negative", 131, "None", "Yearly", 21],
    ["Positive", 27, "Radiation", "Bi-Yearly", 26],
    ["Negative", 109, "None", "Yearly", 15],
    ["Negative", 119, "None", "Yearly", 23],
    ["Negative", 236, "None", "Yearly", 20],
    ["Positive", 133, "Surgery", "Bi-Yearly", 8],
    ["Positive", 134, "Hormone therapy", "Bi-Yearly", 18],
    ["Unknown", null, "-", "-", 3],
    ["Unknown", null, "-", "-", 4],
    ["Positive", 101, "Chemotherapy", "Bi-Yearly", 1],
    ["Unknown", null, "-", "-", 6],
    ["Negative", 211, "None", "Yearly", 22],
  ];

  // Fall prevention: problems with balance, fallen recently, talked to a doctor, share of the
  // video watched (%), reward chosen, days since responding.
  const FALL_ANSWERS = [
    ["No", "Yes", "No", 100, "Target", 9],
    ["Yes", "No", "Yes", 78, "Walgreens", 10],
    ["Yes", "Yes", "No", 100, "Walgreens", 0],
    ["No", "No", "No", 100, "Walgreens", 22],
    ["Yes", "Yes", "No", 92, "Walgreens", 0],
    ["No", "No", "No", 96, "Target", 22],
    ["No", "No", "No", 100, "Target", 26],
    ["No", "Yes", "Yes", 100, "Target", 6],
    ["No", "No", "Yes", 100, "Target", 21],
    ["No", "Yes", "Yes", 100, "Target", 8],
    ["Yes", "Yes", "No", 100, "Walgreens", 1],
    ["Yes", "No", "Yes", 100, "Walgreens", 22],
    ["No", "No", "Yes", 100, "Walgreens", 5],
    ["Yes", "Yes", "No", 51, "Target", 1],
    ["No", "No", "Yes", 100, "Walgreens", 8],
    ["No", "No", "No", 100, "Walgreens", 21],
    ["No", "No", "Yes", 100, "Target", 24],
    ["Yes", "Yes", "No", 100, "Walgreens", 2],
    ["Yes", "Yes", "No", 92, "Target", 3],
    ["Yes", "No", "No", 100, "Walgreens", 6],
    ["Yes", "Yes", "No", 37, "Walgreens", 4],
    ["No", "No", "No", 100, "Target", 5],
    ["No", "Yes", "No", 92, "Target", 3],
    ["No", "No", "Yes", 100, "Walgreens", 18],
    ["Yes", "Yes", "Yes", 100, "Walgreens", 7],
    ["No", "No", "No", 100, "Target", 24],
    ["Yes", "No", "Yes", 96, "Walgreens", 10],
    ["No", "No", "Yes", 100, "Walgreens", 1],
    ["Yes", "Yes", "No", 100, "Target", 6],
  ];

  // Each program's responses and Actionable count at each clinic, in CLINICS' order. They add up
  // to the program's totals.
  const PHQ9_CLINICS = [
    [28396, 6555],
    [24691, 4112],
    [22222, 4542],
    [18518, 2733],
    [16049, 3098],
    [13580, 2416],
  ];

  const BREAST_CLINICS = [
    [2583, 1371],
    [2247, 861],
    [2022, 1013],
    [1685, 778],
    [1460, 875],
    [1236, 534],
  ];

  const FALL_CLINICS = [
    [7363, 1482],
    [6403, 1188],
    [5763, 1388],
    [4802, 834],
    [4162, 887],
    [3522, 542],
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
  // A program has:
  //   total, actionable, payouts  its headline counts
  //   categories  the groups its bar chart shows. tone is the step of the blue ramp (4 = IHT
  //               blue, 1 = palest); the group counted as Actionable is red instead.
  //   clinics     its responses and Actionable count at each clinic
  //   questions   how patients answered: each question's answers and their shares (%). With
  //               sharedKey, every question has the same answers, so one key serves them all.
  //   rows        its sample responses, one per sample patient, for the download. actionable
  //               says whether the patient needs follow-up, and order() sorts the file.
  //   columns     what the download saves for each response: a heading and how to read it off
  //               a row.

  const person = (i) => ({ name: PATIENTS[i][0], id: PATIENTS[i][1], age: PATIENTS[i][2], clinic: CLINICS[PATIENTS[i][3]] });
  const newestFirst = (a, b) => a.responded - b.responded;
  // A question: its name, its answers as [name, share, tone], and a note on who it covers, if not
  // everyone.
  const answer = (label, parts, note) => ({
    label: label,
    note: note,
    parts: parts.map((part) => ({ label: part[0], share: part[1], tone: part[2] })),
  });
  const COLUMNS = [
    ["Name", (row) => row.name],
    ["Patient ID", (row) => row.id],
    ["Age", (row) => String(row.age)],
    ["Clinic", (row) => row.clinic],
    ["Responded", (row) => daysAgo(row.responded)],
    ["Actionable", (row) => (row.actionable ? "Yes" : "No")],
  ];

  const PHQ9_BANDS = [[20, "Severe"], [15, "Moderately severe"], [10, "Moderate"], [5, "Mild"], [0, "Minimal"]];
  const PHQ9_CHOICES = ["Not at all", "Several days", "More than half the days", "Nearly every day"];
  // Each question, and the share of patients (%) who gave each of the four answers.
  const PHQ9_ITEMS = [
    ["Anhedonia", [30, 28, 19, 23]],
    ["Depression", [31, 27, 18, 24]],
    ["Sleep", [24, 26, 21, 29]],
    ["Fatigue", [22, 26, 22, 30]],
    ["Appetite", [36, 29, 19, 16]],
    ["Self-Worth", [39, 27, 19, 15]],
    ["Concentration", [40, 28, 19, 13]],
    ["Psychomotor", [54, 25, 13, 8]],
    ["Suicidal Thoughts", [77, 14, 5, 4]],
  ];
  // The sample's fall-risk level: one step up for each of problems with balance, a recent fall,
  // and not having talked to a doctor.
  const FALL_RISKS = ["None", "Mild", "Moderate", "Severe"];

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
      clinics: PHQ9_CLINICS,
      answersTitle: "How patients answered",
      sharedKey: true,
      questions: PHQ9_ITEMS.map((item) => answer(item[0], PHQ9_CHOICES.map((choice, k) => [choice, item[1][k], k + 1]))),
      rows: PATIENTS.map((patient, i) => {
        const given = PHQ9_ANSWERS[i];
        const severity = PHQ9_BANDS.find((band) => given[0] >= band[0])[1];
        return Object.assign(person(i), {
          score: given[0],
          severity: severity,
          answers: given.slice(1, 10),
          responded: given[10],
          actionable: given[0] >= 20,
        });
      }),
      // The highest scores first, and of two the same, the newer.
      order: (a, b) => b.score - a.score || a.responded - b.responded,
      columns: COLUMNS.concat([["Score", (row) => String(row.score)], ["Severity", (row) => row.severity]],
        PHQ9_ITEMS.map((item, k) => [item[0], (row) => String(row.answers[k])])),
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
      clinics: BREAST_CLINICS,
      answersTitle: "Screening details",
      questions: [
        answer("Last Screening", [["Within the past year", 31, 4], ["1 to 2 years ago", 21, 2], ["None on record", 48, "followup"]]),
        answer("Mammogram Frequency", [["Yearly", 21, 4], ["Bi-Yearly", 31, 2], ["Not set", 48, 1]]),
        answer("Treatment Plan", [["Chemotherapy", 34, 4], ["Radiation", 27, 3], ["Surgery", 22, 2], ["Hormone therapy", 17, 1]],
          "Patients with breast cancer"),
      ],
      rows: PATIENTS.map((patient, i) => {
        const given = BREAST_ANSWERS[i];
        return Object.assign(person(i), {
          status: given[0],
          screened: given[1] == null ? "None on record" : daysAgo(given[1]),
          plan: given[2],
          frequency: given[3],
          responded: given[4],
          actionable: given[0] === "Unknown",
        });
      }),
      order: newestFirst,
      columns: COLUMNS.concat([
        ["Breast Cancer Status", (row) => row.status],
        ["Last Screening", (row) => row.screened],
        ["Treatment Plan", (row) => row.plan],
        ["Mammogram Frequency", (row) => row.frequency],
      ]),
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
      clinics: FALL_CLINICS,
      answersTitle: "How patients answered",
      questions: [
        answer("Problems with Balance", [["Yes", 41, 4], ["No", 59, 1]]),
        answer("Fallen Recently", [["Yes", 34, 4], ["No", 66, 1]]),
        answer("Talked to Doctor", [["Yes", 39, 4], ["No", 61, 1]]),
        answer("Watched Video", [["Nearly all of it", 78, 4], ["Half or more", 14, 2], ["Less than half", 8, 1]]),
        answer("Reward Type", [["Target", 54, 4], ["Walgreens", 46, 2]]),
      ],
      rows: PATIENTS.map((patient, i) => {
        const given = FALL_ANSWERS[i];
        const risk = FALL_RISKS[(given[0] === "Yes") + (given[1] === "Yes") + (given[2] === "No")];
        return Object.assign(person(i), {
          risk: risk,
          balance: given[0],
          fallen: given[1],
          doctor: given[2],
          video: given[3] + "%",
          reward: given[4],
          responded: given[5],
          actionable: risk === "Severe",
        });
      }),
      order: newestFirst,
      columns: COLUMNS.concat([
        ["Risk Level", (row) => row.risk],
        ["Problems with Balance", (row) => row.balance],
        ["Fallen Recently", (row) => row.fallen],
        ["Talked to Doctor", (row) => row.doctor],
        ["Watched Video", (row) => row.video],
        ["Reward Type", (row) => row.reward],
      ]),
    },
  ];

  // Every screening the dashboard names, in its three groups. Only the three above are part of
  // this demo; the rest are listed dimmed.
  const groups = [
    { name: "Mental Health Assessments", items: ["PHQ-9", "GAD-7", "PCL-5"] },
    { name: "HEDIS-Related Assessments",
      items: ["Breast Cancer Screening", "Colorectal Cancer Screening", "Comprehensive Diabetes Care"] },
    { name: "Incentive Programs", items: ["Fall Prevention", "Incontinence", "Medication Adherence"] },
  ];
  const byName = (name) => programs.find((program) => program.name === name);
  const notInDemo = groups.flatMap((group) => group.items).filter((name) => !byName(name));
  const sum = (key) => programs.reduce((total, program) => total + (program[key] || 0), 0);
  const totals = { total: sum("total"), actionable: sum("actionable"), payouts: sum("payouts") };

  // ---------- Headline figures ----------

  // A row of large numbers. kind "followup" gives the label the red key, "reward" the green one.
  function figuresFor(numbers) {
    const items = [
      { label: "Total Responses", value: count(numbers.total) },
      { label: "Actionable", value: count(numbers.actionable), kind: "followup",
        note: share(numbers.actionable, numbers.total) + " of responses" },
      numbers.payouts && { label: "Reward Payouts", value: "$" + count(numbers.payouts), kind: "reward" },
    ].filter(Boolean);
    return h("dl", { class: "dash-figures" }, items.map((item) =>
      h("div", { class: "dash-figure" + (item.kind ? " dash-figure--" + item.kind : "") },
        h("dt", null, item.label),
        h("dd", null, item.value),
        item.note && h("dd", { class: "dash-figure__note" }, item.note))));
  }

  // ---------- Bars ----------

  const tone = (item) => "dash-tone--" + (item.actionable ? "followup" : item.tone);

  // A bar per item, the longest as wide as the chart, each with its count and a share beside it.
  // The bars are for the eye; the numbers are the text. An item: label, under (a smaller line
  // below the label), size (what the bar measures), count and share (the text), and its tone.
  function bars(items) {
    const longest = Math.max.apply(null, items.map((item) => item.size));
    const list = h("ul", { class: "dash-bars", role: "list" }, items.map((item) =>
      h("li", { class: "dash-bar" },
        h("span", { class: "dash-bar__label" }, item.label, item.under && h("small", null, item.under)),
        h("span", { class: "dash-bar__track", "aria-hidden": "true" },
          h("span", { class: "dash-bar__fill " + tone(item), style: "width: " + ((100 * item.size) / longest).toFixed(1) + "%" })),
        h("span", { class: "dash-bar__count" }, item.count),
        h("span", { class: "dash-bar__share" }, item.share))));
    growOnce(list);
    return list;
  }

  // A program's results: a bar per group, with its count and its share of the responses.
  const results = (program) => bars(program.categories.map((category) => ({
    label: category.label, size: category.count, count: count(category.count), share: share(category.count, program.total),
    tone: category.tone, actionable: category.actionable,
  })));

  // The same count by clinic: the clinic with the most Actionable patients first, each with the
  // share of its own responses that they are.
  const byClinic = (program) => bars(program.clinics
    .map((numbers, i) => ({
      label: CLINICS[i], under: count(numbers[0]) + " responses", size: numbers[1], count: count(numbers[1]),
      share: share(numbers[1], numbers[0]), tone: 4,
    }))
    .sort((a, b) => b.size - a.size));

  // A program's groups as one thin strip, the Actionable group first, for comparing programs at
  // a glance. Decoration: the numbers are always beside it.
  function strip(program) {
    const ordered = program.categories.filter((c) => c.actionable).concat(program.categories.filter((c) => !c.actionable));
    return h("div", { class: "dash-strip", "aria-hidden": "true" }, ordered.map((category) =>
      h("span", { class: tone(category), style: "flex-grow: " + category.count })));
  }

  // Bars grow from nothing the first time they come into view, unless the reader's device asks
  // for less motion (then they're simply there). A list is in view once its top is 15% of the way
  // up the window, so one taller than the window still gets drawn.
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const grower = !calm && "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        grower.unobserve(entry.target);
        entry.target.classList.replace("is-waiting", "is-drawn");
      }
    });
  }, { rootMargin: "0px 0px -15% 0px" });

  function growOnce(list) {
    if (grower) {
      list.classList.add("is-waiting");
      grower.observe(list);
    }
  }

  // ---------- The download ----------

  // No patient is shown on a page. This button saves a program's responses as a file instead
  // (here the sample's), with the patients who need follow-up at the top.
  function download(program) {
    const button = h("button", { type: "button", class: "iht-btn dash-quiet" }, "Download responses");
    button.addEventListener("click", () => {
      saveCsv(program.id + "-responses.csv",
        program.columns.map((column) => column[0]),
        program.rows.slice()
          .sort((a, b) => b.actionable - a.actionable || program.order(a, b))
          .map((row) => program.columns.map((column) => column[1](row))));
    });
    return button;
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

  // ---------- How patients answered ----------

  // A strip per question, split by answer. With a shared key (PHQ-9's four answers) the shares
  // are written in the strips and the key sits once above them; otherwise each question lists
  // its own answers and shares under its strip. Shares under 10% are too narrow to write in, so
  // every part also says what it is when the mouse rests on it.
  function answers(program) {
    const key = (parts, withShares) => h("ul", { class: "dash-key", role: "list" }, parts.map((part) =>
      h("li", null,
        h("span", { class: "dash-key__swatch dash-tone--" + part.tone, "aria-hidden": "true" }),
        withShares ? [part.label + " ", h("b", null, part.share + "%")] : part.label)));
    return h("div", { class: "dash-answers" },
      program.sharedKey && key(program.questions[0].parts, false),
      h("ul", { class: "dash-answer-list", role: "list" }, program.questions.map((question) =>
        h("li", { class: "dash-answer" },
          h("span", { class: "dash-answer__label" }, question.label, question.note && h("small", null, question.note)),
          h("span", { class: "dash-answer__strip", "aria-hidden": "true" }, question.parts.map((part) =>
            h("span", { class: "dash-tone--" + part.tone, style: "flex-grow: " + part.share,
              title: part.label + ": " + part.share + "%" },
              program.sharedKey && part.share >= 10 ? part.share + "%" : null))),
          program.sharedKey
            ? h("span", { class: "iht-sr-only" }, ": " + question.parts.map((part) => part.label + " " + part.share + "%").join(", "))
            : key(question.parts, true)))));
  }

  // ---------- The views ----------

  // Both are looked up by the address's #name, so they're bare objects: "#constructor" and the
  // like must find nothing.
  const views = Object.create(null);   // name -> its <section>
  const links = Object.create(null);   // name -> its sidebar link
  const sample = () => h("span", { class: "dash-sample" }, "Sample data");

  // A view's title with the "Sample data" note beside it, and across from them what the view
  // offers to do (a program's download).
  const titleRow = (name, action) => h("div", { class: "dash-title" },
    h("div", { class: "dash-title__name" }, h("h1", { class: "dash-h1", tabindex: "-1" }, name), sample()),
    action);

  // Everything at a glance: the totals, then a row per program that leads to its view.
  function overview() {
    return h("section", { id: "view-overview", class: "dash-view" },
      titleRow("Overview"),
      figuresFor(totals),
      h("h2", { class: "dash-h2 dash-view__h2" }, "Programs"),
      h("ul", { class: "dash-programs", role: "list" }, programs.map((program) =>
        h("li", { class: "dash-program" },
          h("div", { class: "dash-program__name" },
            h("a", { href: "#" + program.id }, program.name),
            h("span", null, program.group)),
          h("dl", { class: "dash-program__numbers" },
            h("div", null, h("dt", null, "Total Responses"), h("dd", null, count(program.total))),
            h("div", { class: "is-followup" }, h("dt", null, "Actionable"), h("dd", null, count(program.actionable)))),
          strip(program)))),
      h("p", { class: "dash-note" }, "Not part of this demo: " + notInDemo.join(", ") + "."));
  }

  // One program: its numbers and its results, then the Actionable count by clinic and the
  // answers by question.
  function programView(program) {
    return h("section", { id: "view-" + program.id, class: "dash-view" },
      h("p", { class: "dash-group" }, program.group),
      titleRow(program.name, download(program)),
      figuresFor(program),
      h("h2", { class: "dash-h2 dash-view__h2" }, program.chartTitle),
      results(program),
      h("div", { class: "dash-pair" },
        h("section", { "aria-labelledby": "clinics-" + program.id },
          h("h2", { class: "dash-h2", id: "clinics-" + program.id }, "By clinic"),
          h("p", { class: "dash-caption" }, "Actionable patients at each clinic, and their share of its responses."),
          byClinic(program)),
        h("section", { "aria-labelledby": "answers-" + program.id },
          h("h2", { class: "dash-h2", id: "answers-" + program.id }, program.answersTitle),
          answers(program))));
  }

  // ---------- The sidebar, and the phone's picker ----------

  function sidebar() {
    const link = (id, label, extra) => {
      links[id] = h("a", { href: "#" + id }, h("span", null, label), extra);
      return h("li", null, links[id]);
    };
    return h("div", { class: "dash-nav__inner" },
      h("ul", { role: "list" }, link("overview", "Overview")),
      groups.map((group, i) => [
        h("p", { class: "dash-nav__group", id: "dash-group-" + i }, group.name),
        h("ul", { role: "list", "aria-labelledby": "dash-group-" + i }, group.items.map((name) => {
          const program = byName(name);
          return program
            ? link(program.id, name, h("span", { class: "dash-nav__count" }, count(program.actionable),
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
    groups.forEach((group) => {
      picker.append(h("optgroup", { label: group.name }, group.items.map((name) => {
        const program = byName(name);
        return h("option", { value: program ? program.id : null, disabled: program ? null : "" }, name);
      })));
    });
    picker.addEventListener("change", () => {
      location.hash = picker.value;
    });
  }

  // ---------- Which view shows ----------

  function show(name, arrived) {
    Object.keys(views).forEach((key) => {
      views[key].hidden = key !== name;
      if (key === name) {
        links[key].setAttribute("aria-current", "page");
      } else {
        links[key].removeAttribute("aria-current");
      }
    });
    picker.value = name;
    const title = views[name].querySelector("h1");
    document.title = title.textContent + " | Dashboard | IHT";
    if (arrived) {
      // A view someone just chose starts at its top, and its title takes focus so it's read out.
      // It starts there at once: the theme's smooth scrolling would slide the new view past.
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } catch (error) {
        window.scrollTo(0, 0);   // a browser that doesn't know "instant"
      }
      title.focus({ preventScroll: true });
    }
  }

  // No #name at all means the overview (as when Back returns to the first address). A #name that
  // isn't a view (the skip link's #main) leaves the view alone, or opens the overview on the
  // first load.
  function route(arrived) {
    const name = location.hash.slice(1) || "overview";
    if (views[name]) {
      show(name, arrived);
    } else if (!arrived) {
      show("overview", false);
    }
  }

  const root = document.getElementById("dash-views");
  [overview()].concat(programs.map(programView)).forEach((view) => {
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
