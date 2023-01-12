const express = require('express')
const app = express()
const port = 7500
app.use(express.json())


let games = []


function getId(){
    if(games.length === 0){
        return 1
    }else{
        return games[games.length - 1].id + 1
    }
}


function validateGamePayload(payload){

    if(!payload.name){
        throw new Error("name is required")
    }

    if(!payload.company){
        throw new Error("company is required")
    }

    if(!payload.releaseDate){
        throw new Error("company is required")
    }

    return true
}


function findGameById(id){

    let game = games.find(g => g.id == id)

    if(!game){
        throw new Error("Game with id " + id + " not found")
    }

    return game
}


function deleteGame(id){
    let index = findGameIndexById(id)
    games.splice(index,1)
    return true
}

function findGameIndexById(id){

    let index = games.findIndex(g => g.id == id)

    if(index === -1){
        throw new Error("Game with id " + id + " not found")
    }

    return index
}


function updateGame(id, payload){

    validateGamePayload(payload)

    let game = findGameById(id)

    game = {...game, ...payload}

    let index = findGameIndexById(id)

    games[index] = game

    return game
}

function createGame(payload){


    validateGamePayload(payload)

    let game = payload

    game.id = getId()
    games.push(game)
    return game;
}


//CREATE GAME
app.post('/api/games', (req, res) => {

    try{
        let payload = req.body
        let game = createGame(payload)
        res.json(game)
    }catch (e) {
        res.statusCode = 400
        res.json({error: e.message})
    }

})


//UPDATE GAME
app.put('/api/games/:id', (req, res) => {

    try{
        let gameId = req.params.id
        let payload = req.body
        let game = updateGame(gameId, payload)
        res.json(game)
    }catch (e) {
        res.statusCode = 400
        res.json({error: e.message})
    }

})

//GET GAMES
app.get('/api/games', (req, res) => {
    res.json(games)
})


//GET GAME BY ID
app.get('/api/games/:id', (req, res) => {
    let gameId = req.params.id
    let game = findGameById(gameId)
    res.json(game)
})


//DELETE GAME BY ID
app.delete('/api/games/:id', (req, res) => {
    let gameId = req.params.id
    deleteGame(gameId)
    res.json()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
