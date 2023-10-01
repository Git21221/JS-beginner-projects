// const clock = document.querySelector(".clock");
// setInterval(() => {
//     let date = new Date();
//     clock.innerHTML = date.toLocaleTimeString();
// }, 1000);


const clock = document.querySelector(".clock");

function updateClock() {
    let date = new Date();

    // 24-hour format
    const time24Hour = date.toLocaleTimeString();

    // 12-hour format
    const options12Hour = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const time12Hour = date.toLocaleTimeString(undefined, options12Hour);

    clock.innerHTML = ` ${time24Hour}<br>${time12Hour}`;
}

setInterval(updateClock, 1000);
updateClock(); // Call it once immediately to display the time on page load
