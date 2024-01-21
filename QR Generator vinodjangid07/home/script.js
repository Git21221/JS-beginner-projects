
// ██╗░░░██╗██╗███╗░░██╗░█████╗░██████╗░
// ██║░░░██║██║████╗░██║██╔══██╗██╔══██╗
// ╚██╗░██╔╝██║██╔██╗██║██║░░██║██║░░██║
// ░╚████╔╝░██║██║╚████║██║░░██║██║░░██║
// ░░╚██╔╝░░██║██║░╚███║╚█████╔╝██████╔╝
// ░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚════╝░╚═════╝░
// ░░░░░██╗░█████╗░███╗░░██╗░██████╗░██╗██████╗░
// ░░░░░██║██╔══██╗████╗░██║██╔════╝░██║██╔══██╗
// ░░░░░██║███████║██╔██╗██║██║░░██╗░██║██║░░██║
// ██╗░░██║██╔══██║██║╚████║██║░░╚██╗██║██║░░██║
// ╚█████╔╝██║░░██║██║░╚███║╚██████╔╝██║██████╔╝
// ░╚════╝░╚═╝░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝╚═════╝░ 
let QrContainer = document.getElementById('Qr-container');
let exit = document.getElementById('exit');
let QR = document.getElementById('qr-code');
let input = document.getElementById('input');
let submit = document.getElementById('submit');
var loader = document.getElementById("loader");
let jpg = document.getElementById('forjpg');
let png = document.getElementById('forpng');
let svg = document.getElementById('forsvg');


// submit using click
submit.addEventListener('click',()=>{
    let fetchedData = input.value;

    if (input.value.length == 0) {
        input.classList.add('shake-horizontal');
        setTimeout(function() {
            input.classList.remove('shake-horizontal');
        }, 500);
        vibratePhone();
        
    } 
    
    
    else {
        QrContainer.classList.add('exit-Qr');
        let apiLink = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=30&data=${fetchedData}`;
        QR.src = apiLink;
    }
  

});
QR.addEventListener("load", function () {
  
    loader.classList.add('deactivate-loader');

});

// submit using enter press

document.body.addEventListener('keypress', (e) =>{
    if(e.key == 'Enter'){
        let fetchedData = input.value;

        if (input.value.length == 0) {
            input.classList.add('shake-horizontal');
            setTimeout(function() {
                input.classList.remove('shake-horizontal');
            }, 500);
            vibratePhone();
            // vibration function called
        } 
        
        
        else {
            QrContainer.classList.add('exit-Qr');
            let apiLink = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=30&data=${fetchedData}`;
            QR.src = apiLink;
        }
      
    }
});


// vibration if input field is empty
function vibratePhone() {
     if (navigator.vibrate) {
    navigator.vibrate(500);
    } else {
    console.log("Vibration API is not supported in your browser.");
    }
    };

// ====================================================================================================
// download button
let fileName = "QR CODE";
    jpg.addEventListener('click',()=>{
    let imgPath = QR.getAttribute('src')+`&format=jpeg`;
    saveAs(imgPath, fileName);  
        });

    png.addEventListener('click',()=>{
    let imgPath2 = QR.getAttribute('src')+`&format=png`;
    saveAs(imgPath2, fileName);
    });
    

    svg.addEventListener('click',()=>{
        let imgPath3 = QR.getAttribute('src')+`&format=svg`;
        saveAs(imgPath3, fileName);
        });
        
        





    //exit button  
exit.addEventListener('click',()=>{
    QrContainer.classList.remove('exit-Qr');
    loader.classList.remove('deactivate-loader');
});
