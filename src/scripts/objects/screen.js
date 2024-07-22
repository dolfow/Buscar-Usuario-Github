const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                   <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                     <div class="data">
                           <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                            <p>Seguidores: ${user.followers}</p>
                            <p>Seguindo: ${user.following}</p>
                        </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
            <ul>
                                                                            <li>🍴${repo.forks_count}</li>
                                                                            <li>⭐${repo.stargazers_count}</li>
                                                                            <li>👀${repo.watchers_count}</li>
                                                                            <li>💻${repo.language}</li>
                                                                        </ul>
            
            </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItems = ''
        user.events.forEach(event => {
            let type = event.type;
            let commits = event.payload.commits;

            if (type === "PushEvent") {
                eventsItems += `<li>
                                    <p>${event.repo.name}</p>
                                    <p>- ${commits[0].message}</p>
                                </li>`
            } else {
                eventsItems += `<li>
                                    <p>${event.repo.name}</p>
                                    <span>- Evento de criação sem mensagem</span>
                                </li>`;
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>  
                                            </div>`;
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }