const players = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []
let selectedPlayers = []
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
    item.addEventListener('click', (e) => {
        showModal(playersListModal)
        let position = e.currentTarget.getAttribute('post') ? e.currentTarget.getAttribute('post').split('-')[0] : ''
        displayPlayersPickModal(position, e.currentTarget)
    })

    //remove a player from card
    item.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        if(e.currentTarget.id){
            selectedPlayers = selectedPlayers.filter(item => item != e.currentTarget.id)
            if(e.currentTarget.getAttribute('post').includes('change')){
                document.getElementById(e.currentTarget.id).innerHTML = `
                    <img class="mx-auto" src="./assets/rush.webp" alt="" draggable="false">
                    <img class="size-[50px] absolute inset-0 m-auto" src="./assets/plus.svg" alt="" draggable="false">
                `
            }else{
                document.getElementById(e.currentTarget.id).innerHTML = `<img class="w-[90%] mx-auto" src="./assets/rush.webp" alt="">`
            }
            document.getElementById(e.currentTarget.id).removeAttribute('id')
            calculateScore()
        }
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
            id: players.length > 0 ? players[players.length - 1].id : 1,
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

const displayPlayersPickModal = (position = '', target = null) => {
    let filtered = [...players]
    const container = document.getElementById('pickPlayersList')
    if(position != ''){
        if(position == 'att'){
            filtered = filtered.filter(item => positions.att.findIndex(i => i == item.position) != -1)
        }else if(position == 'mid'){
            filtered = filtered.filter(item => positions.mid.findIndex(i => i == item.position) != -1)
        }else if(position == 'def'){
            filtered = filtered.filter(item => positions.def.findIndex(i => i == item.position) != -1)
        }else if(position == 'gk'){
            filtered = filtered.filter(item => item.position == 'GK')
        }
    }

    filtered = filtered.filter(item => selectedPlayers.findIndex(i => i == item.id) == -1)

    container.innerHTML = ''

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="w-[160px] relative cursor-pointer" onclick="addToStadium(${item.id}, '${target.getAttribute('post')}')">
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
                            <h1 class="text-center text-xs font-semibold mt-1">${item.name}</h1>
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

const addToStadium = (item, target) => {
    const player = players.find(i => i.id == item)
    if(target.includes('change')){
        document.querySelector('[post='+target+']').innerHTML = `
        <div class="w-[160px] relative cursor-pointer">
                <div class="relative w-[90%]">
                    <img class="w-full mx-auto" src="./assets/rush.png" alt="">
                    <div class="absolute top-0 left-0 w-full h-full inset-0 m-auto px-2 py-2">
                        <div class="flex">
                            <div class="mt-4 ml-[11px] text-white *:font-poppins *:block text-[80%]">
                                <span class="font-bold">${player.rating}</span>
                                <span class="font-semibold mt-[-8px]">${player.position}</span>
                            </div>
                            <img class="w-[70%] h-[70%] object-cover" src="${player.image}" alt="">
                        </div>
                        <div class="text-white">
                            <h1 class="text-center text-xs font-semibold mt-1">${player.name}</h1>
                            <div class="flex justify-around text-[6%] mt-1">
                                ${getPlayerStatisticsHTML(player)}
                            </div>
                            <div class="flex w-fit mx-auto *:w-[18px] *:h-[10px] mt-1">
                                <img src="${player.flag}" alt="">
                                <img src="${player.logo}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }else{
        const isEmpty = document.querySelector('[post='+target+']').firstElementChild.childElementCount == 0 
        if(!isEmpty){
            selectedPlayers = selectedPlayers.filter(i => i != document.querySelector('[post='+target+']').id)
        }
        
        document.querySelector('[post='+target+']').innerHTML = `
            <div class="relative w-[90%]">
                <img class="w-full mx-auto" src="./assets/rush.png" alt="">
                <div class="absolute top-0 left-0 w-full h-full inset-0 m-auto sm:p-1 md:p-2">
                    <div class="flex">
                        <div class="sm:mt-2 md:mt-4 sm:ml-[4px] md:ml-[11px] text-white *:font-poppins *:block text-[80%]">
                            <span class="font-bold sm:text-[8px] lg:text-base">${player.rating}</span>
                            <span class="font-semibold sm:mt-[-4px] md:mt-[-8px] sm:text-[8px] lg:text-base">${player.position}</span>
                        </div>
                        <img class="size-[70%] object-cover" src="${player.image}" alt="">
                    </div>
                    <div class="text-white">
                        <h1 class="text-center sm:text-[8px] md:text-[10px] font-semibold mt-1 sm:block md:hidden">${player.name.split(' ')[0]}</h1>
                        <h1 class="text-center sm:text-[8px] md:text-[10px] font-semibold mt-1 sm:hidden md:block">${player.name}</h1>
                        <div class="sm:hidden md:flex justify-around text-[6%] mt-1">
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Pac' : 'Div'}</span>
                                <span>${player.position != 'GK' ? player.pace : player.diving}</span>
                            </div>
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Sho' : 'Han'}</span>
                                <span>${player.position != 'GK' ? player.shooting : player.handling}</span>
                            </div>
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Pas' : 'Kic'}</span>
                                <span>${player.position != 'GK' ? player.passing : player.kicking}</span>
                            </div>
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Dri' : 'Ref'}</span>
                                <span>${player.position != 'GK' ? player.dribbling : player.reflexes}</span>
                            </div>
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Def' : 'Spd'}</span>
                                <span>${player.position != 'GK' ? player.defending : player.speed}</span>
                            </div>
                            <div class="*:block *:font-semibold">
                                <span>${player.position != 'GK' ? 'Phy' : 'Pas'}</span>
                                <span>${player.position != 'GK' ? player.physical : player.positioning}</span>
                            </div>
                        </div>
                        <div class="flex w-fit mx-auto mt-1">
                            <img class="sm:w-[14px] sm:h-[6px] md:w-[18px] md:h-[10px]" src="${player.flag}" alt="">
                            <img class="sm:w-[14px] sm:h-[6px] md:w-[18px] md:h-[10px]" src="${player.logo}" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector('[post='+target+']').id = player.id
    if(!selectedPlayers.find(i => i == player.id))
        selectedPlayers.push(player.id)
    hideModal(playersListModal)
    calculateScore()
}

//make a change using drag & drop
let selectedCard = null
document.querySelectorAll('.change-card').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        selectedCard = e.currentTarget
    })
})

