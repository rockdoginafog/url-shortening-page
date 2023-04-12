const hamburger = document.querySelector('.hamburger-icon')
const rightSide = document.querySelector('.right-side')
const leftSide = document.querySelector('.left-side')
const input = document.querySelector('.input')
const shortenBtn = document.querySelector('.input-and-button')
const notification = document.querySelector('.notification')
const shortenedLinksContainer = document.querySelector('.shortened-links')

function shortenLink(){
    fetch (`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data.result.full_short_link)
        input.value = data.result.full_short_link
        navigator.clipboard.writeText(input.value)
        const newA = document.createElement('a')
        newA.classList.add('new-link')
        newA.href = input.value
        newA.innerHTML = input.value
        newA.classList.add('animation')
        shortenedLinksContainer.appendChild(newA)
        localStorage.setItem('shortened-links', shortenedLinksContainer.innerHTML)
    })
}

shortenBtn.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(input.value.length === 0){
        input.classList.add('red')
        input.classList.remove('green')
    }
    if(input.value.length > 0){
        input.classList.remove('red')
        input.classList.add('green')
        notification.classList.remove('hidden')
        setTimeout(function() {
        notification.classList.add('hidden')
        }, 5000)
        shortenLink()
    }
})

let getLocalStorage = localStorage.getItem('shortened-links')

if(getLocalStorage){
    shortenedLinksContainer.innerHTML = getLocalStorage
}

