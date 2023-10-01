const form = document.querySelector("form");
    const calc = document.querySelector("button");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const height = parseFloat(document.querySelector("#height").value);
        const weight = parseFloat(document.querySelector("#weight").value);
        const result = document.querySelector("#result");
        if (height < 0 || height === '' || isNaN(height)) result.innerHTML = "Please input a correct value";
        else if (weight < 0 || weight === '' || isNaN(weight)) result.innerHTML = "Please input a correct value";
        else {
            let bmi = (weight / (height * height)).toFixed(2);
            if (bmi >= 18.6 && bmi <= 24.9) result.innerHTML = `Normal and BMI ${bmi}`;
            if (bmi < 18.6) result.innerHTML = `UnderWeight and BMI ${bmi}`;
            if (bmi > 24.9) result.innerHTML = `OverWeight and BMI ${bmi}`;
        }
    })