document.querySelectorAll('.stadiumcard').forEach(item => {
    item.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    item.addEventListener('drop', (e) => {
        e.preventDefault()
        if(selectedCard && selectedCard.id){
            const position = e.currentTarget.getAttribute('post').split('-')[0]
            const player = players.find(item => item.id == selectedCard.id)
            if(position != 'gk'){
                const result = positions[position].findIndex(item => item == player.position)
                if(result != -1){
                    document.getElementById(selectedCard.id).innerHTML = `
                        <img class="mx-auto" src="./assets/rush.webp" alt="" draggable="false">
                        <img class="size-[50px] absolute inset-0 m-auto" src="./assets/plus.svg" alt="" draggable="false">
                    `
                    addToStadium(selectedCard.id, e.currentTarget.getAttribute('post'))
                }
            }else{
                if(position.toLowerCase() == player.position.toLowerCase()){
                    document.getElementById(selectedCard.id).innerHTML = `
                        <img class="mx-auto" src="./assets/rush.webp" alt="" draggable="false">
                        <img class="size-[50px] absolute inset-0 m-auto" src="./assets/plus.svg" alt="" draggable="false">
                    `
                    addToStadium(selectedCard.id, e.currentTarget.getAttribute('post'))
                }
            }
            
            selectedCard = null
        }
    })
})

//team score
const calculateScore = () => {
    let score = 0
    selectedPlayers.forEach(item => {
        const player = players.find(i => i.id == item)
        if(document.getElementById(item).getAttribute('positions')){
            //add 10 for right position
            const position = document.getElementById(item).getAttribute('positions').split('-').findIndex(i => i.toLowerCase() == player.position.toLowerCase())
            if(position != -1){
                score += 10
            }

            //club
            const checkClub = selectedPlayers.find(i => i != player.id && players.find(x => x.id == i).club.toLowerCase() == player.club.toLowerCase())
            if(checkClub){
                score += 3
            }

            const checkNatio = selectedPlayers.find(i => i != player.id && players.find(x => x.id == i).nationality.toLowerCase() == player.nationality.toLowerCase())
            if(checkNatio){
                score += 1
            }
        }
    })

    document.getElementById('score').textContent = `score : ${score}`
}

function logBrowserClose() {
    let list = []
    document.querySelectorAll('.stadCard').forEach(item => {
        list.push({
            html : item.innerHTML,
            id: item.id || null 
        })
    })
    localStorage.setItem('stadium', JSON.stringify(list))
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers))
}

window.addEventListener('unload', logBrowserClose)
let stadium = localStorage.getItem('stadium') ? JSON.parse(localStorage.getItem('stadium')): []
selectedPlayers = localStorage.getItem('selectedPlayers') ? JSON.parse(localStorage.getItem('selectedPlayers')): []

if(stadium.length > 0){
    stadium.forEach((item, index) => {
        if(item.id)
            document.querySelectorAll('.stadCard')[index].id = item.id
        document.querySelectorAll('.stadCard')[index].innerHTML = item.html  
    })
    calculateScore()
}