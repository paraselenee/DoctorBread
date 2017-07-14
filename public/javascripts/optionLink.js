var $ = jQuery;
$(document).ready(function() {
    $("#mySelect").change(function() {
        var curVal = $("#mySelect option:selected").val();
        if (curVal[0] === '/') {
            location = $("#mySelect option:selected").val();
        }
    });
});
