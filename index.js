const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Games = require('./models/Games')
//const User = require('./models/User')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))


// Rota Principal da página
app.get('/', (req, res) => {
    res.render('home')
})

// Rota para pegar os dados 
app.get('/cadastrar/jogos' ,(req, res) => {
    res.render('cadastrarJogos')
})

// Rota para inserir os dados
app.post('/cadastrar/jogos', async (req, res) => {

    const name = req.body.name
    const year = req.body.year
    const category = req.body.category

    await Games.create({name, year, category})

    console.log(req.body)

    res.redirect('/consultar/jogos')
    
})

app.get('/consultar/jogos', async (req, res) => {
    const games = await Games.findAll({raw: true})
    console.log(games)

    res.render('consultarJogos', { games: games })
})

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => {console.log(err)});