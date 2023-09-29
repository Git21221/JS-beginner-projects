const button = document.querySelector('#button');
const body = document.querySelector('body');
let word;
// first task is to divide letters in some boxes
// so let's get some words with api
button.addEventListener('click', async () => {
    const res = await fetch('https://api.api-ninjas.com/v1/randomword',
        {
            headers: {
                'X-Api-Key': '4HnjBwIXaVOHoNYjokUA4g==6XkILNXalMBJAouH'
            }
        }
    )
    .then((response) => {
        // if(!response.ok) throw new Error('response is not ok');
        return response.json();
    })
    .then((data) => {
        console.log(data.word);
        word = data.word;
    })
    .catch((error) => {
        console.log(error);
    });
    let n = word.length;
    for(let i = 0; i < n; i++){
        const inputbox = document.createElement('input');
        inputbox.setAttribute('type', "submit");
        inputbox.setAttribute('value', "s");
        body.append(inputbox);
    }
})