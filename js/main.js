const createModal = document.getElementById('create-modal')
const createOpenBtn = document.getElementById('create-player')

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