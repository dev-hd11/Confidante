window.addEventListener("DOMContentLoaded", function() {
    var isError = document.getElementById("pass_form").getAttribute("data-err")

    if (isError == 'yes') {
        this.document.getElementById("error").textContent = "*Invalid Password";
    }
});
// (C) 2023-present, Himank Deka