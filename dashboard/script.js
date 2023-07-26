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
                },
                title: {
                    display: true,
                    text: "PHQ-9 Responses",
                },
            },
        },
    });
}

window.onload = drawChart;
