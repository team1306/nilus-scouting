$(document).ready(function () {
    $("#buttonSubmit").click(function () {
        if (confirm("Ready to submit?")) {
            $("#formScouting").submit();
        }
        else {
            return false;
        }
    });

    hookUpAdderButton($("#btnAutoLowInc"), $("#inputAutoLow")[0], 1);
    hookUpAdderButton($("#btnAutoLowDec"), $("#inputAutoLow")[0], -1);
    hookUpAdderButton($("#btnAutoHighInc"), $("#inputAutoHigh")[0], 1);
    hookUpAdderButton($("#btnAutoHighDec"), $("#inputAutoHigh")[0], -1);
    hookUpAdderButton($("#btnTeleLowInc"), $("#inputTeleLow")[0], 1);
    hookUpAdderButton($("#btnTeleLowDec"), $("#inputTeleLow")[0], -1);
    hookUpAdderButton($("#btnTeleHighInc"), $("#inputTeleHigh")[0], 1);
    hookUpAdderButton($("#btnTeleHighDec"), $("#inputTeleHigh")[0], -1);
});

function hookUpAdderButton(button, fieldEl, increment) {
    button.click(function () {
        var newVal;
        var current = fieldEl.value;
        current = (current === "") ? 0 : parseInt(current);
        if (isNaN(current)) { current = 0; }
        newVal = current + increment;
        if (newVal < 0) { newVal = 0; }
        fieldEl.value = newVal;
    });
}

function autofillReport(report) {
    console.log(report);
    if (report) {
        let fields = Object.keys(report);
        for (field of fields) {
            // search for non-buttons
            $(`input[name="${field}"][type!="radio"][type!="checkbox"]`).val(report[field]);
            // special button cases
            $(`input[value="${report[field]}"][type="radio"]`).prop("checked", true);
            $(`input[name="${field}"][type="checkbox"]`).prop("checked", true);
        }
    }
}

// insert team name and match number into the form
let match = queryParameters.getOne("matchNumber");
let team = queryParameters.getOne("teamNumber");
if (match && team) {
    // check if existing element
    store.fetchReportByKey(store.matchToKey(match, team)).then(autofillReport);
} else {
    console.log("Did not have expected page search parameters.");
    alert("Page did not load properly!");
}
$("input#matchNumber").val(match)
$("input#teamNumber").val(team)
