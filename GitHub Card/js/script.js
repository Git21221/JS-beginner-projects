const requestURL = 'https://api.github.com/users/git21221';
const image = document.querySelector('#image');
const name = document.querySelector('.insertname');
const followers = document.querySelector('.insertfollowers');
const id = document.querySelector('.insertID');
const xhr = new XMLHttpRequest();
xhr.open('GET', requestURL);
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
        const apiInfo = JSON.parse(xhr.responseText);
        image.setAttribute('src', apiInfo.avatar_url);
        name.innerHTML = apiInfo.name;
        followers.innerHTML = apiInfo.followers;
        id.innerHTML = apiInfo.id;
    }
}
xhr.send();