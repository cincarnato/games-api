import express from 'express'
import  cors from 'cors'
import {createGame, updateGame, findGameById, deleteGame, fetchGames, paginateGames} from "./services/GameService.mjs"
const app = express()
const port = process.env.PORT ? process.env.PORT : 7500
app.use(express.json())
app.use(cors())
import mongoose from 'mongoose'


const MONGO_URI = process.env.MONGO_URI ?  process.env.MONGO_URI : 'mongodb://127.0.0.1:27017/games'
mongoose.connect(MONGO_URI);

//CREATE GAME
app.post('/api/games', async (req, res) => {

    try{
        let payload = req.body
        let game = await createGame(payload)
        res.json(game)
    }catch (e) {
        res.statusCode = 400
        res.json({error: e.message})
    }

})


//UPDATE GAME
app.put('/api/games/:id', async (req, res) => {

    try{
        let gameId = req.params.id
        let payload = req.body
        let game = await updateGame(gameId, payload)
        res.json(game)
    }catch (e) {
        res.statusCode = 400
        res.json({error: e.message})
    }

})

//GET GAMES
app.get('/api/games', async (req, res) => {

    let page = req.query.page
    let games
    if(page){
        let limit = req.query.limit ? req.query.limit : 10

        games = await paginateGames(page, limit)
    }else{
        games = await fetchGames()
    }

    res.json(games)
})


//GET GAME BY ID
app.get('/api/games/:id', async (req, res) => {
    let gameId = req.params.id
    let game = await findGameById(gameId)
    res.json(game)
})


//DELETE GAME BY ID
app.delete('/api/games/:id', async (req, res) => {
    let gameId = req.params.id
    await deleteGame(gameId)
    res.json()
})


//DELETE GAME BY ID
app.get('/', async (req, res) => {

    let content = "<h1>GAMES API</h1>"

    content += "<h3>ENDPOINTS</h3>"

    content += "<ul>"
    content += "<li>GET /api/games <span style='color:grey'>(all)</span></li>"
    content += "<li>GET /api/games/:id <span style='color:grey'>(one)</span></li>"
    content += "<li>GET /api/games?page=1&limit=10 <span style='color:grey'>(paginated)</span></li>"
    content += "<li>POST /api/games <span style='color:grey'>(create)</span></li>"
    content += "<li>PUT /api/games/:id <span style='color:grey'>(update)</span></li>"
    content += "<li>DELETE /api/games/:id <span style='color:grey'>(delete)</span></li>"
    content += "</ul>"
    content += "<br>"
    content += "<h3>JSON EXAMPLE:</h3>"
    content += "<pre>{\n" +
        "  \"name\": \"GAME NAME\",\n" +
        "  \"company\": \"COMPANY NAME\",\n" +
        "  \"releaseDate\": \"2022-02-25\",\n" +
        "  \"price\": 1000,\n" +
        "  \"coverImage\": \"https://domain.com/game.png\",\n" +
        "  \"description\": \"The description\"\n" +
        "\n" +
        "}</pre>"

    res.send(content)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
