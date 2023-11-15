/*
(c) 2023, Himank Deka.
*/
function goTo() {
    input = document.forms["srch"]["search"].value;
    window.location.href = `http://localhost:8000/delete/${input}`;
}