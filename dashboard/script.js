function switchTab(event, mainTabId, secondaryTabId) {
    // The tabs are links to "#": don't jump to the top of the page.
    event.preventDefault();
    var tabs = document.getElementsByClassName("content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("hidden");
    }

    // aria-current tells screen readers which tab is chosen, as the underline shows.
    var mainTabs = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < mainTabs.length; i++) {
        mainTabs[i].classList.remove("selected");
        mainTabs[i].removeAttribute("aria-current");
    }
    document.getElementById(mainTabId).classList.add("selected");
    document.getElementById(mainTabId).setAttribute("aria-current", "true");

    var secondaryTabs = document.getElementsByClassName("secondary-navbar");
    for (var i = 0; i < secondaryTabs.length; i++) {
        secondaryTabs[i].classList.add("hidden");
    }
    document.getElementById(secondaryTabId).classList.remove("hidden");

    var secondaryTabLinks = document.querySelectorAll(".secondary-navbar a");
    for (var i = 0; i < secondaryTabLinks.length; i++) {
        secondaryTabLinks[i].classList.remove("selectedSub");
        secondaryTabLinks[i].removeAttribute("aria-current");
    }
    let clickedId = event.target.id;
    var firstSub = document.querySelectorAll(`[id*="${clickedId.slice(-3)}-1"]`)[0];
    firstSub.classList.add("selectedSub");
    firstSub.setAttribute("aria-current", "true");

    if (clickedId.slice(-1) == "1") {
        document.getElementById("content1").classList.remove("hidden");
    } else if (clickedId.slice(-1) == "2") {
        document.getElementById("content4").classList.remove("hidden");
    } else {
        document.getElementById("content7").classList.remove("hidden");
    }

    return false;
}

function switchContent(contentId, tabId) {
    var contents = document.getElementsByClassName("content");
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.add("hidden");
    }
    document.getElementById(contentId).classList.remove("hidden");

    var secondaryTabs = document.querySelectorAll(".secondary-navbar a");
    for (var i = 0; i < secondaryTabs.length; i++) {
        secondaryTabs[i].classList.remove("selectedSub");
        secondaryTabs[i].removeAttribute("aria-current");
    }
    document.getElementById(tabId).classList.add("selectedSub");
    document.getElementById(tabId).setAttribute("aria-current", "true");

    return false;
}

// Every tab is a link to "#". None of them should jump to the top of the page, including the
// sub-tabs that don't work yet.
document.querySelectorAll('.dash-tabs a[href="#"]').forEach(function (tab) {
    tab.addEventListener("click", function (event) {
        event.preventDefault();
    });
});

