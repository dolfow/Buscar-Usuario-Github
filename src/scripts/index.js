import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEventos } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeypressed = key === 13

    if (isEnterKeypressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})


function validateEmptyInput(userName){
    if(userName.length ===0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    const reposiesResponse = await getRepositories(userName)

    const eventos = await getEventos(userName)

  
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
       
    user.setInfo(userResponse)
    user.setRepositories(reposiesResponse)
    user.setEvents(eventos)

    screen.renderUser(user)

 
}



