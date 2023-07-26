function switchTab(event, mainTabId, secondaryTabId) {
    var tabs = document.getElementsByClassName("content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("hidden");
    }

    var mainTabs = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < mainTabs.length; i++) {
        mainTabs[i].classList.remove("selected");
    }
    document.getElementById(mainTabId).classList.add("selected");

    var secondaryTabs = document.getElementsByClassName("secondary-navbar");
    for (var i = 0; i < secondaryTabs.length; i++) {
        secondaryTabs[i].classList.add("hidden");
    }
    document.getElementById(secondaryTabId).classList.remove("hidden");

    var secondaryTabLinks = document.querySelectorAll(".secondary-navbar a");
    for (var i = 0; i < secondaryTabLinks.length; i++) {
        secondaryTabLinks[i].classList.remove("selectedSub");
    }
    let clickedId = event.target.id;
    document.querySelectorAll(`[id*="${clickedId.slice(-3)}-1"]`)[0].classList.add("selectedSub");

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
    }
    document.getElementById(tabId).classList.add("selectedSub");

    return false;
}

function drawChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
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
                {
                    data: [23456, 12345, 15432, 35678, 36545],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            // cutout: '80%',  // for doughnut visualization
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            size: 16, // Adjust the legend font size as desired
                        },
                    },
                },
                title: {
                    display: true,
                    text: "PHQ-9 Responses",
                    font: {
                        size: 24, // Adjust the title font size as desired
                        weight: "bold", // Optionally adjust font weight
                    },
                },
            },
        },
    });
}

/*

Little interest or pleasure in doing things (anhedonia)
Feeling down, depressed, or hopeless
Trouble falling or staying asleep, or sleeping too much (insomnia or hypersomnia)
Feeling tired or having little energy
Poor appetite or overeating
Feeling bad about yourself or that you are a failure or have let yourself or your family down
Trouble concentrating on things, such as reading the newspaper or watching television
Moving or speaking so slowly that other people could have noticed, or the opposite, being so fidgety or restless that you have been moving around a lot more than usual
Thoughts that you would be better off dead or of hurting yourself in some way
*/

function patientList() {
    const tableHTML = `
    <table id="data-table">
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
            <td>Robert Lee</td>
            <td>123456792</td>
            <td>61</td>
            <td>22</td>
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
    const table = tableWrapper.querySelector("#data-table");
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
    Swal.fire({
        title: "Patient List",
        html: tableWrapper, // Use the table wrapper with sortable features
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Download",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Downloaded!", "Your file has been downloaded.", "success");
        }
    });
}

drawChart();
