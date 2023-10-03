function generateLeapYears() 
{
    const startYear = parseInt(document.getElementById("startYear").value);
    const endYear = parseInt(document.getElementById("endYear").value);
    let leapYears = [];

    for(let year = startYear; year <= endYear; year++) 
    {
        if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) 
        {
            leapYears.push(year);
        }
    }

    const resultDiv = document.getElementById("result");
    
    if(leapYears.length === 0) resultDiv.innerHTML = "No leap years in the range exist!";
    else resultDiv.innerHTML = "Leap years in the range: " + leapYears.join(", ");
}