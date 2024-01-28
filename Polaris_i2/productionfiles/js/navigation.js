window.addEventListener("DOMContentLoaded", function() {
    var lb = document.getElementById("lb");
    var isOpen = false;
    var aboutBtn = document.getElementById("about-us");
    var bdg = document.getElementById("bdg");
    var close = document.getElementById("close");
    var section = document.getElementById("about_sec");

    bdg.style.textShadow = 'none';

    aboutBtn.addEventListener("click", function() {
        if (!isOpen) {
            section.style.display = 'flex';
            close.className = 'fa fa-close';
        } else {
            section.style.display = 'none';
            close.className = '';
        }

        isOpen = !isOpen;
    });

    lb.addEventListener("click", function() {
        window.location.href = document.getElementById("content").getAttribute("data-home");
    });
});

//(C) 2023 - present, Himank Deka. All rights reserved.
