//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

/* Configurações da Aplicação */
const Paciente = require('./models/Paciente')

//Configuração do Handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

//Configurando o bodyParser
app.use(bodyParser.urlencoded({extended: false}))

/* Configurações de Rotas */

//Página Principal - Pacientes
app.get('/', (req, res) => {
    res.render('index', {NavActivePac: true})
})

//Página de Relatórios
app.get('/relatorios', (req, res) => {
    res.render('relatorios', {NavActiveRel: true})
})


//Página de Cadastros
app.get('/cadastros', (req, res) => {
    res.render('cadastros', {NavActiveCad: true})
})


/* Inicialização do Servidor */
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!')
})