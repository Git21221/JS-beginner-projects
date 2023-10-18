
const image = document.querySelector('#image');
const newname = document.querySelector('.insertname');
const following = document.querySelector('.insertfollowing');
const followers = document.querySelector('.insertfollowers');
const id = document.querySelector('.insertID');
const usernameInput = document.querySelector("#username");



async function profile(name = "shouryasinghrathore") {
    try {
        let response = await fetch(`https://api.github.com/users/${name}`);

        if (response.status === 404) {
            profile();
            document.getElementById("inputValue").value = "";
            alert("Enter Valid Username");
        } else if (response.ok) {
            let apiInfo = await response.json();
            console.log(apiInfo);
            image.setAttribute('src', apiInfo.avatar_url);
            newname.innerHTML = apiInfo.login;
            console.log(apiInfo.login);
            following.innerHTML = apiInfo.following;
            followers.innerHTML = apiInfo.followers;
            id.innerHTML = apiInfo.id;
        } else {
            console.error("Error fetching user data");
            alert("Error fetching user data");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function searchOnEnter() {
    document.getElementById("inputValue").addEventListener('keypress', (n) => {
        if (n.key === 'Enter') { processInput(); }
    })
}

function processInput() {
    let inputValue = document.getElementById("inputValue").value;
    if (inputValue.trim() !== "") {
        usernameInput.classList.remove("search-container-error");
        profile(inputValue);
    } else {
        usernameInput.classList.add("search-container-error");
    }
} 

profile();
searchOnEnter();