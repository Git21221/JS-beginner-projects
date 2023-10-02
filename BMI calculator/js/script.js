const form = document.querySelector("form");
const calc = document.querySelector("button");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const height = parseFloat(document.querySelector("#height").value); //value will take after entering int
    const weight = parseFloat(document.querySelector("#weight").value);
    const result = document.querySelector("#result");
    if(height < 0 || height === '' || isNaN(height)) result.innerHTML = "Please input a correct value";
    else if(weight < 0 || weight === '' || isNaN(weight)) result.innerHTML = "Please input a correct value";
    else{
        let bmi =  (weight / (height * height)).toFixed(2);
        if(bmi >= 18.6 && bmi <= 24.9) result.innerHTML = `Normal and BMI ${bmi}`;
        if(bmi < 18.6) result.innerHTML = `UnderWeight and BMI ${bmi}`;
        if(bmi > 24.9) result.innerHTML = `Motu and BMI ${bmi}`;
    }
})

const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const stylesheet = document.getElementById("stylesheet");

toggleDarkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    // Toggle the stylesheet between light and dark modes
    if (stylesheet.getAttribute("href") === "css/style.css") {
        stylesheet.setAttribute("href", "css/dark-style.css");
    } else {
        stylesheet.setAttribute("href", "css/style.css");
    }
});