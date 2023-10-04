var data = document.querySelectorAll(".drum");

for(var i = 0; i<data.length; i++){

      data[i].addEventListener("click", function(){

        var value = this.textContent;

      makeSound(value);
      bottonAnimation(value);
     }
      );
}

function makeSound(key){
     switch(key){
          case "C":
          var first = new Audio("sounds/tom-1.mp3");
          first.play();
          break;
     
          case "A":
               var second = new Audio("sounds/tom-2.mp3");
               second.play();
               break;
     
          case "L":
               var third = new Audio("sounds/tom-3.mp3");
               third.play();
               break;
     
          case "Y":
               var fourth = new Audio("sounds/tom-4.mp3");
               fourth.play();
               break;
          
          case "P":
               var fifth = new Audio("sounds/snare.mp3");
               fifth.play();
               break;
     
          case "S":
          var sixth = new Audio("sounds/kick-bass.mp3");
          sixth.play();
          break;
         
          case "O":
               var seventh = new Audio("sounds/crash.mp3");
               seventh.play();
     
          }
     }

     document.addEventListener("keypress", function(event){
        makeSound(event.key);
        bottonAnimation(event.key);
     });
     
function bottonAnimation(keyType){
  var actionButton = document.querySelector("."+keyType);
  actionButton.classList.add("pressed");

  setTimeout(function(){
     actionButton.classList.remove("pressed");
  }, 100);

}