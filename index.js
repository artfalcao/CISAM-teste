//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')

/* Configurações da Aplicação */

//Configuração do Handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

/* Configurações de Rotas */
app.get('/', (req, res) => {
    res.render('index', {NavActivePac: true})
})

app.get('/relatorios', (req, res) => {
    res.render('relatorios', {NavActiveRel: true})
})

app.get('/cadastros', (req, res) => {
    res.render('cadastros', {NavActiveCad: true})
})


/* Inicialização do Servidor */
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!')
})