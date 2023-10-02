function validateCreditCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const resultElement = document.getElementById('result');
    
    // Remove spaces and non-digit characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');
    
    // Check if the card number is a valid format using regex
    const cardPattern = /^(?:3[47]\d{13}|(?:4\d|5[1-5])\d{14}|6011\d{12}|(?:2131|1800)\d{11})$/;
    
    if (!cardPattern.test(cleanedCardNumber)) {
        resultElement.textContent = 'Invalid credit card number!';
        resultElement.className = 'invalid';
        return; // Exit early if the format is invalid
    }
    
    // Apply the Luhn algorithm
    const cardArray = cleanedCardNumber.split('').reverse().map(Number);
    const sum = cardArray.reduce(function (acc, digit, index) {
        if (index % 2 === 1) {
            const doubledDigit = digit * 2;
            return acc + (doubledDigit > 9 ? doubledDigit - 9 : doubledDigit);
        }
        return acc + digit;
    }, 0);

    if (sum % 10 === 0) {
        resultElement.textContent = 'Valid credit card number!';
        resultElement.className = 'valid';
    } else {
        resultElement.textContent = 'Invalid credit card number!';
        resultElement.className = 'invalid';
    }
}


function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

const toggleDarkModeButton = document.getElementById('toggleDarkMode');
toggleDarkModeButton.addEventListener('click', toggleDarkMode);


