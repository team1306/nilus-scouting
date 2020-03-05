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
});