function phq9PatientList() {
    const tableHTML = `
    <table id="phq9-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Patient ID</th>
            <th>Age</th>
            <th>Score</th>
            <th>Anhedonia</th>
            <th>Depression</th>
            <th>Sleep</th>
            <th>Fatigue</th>
            <th>Appetite</th>
            <th>Self-Worth</th>
            <th>Concentration</th>
            <th>Psychomotor</th>
            <th>Suicidal Thoughts</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mary Johnson</td>
            <td>123456791</td>
            <td>55</td>
            <td>10</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Robert Lee</td>
            <td>123456792</td>
            <td>61</td>
            <td>22</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Emily Chen</td>
            <td>123456793</td>
            <td>45</td>
            <td>8</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michael Brown</td>
            <td>123456794</td>
            <td>39</td>
            <td>5</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sarah Wilson</td>
            <td>123456795</td>
            <td>50</td>
            <td>12</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>David Martin</td>
            <td>123456796</td>
            <td>63</td>
            <td>17</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Linda Anderson</td>
            <td>123456797</td>
            <td>69</td>
            <td>19</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Taylor</td>
            <td>123456798</td>
            <td>78</td>
            <td>24</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ava Lewis</td>
            <td>123456799</td>
            <td>34</td>
            <td>3</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>James Clark</td>
            <td>123456700</td>
            <td>56</td>
            <td>13</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sophia Martinez</td>
            <td>123456701</td>
            <td>41</td>
            <td>7</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Joseph Hernandez</td>
            <td>123456702</td>
            <td>59</td>
            <td>18</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Olivia Nelson</td>
            <td>123456703</td>
            <td>48</td>
            <td>11</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>John Doe</td>
            <td>123456704</td>
            <td>32</td>
            <td>2</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Emma Adams</td>
            <td>123456705</td>
            <td>29</td>
            <td>1</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michaela King</td>
            <td>123456706</td>
            <td>60</td>
            <td>16</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Alexander Turner</td>
            <td>123456707</td>
            <td>64</td>
            <td>21</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Grace Miller</td>
            <td>123456708</td>
            <td>52</td>
            <td>9</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ethan Parker</td>
            <td>123456709</td>
            <td>46</td>
            <td>6</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Chloe Brooks</td>
            <td>123456710</td>
            <td>37</td>
            <td>4</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Andrew Scott</td>
            <td>123456711</td>
            <td>44</td>
            <td>7</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Zoe Adams</td>
            <td>123456712</td>
            <td>57</td>
            <td>12</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Mason Sanchez</td>
            <td>123456713</td>
            <td>51</td>
            <td>10</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Leah Allen</td>
            <td>123456714</td>
            <td>49</td>
            <td>9</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Turner</td>
            <td>123456715</td>
            <td>62</td>
            <td>16</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Abigail Foster</td>
            <td>123456716</td>
            <td>47</td>
            <td>8</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Lucas Simmons</td>
            <td>123456717</td>
            <td>36</td>
            <td>5</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ella Watson</td>
            <td>123456718</td>
            <td>53</td>
            <td>11</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Oliver Carter</td>
            <td>123456719</td>
            <td>31</td>
            <td>2</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
    </tbody>
    </table>
  
    `;

    // Initialize the sorting functionality before displaying the table
    const tableWrapper = document.createElement("div");
    tableWrapper.innerHTML = tableHTML;
    const table = tableWrapper.querySelector("#phq9-table");
    const tbody = table.querySelector("tbody");
    const ths = table.querySelectorAll("th");
    let sortOrder = 1; // 1 for ascending, -1 for descending

    ths.forEach((th) => {
        th.addEventListener("click", () => {
            const colIndex = th.cellIndex;
            const rows = Array.from(tbody.querySelectorAll("tr"));

            rows.sort((a, b) => {
                const aValue = a.cells[colIndex].textContent;
                const bValue = b.cells[colIndex].textContent;
                return sortOrder * aValue.localeCompare(bValue, undefined, { numeric: true });
            });

            tbody.innerHTML = "";
            rows.forEach((row) => tbody.appendChild(row));

            sortOrder = -sortOrder; // Reverse the sort order for the next click
        });
    });

    // Display the table in SweetAlert2 modal
    showPatientList(tableWrapper);
}

