
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
const generateTimeBlocks = (start, end) => {
    let hour = start;
    let container = $(".container");
    while(hour <= end) {
        //generate time element
        const timeEl = $("<div>");
        timeEl.addClass("col-1 hour");
        const ampm = hour > 11 ? "PM" : "AM";
        timeEl.text(hour + ampm);
        //generate textarea element
        //generate button
        
        //generate row
        const row = $("<div>");
        row.addClass("row time-block");
        row.html(`<div class="col-1 hour">${hour}${ampm}</div><textarea class="col-10 description past" data-time="${hour}"></textarea><button class="col-1 saveBtn" data-time="${hour}">Save</button>`)
        //add to row
        
        //add to container
        container.append(row);
        hour++;
    }
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