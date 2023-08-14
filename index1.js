const express = require('express')
const port = 3000
const app = express()
app.use(express.json())

app.get('/users', (request, response) =>{ //removemos o :id por causa do body params
    console.log(request.body) //para teste body
    const {name,age} = request.body
    //return response.json({message:"ok"}) //para teste body
    return response.json({name,age})
    //const name = request.query.name //query params
    //const age = request.query.age
    //const {id} = request.params //route params
    //console.log(id)
    //outra forma de declarar const {name, age} = request.query que vamos usar - destructuring assignment
    //return response.json({id})
    //return response.json({name: name, age: age})
    //return response.json({name, age}) outra forma de fazer
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
