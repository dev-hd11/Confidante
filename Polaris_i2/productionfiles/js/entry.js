window.addEventListener("DOMContentLoaded", function() {
    var error = this.document.getElementById("form-container").getAttribute("data-err");
    if (error == 'yes') {
        this.alert("Invalid data provided!");
    }
});

//  (C) 2023, Himank Deka.