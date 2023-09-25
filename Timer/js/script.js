    const sec = document.querySelector('.sec');
    const min = document.querySelector('.min');
    const hour = document.querySelector('.hour');
    const day = document.querySelector('.day');
    const start = document.querySelector('.start');
    const stop = document.querySelector('.stop');
    const reset = document.querySelector('.reset');
    const lap = document.querySelector('.lap');
    const body = document.querySelector('body');
    start.addEventListener('click', () => {
        interval1 = setInterval(() => {
            sec.value = parseInt(sec.value) + 1;
            if (parseInt(sec.value) === 60) {
                sec.value = 0;
            }
        }, 1000)
        interval2 = setInterval(() => {
            min.value = parseInt(min.value) + 1;
            if (parseInt(min.value) === 60) {
                min.value = 0;
            }
        }, 60000)
        interval3 = setInterval(() => {
            hour.value = parseInt(hour.value) + 1;
            if (parseInt(hour.value) === 24) {
                hour.value = 0;
            }
        }, 3600000)
        interval4 = setInterval(() => {
            day.value = parseInt(day.value) + 1;
        }, 86400000)
    })
    stop.addEventListener('click', () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
    })
    reset.addEventListener('click', () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        sec.value = 0;
        min.value = 0;
        hour.value = 0;
        day.value = 0;
    })
    lap.addEventListener('click', () => {
        const result = document.createElement('div');
        const resultDay = document.createElement('div');
        const resultHour = document.createElement('div');
        const resultMin = document.createElement('div');
        const resultSec = document.createElement('div');
        result.setAttribute('class', 'resultOfLap');
        result.appendChild(resultDay);
        result.appendChild(resultHour);
        result.appendChild(resultMin);
        result.appendChild(resultSec);
        body.appendChild(result);
        resultDay.innerHTML = day.value;
        resultHour.innerHTML = hour.value;
        resultMin.innerHTML = min.value;
        resultSec.innerHTML = sec.value;
    })