document.addEventListener("DOMContentLoaded", function() {
    // Load previous data, if it doesnt exist, default to beginning values
    let gomers = JSON.parse(localStorage.getItem('gomer')) ?? 0;
    let gomersPerClick = JSON.parse(localStorage.getItem('gomerPerClick')) ?? 1;
    document.querySelector("#gomeramount").textContent = `${formatNum(gomers)} gomer`
    let gomer = new Audio("gomer.wav");
    let button = document.querySelector("#per-click-upgrade")
    let intervalID;
    // Add click functionality to gomer
    document.querySelector("#gomer").onclick = function() {
        clickGomer();
    }

    let startingCost = JSON.parse(localStorage.getItem('gomerCost')) ?? 10;
    button.textContent = `Upgrade for ${startingCost} gomers`;
    let currentCost = startingCost;
    button.onclick = function() {
        if (gomers >= currentCost) {
            gomers -= currentCost;
            document.querySelector("#gomeramount").textContent = `${formatNum(gomers)} gomer`;
            currentCost *= 1.75;
            currentCost = Math.floor(currentCost);
            button.textContent = `Upgrade for ${formatNum(currentCost)} gomers`;
            gomersPerClick *= 1.75;
            gomersPerClick = Math.ceil(gomersPerClick);
            document.querySelector("#per-click-amount").textContent = `${formatNum(gomersPerClick)} gomer per click`
        }
    }

    function formatNum(num) {
        const suffixes = [
            "", "thousand", "million", "billion", "trillion", 
            "quadrillion", "quintillion", "sextillion", "septillion", 
            "octillion", "nonillion", "decillion", "undecillion", 
            "duodecillion", "tredecillion", "quattuordecillion", 
            "quindecillion", "sexdecillion", "septendecillion", 
            "octodecillion", "novemdecillion", "vigintillion"
        ];
    
        let numStr = num.toString(); 
    
        let index = Math.floor((numStr.length - 1) / 3);
    
        if (index >= suffixes.length) {
            return num;
        }
        let shortNum = (num / Math.pow(10, index * 3)).toFixed(2);
    
        return `${shortNum} ${suffixes[index]}`;
    }
    
    let boughtAutoClicker = !!JSON.parse(localStorage.getItem('boughtAutoClicker')) ?? !!0;
    let autoClickerButton = document.querySelector("#auto-clicker-upgrade");
    let interval = 1000;
    if (boughtAutoClicker) {
        turnOnAutoClicker();
    }
    autoClickerButton.onclick = function() {
        if (gomers >= 100000 && !boughtAutoClicker) {
            gomers -= 100000;
            turnOnAutoClicker();
        }
    }
    function turnOnAutoClicker() {
        document.querySelector("#gomeramount").textContent = `${formatNum(gomers)} gomer`;
        intervalID = setInterval(clickGomer, interval);
        boughtAutoClicker = true;
        autoClickerButton.disabled = true;
    };
    function clickGomer() {
        gomer.play();
        gomers += gomersPerClick;
        document.querySelector("#gomeramount").textContent = `${formatNum(gomers)} gomer`
    }

    document.querySelector("#clear").onclick = function() {
        let b = confirm("This button will clear gomers, do you want to continue?");
        if (b) {
            localStorage.clear();
            gomers = 0;
            gomersPerClick = 1;
            currentCost = 10;
            boughtAutoClicker = false;
            clearInterval(intervalID);
            autoClickerButton.disabled = false;
            document.querySelector("#gomeramount").textContent = `${formatNum(gomers)} gomer`;
            button.textContent = `Upgrade for ${currentCost} gomers`;
            document.querySelector("#per-click-amount").textContent = `${gomersPerClick} gomer per click`;
        }
    }
    window.onbeforeunload = function() {
        localStorage['gomer'] = JSON.stringify(gomers);
        localStorage['gomerCost'] = JSON.stringify(currentCost);
        localStorage['gomerPerClick'] = JSON.stringify(gomersPerClick);
        localStorage['boughtAutoClicker'] = JSON.stringify(Number(boughtAutoClicker));
    }
})

