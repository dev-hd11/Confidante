window.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var fs = document.getElementById("fs");
        var main = document.getElementById("main");

        fs.style.display = 'none';
        main.style.display = 'flex';
    }, 2000);
    var loader = document.getElementById("loader");
    var loader2 = document.getElementById("loader2");
    var btn = document.getElementById("btn");

    btn.addEventListener("click", function() {
        btn.style.cursor = 'wait';
        btn.style.opacity = '0.5';
        loader.className = 'fa fa-cog spinIt';
        loader2.className = 'fa fa-cog spinIt';

        setTimeout(function() {
            window.location.href = fs.getAttribute("data-url");
        }, 3000);
    });
});

//(C) 2023 - present, Himank Deka. All rights reserved.