function breastCancerPatientList() {
    const tableHTML = `
    <table id="breastCancer-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Patient ID</th>
            <th>Age</th>
            <th>Breast Cancer Status</th>
            <th>Last Screening</th>
            <th>Treatment Plan</th>
            <th>Mammogram Frequency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mary Johnson</td>
            <td>123456791</td>
            <td>55</td>
            <td>Positive</td>
            <td>07-21-2023</td>
            <td>Chemotherapy</td>
            <td>Bi-Yearly</td>
        </tr>
        <tr>
            <td>Robert Lee</td>
            <td>123456792</td>
            <td>61</td>
            <td>Negative</td>
            <td>10-07-2022</td>
            <td>None</td>
            <td>Yearly</td>
        </tr>
        <tr>
            <td>Emily Chen</td>
            <td>123456793</td>
            <td>45</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michael Brown</td>
            <td>123456794</td>
            <td>39</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sarah Wilson</td>
            <td>123456795</td>
            <td>50</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>David Martin</td>
            <td>123456796</td>
            <td>63</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Linda Anderson</td>
            <td>123456797</td>
            <td>69</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Taylor</td>
            <td>123456798</td>
            <td>78</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ava Lewis</td>
            <td>123456799</td>
            <td>34</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>James Clark</td>
            <td>123456700</td>
            <td>56</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sophia Martinez</td>
            <td>123456701</td>
            <td>41</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Joseph Hernandez</td>
            <td>123456702</td>
            <td>59</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Olivia Nelson</td>
            <td>123456703</td>
            <td>48</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>John Doe</td>
            <td>123456704</td>
            <td>32</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Emma Adams</td>
            <td>123456705</td>
            <td>29</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michaela King</td>
            <td>123456706</td>
            <td>60</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Alexander Turner</td>
            <td>123456707</td>
            <td>64</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Grace Miller</td>
            <td>123456708</td>
            <td>52</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ethan Parker</td>
            <td>123456709</td>
            <td>46</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Chloe Brooks</td>
            <td>123456710</td>
            <td>37</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Andrew Scott</td>
            <td>123456711</td>
            <td>44</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Zoe Adams</td>
            <td>123456712</td>
            <td>57</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Mason Sanchez</td>
            <td>123456713</td>
            <td>51</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Leah Allen</td>
            <td>123456714</td>
            <td>49</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Turner</td>
            <td>123456715</td>
            <td>62</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Abigail Foster</td>
            <td>123456716</td>
            <td>47</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Lucas Simmons</td>
            <td>123456717</td>
            <td>36</td>
            <td>Positive</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ella Watson</td>
            <td>123456718</td>
            <td>53</td>
            <td>Unknown</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Oliver Carter</td>
            <td>123456719</td>
            <td>31</td>
            <td>Negative</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
    </tbody>
    </table>
  
    `;

    // Initialize the sorting functionality before displaying the table
    const tableWrapper = document.createElement("div");
    tableWrapper.innerHTML = tableHTML;
    const table = tableWrapper.querySelector("#breastCancer-table");
    const tbody = table.querySelector("tbody");
    const ths = table.querySelectorAll("th");
    let sortOrder = 1; // 1 for ascending, -1 for descending

    ths.forEach((th) => {
        th.addEventListener("click", () => {
            const colIndex = th.cellIndex;
            const rows = Array.from(tbody.querySelectorAll("tr"));

            rows.sort((a, b) => {
                const aValue = a.cells[colIndex].textContent;
                const bValue = b.cells[colIndex].textContent;
                return sortOrder * aValue.localeCompare(bValue, undefined, { numeric: true });
            });

            tbody.innerHTML = "";
            rows.forEach((row) => tbody.appendChild(row));

            sortOrder = -sortOrder; // Reverse the sort order for the next click
        });
    });

    // Display the table in SweetAlert2 modal
    showPatientList(tableWrapper);
}

