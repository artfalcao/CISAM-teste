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

/* Configurações de Rotas */



/* Inicialização do Servidor */
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!')
})