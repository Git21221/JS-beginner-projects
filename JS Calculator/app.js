let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;

        if (buttonText == '*') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'C') {
            screenValue = '';
            screen.value = screenValue;

        }
        else if (buttonText == '=') {
            screen.value = eval(screenValue);
        }

        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })


}
document.addEventListener("keypress", event => {
    if (event.keyCode === 13 && screen.value) {
        screen.value = eval(screen.value);
    }
})