function fallPatientList() {
    const tableHTML = `
    <table id="fall-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Patient ID</th>
            <th>Age</th>
            <th>Problems with Balance</th>
            <th>Fallen Recently</th>
            <th>Talked to Doctor</th>
            <th>Watched Video</th>
            <th>Reward Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mary Johnson</td>
            <td>123456791</td>
            <td>55</td>
            <td>No</td>
            <td>Yes</td>
            <td>No</td>
            <td>100%</td>
            <td>Target</td>
        </tr>
        <tr>
            <td>Robert Lee</td>
            <td>123456792</td>
            <td>61</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
            <td>78%</td>
            <td>Walgreens</td>
        </tr>
        <tr>
            <td>Emily Chen</td>
            <td>123456793</td>
            <td>45</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michael Brown</td>
            <td>123456794</td>
            <td>39</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sarah Wilson</td>
            <td>123456795</td>
            <td>50</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>David Martin</td>
            <td>123456796</td>
            <td>63</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Linda Anderson</td>
            <td>123456797</td>
            <td>69</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Taylor</td>
            <td>123456798</td>
            <td>78</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ava Lewis</td>
            <td>123456799</td>
            <td>34</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>James Clark</td>
            <td>123456700</td>
            <td>56</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Sophia Martinez</td>
            <td>123456701</td>
            <td>41</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Joseph Hernandez</td>
            <td>123456702</td>
            <td>59</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Olivia Nelson</td>
            <td>123456703</td>
            <td>48</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>John Doe</td>
            <td>123456704</td>
            <td>32</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Emma Adams</td>
            <td>123456705</td>
            <td>29</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Michaela King</td>
            <td>123456706</td>
            <td>60</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Alexander Turner</td>
            <td>123456707</td>
            <td>64</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Grace Miller</td>
            <td>123456708</td>
            <td>52</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ethan Parker</td>
            <td>123456709</td>
            <td>46</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Chloe Brooks</td>
            <td>123456710</td>
            <td>37</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Andrew Scott</td>
            <td>123456711</td>
            <td>44</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Zoe Adams</td>
            <td>123456712</td>
            <td>57</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Mason Sanchez</td>
            <td>123456713</td>
            <td>51</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Leah Allen</td>
            <td>123456714</td>
            <td>49</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>William Turner</td>
            <td>123456715</td>
            <td>62</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Abigail Foster</td>
            <td>123456716</td>
            <td>47</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Lucas Simmons</td>
            <td>123456717</td>
            <td>36</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Ella Watson</td>
            <td>123456718</td>
            <td>53</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Oliver Carter</td>
            <td>123456719</td>
            <td>31</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
    </tbody>
    </table>
    `;

    // Initialize the sorting functionality before displaying the table
    const tableWrapper = document.createElement("div");
    tableWrapper.innerHTML = tableHTML;
    const table = tableWrapper.querySelector("#fall-table");
    const tbody = table.querySelector("tbody");
    const ths = table.querySelectorAll("th");
    let sortOrder = 1; // 1 for ascending, -1 for descending

    ths.forEach((th) => {
        th.addEventListener("click", () => {
            const colIndex = th.cellIndex;
            const rows = Array.from(tbody.querySelectorAll("tr"));

            rows.sort((a, b) => {
                const aValue = a.cells[colIndex].textContent;
                const bValue = b.cells[colIndex].textContent;
                return sortOrder * aValue.localeCompare(bValue, undefined, { numeric: true });
            });

            tbody.innerHTML = "";
            rows.forEach((row) => tbody.appendChild(row));

            sortOrder = -sortOrder; // Reverse the sort order for the next click
        });
    });

    // Display the table in SweetAlert2 modal
    showPatientList(tableWrapper);
}

