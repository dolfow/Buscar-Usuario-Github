import { baseUrl, repositoriesQuantity } from "../variables.js"

async function getEventos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events`)
    const getEvents = await response.json()
    return getEvents.filter(element => element.type === 'CreateEvent' || element.type === 'PushEvent').slice(0, repositoriesQuantity)
}

export { getEventos }