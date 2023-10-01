document.addEventListener("DOMContentLoaded", function () {
    const passwordLengthInput = document.getElementById("passwordLength");
    const includeUppercaseCheckbox = document.getElementById("includeUppercase");
    const includeLowercaseCheckbox = document.getElementById("includeLowercase");
    const includeNumbersCheckbox = document.getElementById("includeNumbers");
    const includeSymbolsCheckbox = document.getElementById("includeSymbols");
    const generatePasswordButton = document.getElementById("generatePassword");
    const passwordInput = document.getElementById("password");
    const copyToClipboardButton = document.getElementById("copyToClipboard");

    generatePasswordButton.addEventListener("click", generatePassword);

    function generatePassword() {
        const length = parseInt(passwordLengthInput.value);
        const includeUppercase = includeUppercaseCheckbox.checked;
        const includeLowercase = includeLowercaseCheckbox.checked;
        const includeNumbers = includeNumbersCheckbox.checked;
        const includeSymbols = includeSymbolsCheckbox.checked;

        let availableChars = "";

        if (includeUppercase) {
            availableChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        if (includeLowercase) {
            availableChars += "abcdefghijklmnopqrstuvwxyz";
        }

        if (includeNumbers) {
            availableChars += "0123456789";
        }

        if (includeSymbols) {
            availableChars += "!@#$%^&*()_+[]{}|;:,.<>?";
        }

        if (!availableChars) {
            alert("Please select at least one character type.");
            return;
        }

        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars.charAt(randomIndex);
        }

        passwordInput.value = password;
    }

    copyToClipboardButton.addEventListener("click", function () {
        passwordInput.select();
        document.execCommand("copy");
        alert("Password copied to clipboard!");
    });
});
