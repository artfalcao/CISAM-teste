//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')



/* Configurações da Aplicação */
const Paciente = require('./models/Paciente')
const Usuario = require('./models/Usuario')

//Configuração do Handlebars

app.engine('hbs', hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main',
    
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

//Configurando o bodyParser
app.use(bodyParser.urlencoded({extended: false}))

/* Configurações de Rotas */

//Página Principal - Pacientes
app.get('/', (req, res) => {
    Paciente.findAll().then((valores) => {
        if (valores.length > 0) {
            res.render('index', {NavActivePac:true, table: true, pacientes: valores.map(valores => valores.toJSON()) } )
        } else {
            res.render('index', {NavActivePac:true, table: false} )
        }
        
    }).catch((err) => {
        console.log(`Houve um problema: ${err}`)
    })
})

app.get('/editar', (req, res) => {
    res.render('editar')
})

app.post('/editar', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('editar', {error: false, NavActivePac:true, NavActiveDadosCad: true, prontuario: dados.prontuario, nome: dados.nome, cpf: dados.cpf})
    }).catch((err) => {
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar esse registro!'})
    })  
})

app.post('/paciente-resumo', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('paciente-resumo', {error: false, NavActivePac:true, NavActiveResumo: true, prontuario: dados.prontuario, nome: dados.nome, cpf: dados.cpf})
    }).catch((err) => {
        console.log(err)
        return res.render('paciente-resumo', {error: true, problema: 'Não é possível acessar esse registro!'})
    })
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

