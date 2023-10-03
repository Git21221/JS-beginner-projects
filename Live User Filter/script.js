/*
we are going to use 
https://randomuser.me/api/
this returns though oonly 1 user by default hence we use query field
https://randomuser.me/api/?results=20   for 20 users
*/

const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

//function to get data
async function getData() {

    const res = await fetch('https://randomuser.me/api?results=500')

    const { results } = await res.json()
    //we need data.results

    result.innerHTML = ''  //removes the text loading

    results.forEach(user => {
       const li = document.createElement('li') 
       listItems.push(li)
       li.innerHTML = `
       <img src="${user.picture.large}" alt="${user.name.first}">
       <div class="userinfo">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>
       `
       result.appendChild(li)
    })
}

//function to filter data
function filterData(typed){
    listItems.forEach(item =>{
        a= item.innerText.toLowerCase()
        b= typed.toLowerCase()
        if(a.includes(b)){
            item.classList.remove('hide')
        }
        else
        {
            item.classList.add('hide')
        }
    })
}
