$(document).ready(function()
{
   $("#buttonSubmit").click(function()
   {
        if(confirm("Ready to submit?"))
        {
            $("#formScouting").submit();
        }
        else
        {
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

function hookUpAdderButton(button, fieldEl, increment)
{
    button.click(function()
    {
        var newVal;
        var current = fieldEl.value;
        current = (current === "") ? 0 : parseInt(current);
        if(isNaN(current)) { current = 0; }
        newVal = current + increment;
        if(newVal < 0) { newVal = 0; }
        fieldEl.value = newVal;
    });
}