const players = []

//validation
const validators = {
    name: /^[A-Za-z ]{3,}$/,
    url: /\.(png|jpg|jpeg|webp|gif)$/,
    position: /^[A-Z]{1,3}$/,
    nationality: /^[A-Za-z ]+$/,
    club: /^[A-Za-z ]+$/,
    stats: /^[1-9][0-9]?$/,
}

const manageValidationErrors = (input, error) => {
    if(error != ""){
        input.classList.add('inputError')
        input.setAttribute('title', error)
    }else{
        if(input.classList.contains('inputError')){
            input.classList.remove('inputError')
            input.removeAttribute('title')
        }
    }
}

const createModal = document.getElementById('create-modal')
const createOpenBtn = document.getElementById('create-player')

const playersListModal = document.getElementById('list-modal')
const playersListOpenBtns = document.getElementsByClassName('stadCard')

const showModal = (modal) => {
    if(modal.classList.contains('hideModal'))
        modal.classList.remove('hideModal')
    modal.classList.add('showModal')
}

const hideModal = (modal) => {
    if(modal.classList.contains('showModal'))
        modal.classList.remove('showModal')
    modal.classList.add('hideModal')
}

//create modal
createOpenBtn.addEventListener('click', () => {
    showModal(createModal)
}) 

createModal.firstElementChild.lastElementChild.addEventListener('click', () => {
    hideModal(createModal)
})

//players list modal
Array.from(playersListOpenBtns).forEach(item => {
    item.addEventListener('click', () => {
        showModal(playersListModal)
    })
})

playersListModal.firstElementChild.lastElementChild.addEventListener('click', () => {
    hideModal(playersListModal)
})

//create a new player
const createNewPlayer = () => {
    const name = document.getElementById('name')
    const position = document.getElementById('position')
    const image = document.getElementById('image')
    const nationality = document.getElementById('nationality')
    const flag = document.getElementById('flag')
    const club = document.getElementById('club')
    const logo = document.getElementById('logo')
    const rating = document.getElementById('rating')
    const pace = document.getElementById('pace')
    const shooting = document.getElementById('shooting')
    const passing = document.getElementById('passing')
    const dribbling = document.getElementById('dribbling')
    const defending = document.getElementById('defending')
    const physical = document.getElementById('physical')

    //validation

    const data = {
        name : name.value,
        position : position.value,
        image : image.value,
        nationality : nationality.value,
        flag : flag.value,
        club : club.value,
        logo : logo.value,
        rating : rating.value,
        pace : pace.value,
        shooting : shooting.value,
        passing : passing.value,
        dribbling : dribbling.value,
        defending : defending.value,
        physical : physical.value
    }

    players.push(data)
    localStorage.setItem('players', JSON.stringify(players))
    hideModal(createModal)
}

document.getElementById('add-player').addEventListener('click', (e) => {
    e.preventDefault()
    createNewPlayer()
})

//change form inputs based on position
document.getElementById('position').addEventListener('change', (e) => {
    const pace = document.getElementById('pace')
    const shooting = document.getElementById('shooting')
    const passing = document.getElementById('passing')
    const dribbling = document.getElementById('dribbling')
    const defending = document.getElementById('defending')
    const physical = document.getElementById('physical')

    if(e.target.value == 'GK'){
        pace.previousElementSibling.textContent = 'Diving'
        pace.setAttribute('placeholder', 'Enter player diving')

        shooting.previousElementSibling.textContent = 'Handling'
        shooting.setAttribute('placeholder', 'Enter player handling')

        passing.previousElementSibling.textContent = 'Kicking'
        passing.setAttribute('placeholder', 'Enter player kicking')

        dribbling.previousElementSibling.textContent = 'Reflexes'
        dribbling.setAttribute('placeholder', 'Enter player reflexes')

        defending.previousElementSibling.textContent = 'Speed'
        defending.setAttribute('placeholder', 'Enter player speed')

        physical.previousElementSibling.textContent = 'Positioning'
        physical.setAttribute('placeholder', 'Enter player positioning')
    }else{
        pace.previousElementSibling.textContent = 'Pace'
        pace.setAttribute('placeholder', 'Enter player pace')

        shooting.previousElementSibling.textContent = 'Shooting'
        shooting.setAttribute('placeholder', 'Enter player shooting')

        passing.previousElementSibling.textContent = 'Passing'
        passing.setAttribute('placeholder', 'Enter player passing')

        dribbling.previousElementSibling.textContent = 'Dribbling'
        dribbling.setAttribute('placeholder', 'Enter player dribbling')

        defending.previousElementSibling.textContent = 'Defending'
        defending.setAttribute('placeholder', 'Enter player defending')

        physical.previousElementSibling.textContent = 'Physical'
        physical.setAttribute('placeholder', 'Enter player physical')
    }
})