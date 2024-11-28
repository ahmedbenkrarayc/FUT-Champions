const players = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []

//positions

const positions = {
    def: ['CB', 'LB', 'RB'],
    mid: ['CM', 'CDM', 'RM', 'LM'],
    att: ['LW', 'ST', 'RW'],
}

//validation
const validators = {
    name: /^[A-Za-z ]{3,}$/,
    url: /\.(png|jpg|jpeg|webp|gif)$/,
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

const validation = (data) => {
    if(!validators.name.test(data.name.value.trim())){
        //validation error style
        manageValidationErrors(data.name, 'Please Enter a valid name !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.name, '')
    }

    const exists = players.find(item => item.name.toLowerCase() == data.name.value.toLowerCase().trim())
    if(exists){
        //validation error style
        manageValidationErrors(data.name, 'This player already exists !')
        return false
    }else{
        manageValidationErrors(data.name, '')
    }

    if(data.position.value.trim() == ""){
        //validation error style
        manageValidationErrors(data.position, 'Please Enter a valid position !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.position, '')
    }

    if(!validators.url.test(data.image.value.trim())){
        //validation error style
        manageValidationErrors(data.image, 'Please Enter a valid image !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.image, '')
    }

    if(!validators.name.test(data.nationality.value.trim())){
        //validation error style
        manageValidationErrors(data.nationality, 'Please Enter a valid nationality !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.nationality, '')
    }

    if(!validators.url.test(data.flag.value.trim())){
        //validation error style
        manageValidationErrors(data.flag, 'Please Enter a valid flag !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.flag, '')
    }

    if(!validators.name.test(data.club.value.trim())){
        //validation error style
        manageValidationErrors(data.club, 'Please Enter a valid club !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.club, '')
    }

    if(!validators.url.test(data.logo.value.trim())){
        //validation error style
        manageValidationErrors(data.logo, 'Please Enter a valid logo !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.logo, '')
    }

    if(!validators.stats.test(data.rating.value)){
        //validation error style
        manageValidationErrors(data.rating, 'Please Enter a valid rating !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.rating, '')
    }

    if(!validators.stats.test(data.pace.value)){
        //validation error style
        manageValidationErrors(data.pace, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.pace, '')
    }

    if(!validators.stats.test(data.shooting.value)){
        //validation error style
        manageValidationErrors(data.shooting, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.shooting, '')
    }

    if(!validators.stats.test(data.passing.value)){
        //validation error style
        manageValidationErrors(data.passing, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.passing, '')
    }

    if(!validators.stats.test(data.dribbling.value)){
        //validation error style
        manageValidationErrors(data.dribbling, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.dribbling, '')
    }

    if(!validators.stats.test(data.defending.value)){
        //validation error style
        manageValidationErrors(data.defending, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.defending, '')
    }

    if(!validators.stats.test(data.physical.value)){
        //validation error style
        manageValidationErrors(data.physical, 'Statistics should be numbers !')
        return false
    }else{
        //clear validation error style
        manageValidationErrors(data.physical, '')
    }

    return true
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
const clearInputs = (inputs) => {
    inputs.forEach(input => input.value = "")
}

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

    if(validation({ name, position, image, nationality, flag, club, logo, rating, pace, shooting, passing, dribbling, defending, physical })){
        const data = {
            name : name.value.trim(),
            position : position.value,
            image : image.value.trim(),
            nationality : nationality.value.trim(),
            flag : flag.value.trim(),
            club : club.value.trim(),
            logo : logo.value.trim(),
            rating : rating.value,
        }
    
        if(position == 'GK'){
            data['diving'] = pace.value,
            data['handling'] = shooting.value,
            data['kicking'] = passing.value,
            data['reflexes'] = dribbling.value,
            data['speed'] = defending.value,
            data['positioning'] = physical.value
        }else{
            data['pace'] = pace.value,
            data['shooting'] = shooting.value,
            data['passing'] = passing.value,
            data['dribbling'] = dribbling.value,
            data['defending'] = defending.value,
            data['physical'] = physical.value
        }
    
        players.push(data)
        localStorage.setItem('players', JSON.stringify(players))
        clearInputs([ name, position, image, nationality, flag, club, logo, rating, pace, shooting, passing, dribbling, defending, physical])
        hideModal(createModal)
    }
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

//display players in pick players modal

const getPlayerStatisticsHTML = (item) => {
    if(item.position == 'GK'){
        return `
            <div class="*:block *:font-semibold">
                <span>Div</span>
                <span>${item.diving}</span>
            </div>
            <div class="*:block *:font-semibold">
                <span>Han</span>
                <span>${item.handling}</span>
            </div>
            <div class="*:block *:font-semibold">
                <span>Kic</span>
                <span>${item.kicking}</span>
            </div>
            <div class="*:block *:font-semibold">
                <span>Ref</span>
                <span>${item.reflexes}</span>
            </div>
            <div class="*:block *:font-semibold">
                <span>Spd</span>
                <span>${item.speed}</span>
            </div>
            <div class="*:block *:font-semibold">
                <span>Pos</span>
                <span>${item.positioning}</span>
            </div>
        `
    }

    return `
        <div class="*:block *:font-semibold">
            <span>Pac</span>
            <span>${item.pace}</span>
        </div>
        <div class="*:block *:font-semibold">
            <span>Sho</span>
            <span>${item.shooting}</span>
        </div>
        <div class="*:block *:font-semibold">
            <span>Pas</span>
            <span>${item.passing}</span>
        </div>
        <div class="*:block *:font-semibold">
            <span>Dri</span>
            <span>${item.dribbling}</span>
        </div>
        <div class="*:block *:font-semibold">
            <span>Def</span>
            <span>${item.defending}</span>
        </div>
        <div class="*:block *:font-semibold">
            <span>Phy</span>
            <span>${item.physical}</span>
        </div>
    `
}

const displayPlayersPickModal = () => {
    const container = document.getElementById('pickPlayersList')
    const filtered = [...players]
    container.innerHTML = ''

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="w-[160px] relative cursor-pointer">
                <div class="relative w-[90%]">
                    <img class="w-full mx-auto" src="./assets/rush.png" alt="">
                    <div class="absolute top-0 left-0 w-full h-full inset-0 m-auto px-2 py-2">
                        <div class="flex">
                            <div class="mt-4 ml-[11px] text-white *:font-poppins *:block text-[80%]">
                                <span class="font-bold">${item.rating}</span>
                                <span class="font-semibold mt-[-8px]">${item.position}</span>
                            </div>
                            <img class="w-[70%] h-[70%] object-cover" src="${item.image}" alt="">
                        </div>
                        <div class="text-white">
                            <h1 class="text-center text-xs font-semibold mt-1">Messi</h1>
                            <div class="flex justify-around text-[6%] mt-1">
                                ${getPlayerStatisticsHTML(item)}
                            </div>
                            <div class="flex w-fit mx-auto *:w-[18px] *:h-[10px] mt-1">
                                <img src="${item.flag}" alt="">
                                <img src="${item.logo}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

displayPlayersPickModal()