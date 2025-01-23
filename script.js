document.addEventListener("DOMContentLoaded", function() {
    const hour = document.querySelector('.hour');
    const minute = document.querySelector('.minute');
    const second = document.querySelector('.second')
    let now = new Date(1200);
    function setDate() {
        now = new Date(900);
        let converted = [now.getHours(), now.getMinutes(), now.getSeconds()]
            .map(x => x < 10 ? "0" + x : x)
            .join(":");
        document.querySelector('.time').textContent = `The time is currently: ${converted}`
        const sDegrees = ((now.getSeconds() / 60) * 360);
        second.style.transform = `rotate(${sDegrees}deg)`

        const mDegrees = ((now.getMinutes() / 60) * 360) + ((now.getSeconds() / 60) * 6);
        minute.style.transform = `rotate(${mDegrees}deg)`

        const hDegrees = ((now.getHours() / 12) * 360) + ((now.getMinutes() / 60) * 30);
        hour.style.transform = `rotate(${hDegrees}deg)`
    }
    setInterval(setDate, 1000);
    setDate();
});

