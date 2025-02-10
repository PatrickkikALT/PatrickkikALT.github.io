let i = JSON.parse(localStorage.getItem('gomer')) ?? 0;
window.onload = function() {
    document.querySelector("#gomeramount").textContent = `${i} gomer`
    document.querySelector("#gomer").onclick = function() {
        let gomer = new Audio("gomer.wav");
        gomer.play();
        i++;
        document.querySelector("#gomeramount").textContent = `${i} gomer`
    }
    document.querySelector("#clear").onclick = function() {
        let b = confirm("This button will clear gomers, do you want to continue?");
        if (b) {
            i = 0;
            document.querySelector("#gomeramount").textContent = `${i} gomer`
        }
    }
};
window.onbeforeunload = function() {
    localStorage['gomer'] = JSON.stringify(i)
}