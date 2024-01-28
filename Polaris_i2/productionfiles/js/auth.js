window.addEventListener("DOMContentLoaded", function() {
    var code = document.getElementById("right").getAttribute("data-status");

    if (code != 'no') {
        document.getElementById("err").innerHTML = "*Invalid Credentials!";
    }
});

//(C) 2023 - present, Himank Deka. All rights reserved.