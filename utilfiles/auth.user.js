/*
(c) 2023, Himank Deka
*/

function showInvalid() {
    if (invalid == "true") {
        var msg_sect = document.getElementById("msg-sect");
        var icon = document.getElementById("icon");
        icon.className = "fa-sharp fa-solid fa-exclamation fa-bounce text-danger";
        msg_sect.className = "text-danger";
        msg_sect.innerHTML = " Invalid credentials";
    } else {
        console.info("System clear!");
    }    
}