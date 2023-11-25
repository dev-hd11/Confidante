/*
(c) 2023, Himank Deka.
*/

function checkForm() {
    var val = document.forms["protect"]["passwd"].value;
    if (String(val) == "dj832") {
        window.location.href = "http://localhost:8000/set_stff";
    } else {
        var msg = document.getElementById("msg");
        msg.className = "text-danger";
        msg.innerHTML = "Invalid credentials"
    }
}