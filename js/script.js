
const btnRefs = {};

//loads buttons into btnRefs object for easy retrieval, then updates page with appropriate coloring and text
const init = () => {
    $(".saveBtn").each(function() {
        const time = $(this).attr("data-time");
        const selector = "textarea[data-time='" + time + "']";
        btnRefs[time] = $(selector);
    });
    loadData();
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    refreshList(moment().hour());
    let timer = setInterval(() => {
        refreshList(moment().hour());
    }, 60000);
}

//retrieves saved events from localstorage and displays them on the appropriate time blocks
const loadData = () => {
    $.each(btnRefs, function() {
        const text = localStorage.getItem($(this).attr("data-time")) != null ? localStorage.getItem($(this).attr("data-time")) : "";
        $(this).val(text);
    });
}

//saves the text in the associated area to localstorage
$(".saveBtn").click(function() {
    const text = btnRefs[$(this).attr("data-time")].val();
    localStorage.setItem($(this).attr("data-time"), text);
});

//takes a parameter for the current hour and applies color coding to time blocks
const refreshList = hour => {
    $.each(btnRefs, function() {
        $(this).removeClass("past present future");
        const timeRef = $(this).attr("data-time");
        if(timeRef < hour) $(this).addClass("past");
        else if(timeRef > hour) $(this).addClass("future");
        else $(this).addClass("present");
    })
}

init();