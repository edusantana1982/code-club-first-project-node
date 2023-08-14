const express = require('express')
const uuid = require('uuid') // para poder usar a biblioteca uuid, ai precisamos chamar uma função dentro dessa biblioteca para que ela chame o id assim ela vai gerar um id unico

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => { //A diferença de rota e middleware é o next
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({error: "User not found"})
    }
    request.userIndex = index
    request.userId = id

    next()
}



app.get('/users', (request, response) => {
    

    
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    
    //console.log(uuid.v4()) //antes para ver como o uuid funciona, criou um id unico universal
    const user = {id:uuid.v4(), name, age} // para criar o usuario, o name e age vinra pelo body
    
    users.push(user)//para adicionar informação no array.

    return response.status(201).json(user)
})
app.put('/users/:id', checkUserId, (request, response) => {//podemos chamar diretamente nosso midleware
    //const { id } = request.params // aqui estamos pegando o nosso id
    const index = request.userIndex
    const { name, age } = request.body //estas informações estão vindo pelo body
    const id = request.userId

    const updateUser = { id, name, age } // aqui estamos montando a nosso usuário atualizado
    
    /*const index = users.findIndex(user => user.id === id) // ele vai iterar item por item de nosso array e vai comparar com o da variavel id que colocamos no brouser do insomnia.
    console.log(index) 
    if (index < 0) {
        return response.status(404).json({message: "User not found"}) // aqui ele vai mandar uma mensagem e no codigo da resposta vai aparecer 404 caso nao localize o usuario.
    }*/

    users[index] = updateUser
    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    //const {id} = request.params
    const index = request.userIndex
    //const index = users.findIndex(user => user.id === id)
    /*if (index < 0){ //caso não encontre o usuário
        return response.status(404).json({message: "User not found"})
    }*/
    users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`Server start on port ${port}`) //rota que mostra todos os nossos usuários.
})