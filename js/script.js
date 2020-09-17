
const btnRefs = {};

//loads buttons into btnRefs object for easy retrieval
const init = () => {
    $(".saveBtn").each(function() {
        let time = $(this).attr("data-time");
        let selector = "textarea[data-time='" + time + "']";
        btnRefs[time] = $(selector);
    })
}

init();