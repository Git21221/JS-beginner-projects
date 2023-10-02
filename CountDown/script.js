const ld=document.querySelector('#ld');
const theme=document.querySelector('.theme');

 ld.addEventListener("click", function(){
  theme.classList.toggle("dark");
  ld.classList.toggle("light");
  if(ld.innerText=='LIGHT') ld.innerText='DARK';
  else ld.innerText='LIGHT';
 })

const userInput= document.getElementById("userDate");
// const a = prompt("enter ");
// console.log(typeof(a),"this is" , a);const endtime=" 21 may 2023  ";
const endtime= prompt("set date(month-date-year) and time(hours-minutes-seconds) ,Format is MM-DD-YY HH-MM-SS.Eg: 07-07-2024 12:00:12");
if(endtime.length == 0) {
    alert("Enter Date and Time in given format,Format is MM-DD-YY HH-MM-SS to start Countdown");
    endtime= prompt("set date(month-date-year) and time(hours-minutes-seconds) ,Format is MM-DD-YY HH-MM-SS.");
}
const inputs=document.getElementsByClassName("i");
function clock(){
    const end=new Date(endtime);
    const now= new Date();
    const diff=(end-now)/1000;
    if(diff<0) return;
    inputs[0].value=Math.floor(diff/3600/24);
    inputs[1].value=Math.floor(diff/3600)%24;
    inputs[2].value=Math.floor(diff/60)%60;
    inputs[3].value=Math.floor(diff%60);
}
clock();
setInterval ( ()=>{
    clock()
},1000
)