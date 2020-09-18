
//gets textareas and relates them to button data-time values
const btnRefs = {};

//parameters for start and end time
const startTime = 9;
const endTime = 17;

//loads buttons into btnRefs object for easy retrieval, then updates page with appropriate coloring and text
const init = () => {
    generateTimeBlocks(startTime, endTime);
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

//generates the time blocks and adds them to the html
//the html generated for time of "9" is: 
//    <div class="row time-block">
//          <div class="col-1 hour">9AM</div>
//          <textarea class="col-10 description past" data-time="9"></textarea>
//          <button class="col-1 saveBtn" data-time="9">Save</button>
//   </div>
//blocks are appended to the ".container" element
//if start or end time is invalid false is returned
const generateTimeBlocks = (start, end) => {
    if(start > end || start < 0 || end > 23) return false;
    let hour = start;
    let container = $(".container");
    while(hour <= end) {
        //converting from 24 hour time to am/pm
        let hourText = hour < 13 ? hour : hour-12;
        if(hourText === 0) hourText = 12;
        const ampm = hour > 11 ? "PM" : "AM";
        
        //generate row
        const row = $("<div>");
        row.addClass("row time-block");
        row.html(`<div class="col-1 hour">${hourText}${ampm}</div><textarea class="col-10 description past" data-time="${hour}"></textarea><button class="col-1 saveBtn" data-time="${hour}">Save</button>`)
        //add to row
        
        //add to container
        container.append(row);
        hour++;
    }
    return true;
}

//retrieves saved events from localstorage and displays them on the appropriate time blocks
const loadData = () => {
    $.each(btnRefs, function() {
        const text = localStorage.getItem($(this).attr("data-time")) != null ? localStorage.getItem($(this).attr("data-time")) : "";
        $(this).val(text);
    });
}

//saves the text in the associated area to localstorage
$(document).on("click", ".saveBtn", function() {
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