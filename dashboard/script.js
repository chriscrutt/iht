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
    var data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
    ]);

    var options = {
        title: "My Daily Activities",
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
    chart.draw(data, options);
}

window.onload = drawChart;