// ---------- The Patient List dialog ----------
// One dialog for all three lists. The table scrolls inside it (style.css), so its box takes
// focus as well: Tab reaches it, and the arrow keys and Page Up/Down scroll it. Screen readers
// name it by the dialog's title. While more columns are off to the right, the box's right edge
// fades (dash-list--more).
function showPatientList(tableWrapper) {
    var observer = null;
    sortableFromKeyboard(tableWrapper.querySelector("table"));
    Swal.fire({
        title: "Patient List",
        html: tableWrapper, // Use the table wrapper with sortable features
        showCancelButton: true,
        confirmButtonText: "Download",
        // Themed in style.css: Download is IHT Blue, Cancel is outlined.
        customClass: { popup: "dash-list" },
        didOpen: function (popup) {
            var box = Swal.getHtmlContainer();
            box.tabIndex = 0;
            box.setAttribute("role", "region");
            box.setAttribute("aria-labelledby", Swal.getTitle().id);
            var update = function () {
                // The fade stops short of the scrollbars, where a system draws them.
                popup.style.setProperty("--dash-scrollbar-w", box.offsetWidth - box.clientWidth + "px");
                popup.style.setProperty("--dash-scrollbar-h", box.offsetHeight - box.clientHeight + "px");
                popup.classList.toggle("dash-list--more",
                    box.scrollLeft + box.clientWidth < box.scrollWidth - 1);
            };
            box.addEventListener("scroll", update, { passive: true });
            if (window.ResizeObserver) {
                observer = new ResizeObserver(update);
                observer.observe(box);
                observer.observe(box.querySelector("table"));
            }
            update();
        },
        willClose: function () {
            if (observer) {
                observer.disconnect();
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Downloaded!", "Your file has been downloaded.", "success");
        }
    });
}

// Each list sorts by a column when its heading is clicked (the click handlers in the three list
// functions, which flip the order on every click). This puts each heading's text in a button, so
// the keyboard can sort too (the button's click reaches the heading's handler), and keeps
// aria-sort on the heading the list is sorted by.
function sortableFromKeyboard(table) {
    var order = 1; // the next click's order, as the list functions keep it: 1 = ascending
    table.querySelectorAll("th").forEach(function (th) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "dash-sort";
        button.textContent = th.textContent;
        th.textContent = "";
        th.appendChild(button);
        th.addEventListener("click", function () {
            table.querySelectorAll("th[aria-sort]").forEach(function (other) {
                other.removeAttribute("aria-sort");
            });
            th.setAttribute("aria-sort", order === 1 ? "ascending" : "descending");
            order = -order;
        });
    });
}

// The charts and the focus handling below keep their names to themselves (no globals); only
// the functions the page's onclick attributes call, showPatientList and sortableFromKeyboard are
// global.
(function () {

// ---------- Charts ----------
// Colours from the shared theme (../css/theme.css). Severity runs pale blue to IHT blue, less to
// more severe. The group counted as "Actionable" is Follow-up red, the same red as the key
// beside that figure.
var THEME = {
    ink: "#1f2328",
    blue: "#466eb6",
    followUp: "#b42318",
    // --iht-data-1 to -4. The two pale steps are under 3:1 against white, so their slices
    // and legend keys get a 2px IHT blue outline.
    data: ["#d3def2", "#a6bce5", "#7393cf", "#466eb6"],
    text: '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, sans-serif',
};
var OUTLINED = [THEME.data[0], THEME.data[1]];

// Canvas text (the tooltips) in the reading face, at the browser's default font size.
var remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
Chart.defaults.font.family = THEME.text;
Chart.defaults.font.size = remPx;
Chart.defaults.color = THEME.ink;
// The draw-in is the page's only motion; none when the reader asks for less.
if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Chart.defaults.animation = false;
}

// The legend is HTML (.dash-legend, beside the donut or under it; see style.css), so it wraps,
// grows with the browser's font size and can be read aloud. Pressing an entry hides or shows its
// slice, as Chart.js's own legend did.
var htmlLegend = {
    id: "htmlLegend",
    afterUpdate: function (chart) {
        var list = chart.canvas.closest(".dash-chart").querySelector(".dash-legend");
        var items = chart.options.plugins.legend.labels.generateLabels(chart);
        if (list.children.length !== items.length) {
            list.textContent = "";
            items.forEach(function (item) {
                var button = document.createElement("button");
                button.type = "button";
                button.className = "dash-legend__item";
                var key = document.createElement("span");
                key.className = "dash-legend__key";
                key.style.backgroundColor = item.fillStyle;
                if (OUTLINED.indexOf(item.fillStyle) !== -1) {
                    key.classList.add("dash-legend__key--outlined");
                }
                button.appendChild(key);
                button.appendChild(document.createTextNode(item.text));
                button.addEventListener("click", function () {
                    chart.toggleDataVisibility(item.index);
                    chart.update();
                });
                var entry = document.createElement("li");
                entry.appendChild(button);
                list.appendChild(entry);
            });
        }
        items.forEach(function (item, i) {
            list.children[i].firstChild.setAttribute("aria-pressed", item.hidden ? "false" : "true");
        });
    },
};

function chartOptions() {
    return {
        responsive: true,
        // Square, as wide as its box (.dash-chart__donut in style.css).
        aspectRatio: 1,
        cutout: "58%",
        layout: { padding: 8 },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: THEME.ink,
                padding: 12,
                cornerRadius: 6,
                boxPadding: 6,
                bodyFont: { size: remPx },
            },
        },
    };
}

