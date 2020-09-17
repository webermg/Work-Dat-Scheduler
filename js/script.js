
const btnRefs = {};

//loads buttons into btnRefs object for easy retrieval
const init = () => {
    $(".saveBtn").each(function() {
        const time = $(this).attr("data-time");
        const selector = "textarea[data-time='" + time + "']";
        btnRefs[time] = $(selector);
    });
    loadData();
}

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

init();