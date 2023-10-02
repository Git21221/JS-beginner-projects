let url="https://api.imgflip.com/get_memes";
let memo=document.getElementById("meme_img")
let texter=document.getElementById("text")
let memer=[]
let subr=["comedymemes","okbuddyretard","catmemes","dogmemes","wholesomemes","dankmemes","memes"]
function meme(){
    memo.classList.remove("fade")
    texter.classList.remove("fade")
    data=memer[Math.floor(Math.random()*100)]
  
   
    memo.innerHTML=`  <img src=${data.url} alt="meme" id="meme">`
        texter.textContent=data.name;
        memo.classList.add("fade")
        texter.classList.add("fade")
}
function getmemes(){
    fetch(url)
    .then((resp) => resp.json())
    .then( data=> {
        console.log(data.data.memes);
        memer=[...data.data.memes];
    })
}
getmemes();