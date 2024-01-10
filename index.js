/*
Terminal
    -Ctrl + C       -para de rodar Insomnia
    -nom rum dev    -play Insomnia
 */

const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())


/*
-query params - meusite.com/user?name=dalio&age=38  -filtro
-route params - /users/2                            -buscar, deletar ou atualizar algo específico 

-get        -consultar informações no back-end
-post       -adicionar informações do back-end
-put|patch  -alterar ou atualizar informações do back-end
-delete     -deleta inormação pelo id no back-end

*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if( index < 0){ // não encontrou -1
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const{ name, age } = request.body
    
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
  
    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})