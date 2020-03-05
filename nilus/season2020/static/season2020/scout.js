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
        var current = parseInt(fieldEl.value);
        var newVal = current + increment;
        if(newVal < 0) { return; }
        fieldEl.value = newVal;
    });
}