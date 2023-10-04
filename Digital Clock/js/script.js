
const clock12 = document.querySelector(".twelve");
const clock24 = document.querySelector(".twentyfour");
const day = document.querySelector(".day");


function updateClock() {
    let date = new Date();

    

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const time24Hour = `${hours}:${minutes}:${seconds}`;

    
    const options12Hour = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const time12Hour = date.toLocaleTimeString(undefined, options12Hour);


    clock12.innerHTML = `${time12Hour}`;
    clock24.innerHTML = `${time24Hour}`;


    day.innerHTML = ` ${date}`;
    
}

setInterval(updateClock, 1000);
updateClock();