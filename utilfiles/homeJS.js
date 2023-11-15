/*
(c) 2023, Himank Deka.
*/
function change(code) {
    if (code == 1) {
        document.getElementById("frst").className = "spinner-grow spinner-grow-sm";
    } else if (code == 2) {
        document.getElementById("scnd").className = "spinner-grow spinner-grow-sm";
    } else if (code == 3) {
        document.getElementById("thrd").className = "spinner-grow spinner-grow-sm";
    } else if (code == 4) {
        document.getElementById("frth").className = "spinner-grow spinner-grow-sm";
    } else if (code == 5) {
        animateAbt();
    } else if (code == 6) {
        document.getElementById("six").className = "spinner-grow spinner-grow-sm";
    } else if (code == 7) {
        document.getElementById("seven").className = "spinner-grow spinner-grow-sm";
    }
}



setInterval(getTime, 10000);

function setDefault(code) {
    if (code == 0) {
        return;
    }
    document.getElementById("frst").className = "";
    document.getElementById("thrd").className = "";
    document.getElementById("frth").className = "";
    document.getElementById("six").className = "";
    document.getElementById("seven").className = "";
}

function getTime(code) {
    setDefault(code);
    const current = new Date();
    var str_form = String(current.getMinutes())
    document.getElementById("time").innerText = `${(current.getHours() > 12) ? current.getHours() - 12 : current.getHours()}:${(current.getMinutes() < 10) ? "0" + str_form : current.getMinutes()}`;
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function animateAbt() {
    document.getElementById("ffth").className = "spinner-grow spinner-grow-sm";
    await sleep(1000);
    document.getElementById("ffth").className = "";
}