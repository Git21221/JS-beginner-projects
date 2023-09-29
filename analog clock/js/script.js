setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;

    hour.style.rotate = `${hr_rotation}deg`;
    minute.style.rotate = `${min_rotation}deg`;
    second.style.rotate = `${sec_rotation}deg`;
}, 1000);