//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')


/* Configurações da Aplicação */

const Paciente = require('./models/Paciente')
const Usuario = require('./models/Usuario')
const Especialidade_Medica = require('./models/Especialidade_Medica')
const Tipo_Atendimento = require('./models/Tipo_Atendimento')
const Consulta = require('./models/Consulta')

Usuario.hasMany(Consulta)
Consulta.belongsTo(Usuario)

Especialidade_Medica.hasMany(Consulta)
Consulta.belongsTo(Especialidade_Medica)

Tipo_Atendimento.hasMany(Consulta)
Consulta.belongsTo(Tipo_Atendimento)


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

//Página do Paciente - Resumo
app.post('/paciente-resumo', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('paciente-resumo', {error: false, NavActivePac:true, NavActiveResumo: true, prontuario: dados.prontuario, nome: dados.nome, cpf: dados.cpf})
    }).catch((err) => {
        console.log(err)
        return res.render('paciente-resumo', {error: true, problema: 'Não é possível acessar esse registro!'})
    })
})

//Página do Paciente - Dados Cadastrais
app.post('/editar', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('editar', 
        {error: false, 
            NavActivePac:true, 
            NavActiveDadosCad: true,
            prontuario: dados.prontuario, 
            nomeMae: dados.nomeMae, 
            nome: dados.nome, 
            cpf: dados.cpf,
            dataNasc: dados.dataNasc,
            sexo: dados.sexo,
            tel: dados.telefone,
            email: dados.email
        })
    }).catch((err) => {
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar esse registro!'})
    })  
})

app.post('/update', (req, res) => {
    //Valores vindos do formulário
    let nome = req.body.nome
    let email = req.body.email

    //Array que vai conter os erros
    const erros = []

    //Validação dos Campos
    
    /* Remover espaços em branco */
    nome = nome.trim()
    email.trim()

    /* Limpar caracteres especiais */
    nome = nome.replace(/[^A-zÀ-ú\s]/gi, '')
    nome = nome.trim()

    /* Verificar se está vazio ou não definido */
    if (nome == '' || typeof nome == undefined || nome == null) {
        erros.push({mensagem: "Campo nome não pode ser vazio!"})
    }

    /* Verificar se campo nome é válido (apenas letras)*/
    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)) {
        erros.push({mensagem:"Nome Inválido!"})
   }
   
   /* Verificar se está vazio ou não definido */
    if (email == '' || typeof email == undefined || email == null) {
        erros.push({mensagem: "Campo email não pode ser vazio!"})
    }

    /* Verificar se campo email é válido*/
    if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)) {
        erros.push({mensagem:"Campo email Inválido!"})
    }

    if(erros.length > 0) {
        return res.status(400).send({status: 400, erro: erros})
    }

    //Sucesso (Nenhum Erro) - Atualizar registro no BD
    Paciente.update({
        nome: nome,
        email: email.toLowerCase()
    },
    {
        where: {
            cpf: req.body.cpf
        }
    }).then((resultado) => {
        console.log(resultado)
        return res.redirect('/index')
    }).catch((err) => {
        console.log(err)
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