// The pale slices are outlined in IHT blue. Every slice has a 2px border (the others in their
// own colour), centred on its edge, so with 4px of spacing each gap shows 2px of white.
function slices(data, colors) {
    return {
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(function (c) { return OUTLINED.indexOf(c) !== -1 ? THEME.blue : c; }),
        borderWidth: 2,
        spacing: 4,
        hoverOffset: 6,
    };
}

function drawPHQ9Chart() {
    var ctx = document.getElementById("phq9Chart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                "20-27 (severe)",
                "15-19 (moderately severe)",
                "10-14 (moderate)",
                "5-9 (mild)",
                "0-4 (minimal)",
            ],
            datasets: [
                // "20-27 (severe)" is the 23,456 shown as Actionable.
                slices([23456, 12345, 15432, 35678, 36545], [
                    THEME.followUp, THEME.data[3], THEME.data[2], THEME.data[1], THEME.data[0],
                ]),
            ],
        },
        options: chartOptions(),
        plugins: [htmlLegend],
    });
}

function drawBreastCancerChart() {
    var ctx = document.getElementById("breastCancerChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Has Breast Cancer", "Does Not Have Breast Cancer", "Awaiting Screening"],
            datasets: [
                // "Awaiting Screening" is the 5,432 shown as Actionable.
                slices([3456, 2345, 5432], [THEME.data[3], THEME.data[1], THEME.followUp]),
            ],
        },
        options: chartOptions(),
        plugins: [htmlLegend],
    });
}

function drawFallChart() {
    var ctx = document.getElementById("fallChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Severe", "Moderate", "Mild", "None"],
            datasets: [
                // "Severe" is the 6,321 shown as Actionable.
                slices([6321, 7495, 9463, 8736], [
                    THEME.followUp, THEME.data[2], THEME.data[1], THEME.data[0],
                ]),
            ],
        },
        options: chartOptions(),
        plugins: [htmlLegend],
    });
}

drawPHQ9Chart();
drawBreastCancerChart();
drawFallChart();

// A chart is a picture, so screen readers get its numbers as text: each canvas is an image
// named by the chart's title and every group with its count.
document.querySelectorAll(".dash-chart").forEach(function (figure) {
    var canvas = figure.querySelector("canvas");
    var chart = Chart.getChart(canvas);
    var counts = chart.data.labels.map(function (label, i) {
        return label + ": " + chart.data.datasets[0].data[i].toLocaleString("en-US");
    });
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label",
        figure.querySelector(".dash-chart__title").textContent + ". " + counts.join("; ") + ".");
});

// ---------- Focus and the sticky bar ----------
// The bar covers the top of the window. theme.css's scroll-margin keeps a control that takes
// focus clear of it whenever the browser scrolls to the control. Firefox doesn't scroll to one
// that is already inside the window, though, even when the bar covers part of it (a tab two
// lines tall, with a large default font on a phone), so that one is moved down here.
document.querySelector(".dash").addEventListener("focusin", function (event) {
    // Keyboard focus only. A mouse press focuses a tab or button too, and scrolling before the
    // button is released would move the control out from under the pointer and lose the click.
    try {
        if (!event.target.matches(":focus-visible")) {
            return;
        }
    } catch (e) {
        // No :focus-visible: keep the correction for every focus.
    }
    requestAnimationFrame(function () {
        var bar = document.querySelector(".iht-header").getBoundingClientRect().bottom;
        var top = event.target.getBoundingClientRect().top;
        if (top < bar) {
            window.scrollBy({ top: top - bar - 8, behavior: "instant" });
        }
    });
});

})();
