// enterNextField.js

$(".breadName").keyup(function (event) {
    if (event.keyCode == 13) {
        textboxes = $("input.breadName");
        currentBoxNumber = textboxes.index(this);
        if (textboxes[currentBoxNumber + 1] != null) {
            nextBox = textboxes[currentBoxNumber + 1];
            nextBox.focus();
            nextBox.select();
        }
        event.preventDefault();
        return false;
    }
});
console.log("ok this time");