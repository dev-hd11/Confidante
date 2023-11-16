/*
(c) 2023, Himank Deka.
*/
var password = window.prompt("Enter Password:");

if (password == "dj832") {
    console.log("Connection allowed to pass!");
    var str = "{{one_redirect}}"
    if (Boolean(str)) {
        console.log("Redirection Stopped!")
    } else {
        window.location.href = "http://localhost:8000/set_stff"
    }
} else {
    window.location.href = "/";
}