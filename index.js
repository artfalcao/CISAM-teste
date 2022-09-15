//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
require("dotenv").config();


/* Configurações da Aplicação */

const Paciente = require('./models/Paciente')
const Usuario = require('./models/Usuario')
const Especialidade_Medica = require('./models/Especialidade_Medica')
const Tipo_Atendimento = require('./models/Tipo_Atendimento')
const Consulta = require('./models/Consulta')
const { Router } = require('express')

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
            email: dados.email,
            cep: dados.cep,
            rua: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            bairro: dados.bairro,
            complemento: dados.complemento,
            uf: dados.uf,
            numeroSUS: dados.numeroSUS
        })
    }).catch((err) => {
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar esse registro!'})
    })  
})
/*
app.post('/update', (req, res) => {
    //Valores vindos do formulário
    let nome = req.body.nome
    let email = req.body.email
    let prontuario = req.body.prontuario
    let nomeMae = req.body.nomeMae
    let cpf = req.body.cpf
    let dataNasc = req.body.dataNasc
    let sexo = req.body.sexo
    let tel = req.body.telefone
    let cep = req.body.cep
    let rua = req.body.logradouro
    let numero = req.body.numero
    let cidade = req.body.cidade
    let bairro = req.body.bairro
    let complemento = req.body.complemento
    let uf = req.body.uf
    let numeroSUS = req.body.numeroSUS

    Paciente.update({
        nome: nome,
        email: email,
        prontuario: prontuario,
        nomeMae: nomeMae,
        cpf : cpf,
        dataNasc : dataNasc,
        sexo: sexo,
        tel : tel,
        cep : cep,
        rua : rua,
        numero : numero,
        cidade : cidade,
        bairro : bairro,
        complemento : complemento,
        uf : uf,
        numeroSUS : numeroSUS
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
})*/

app.post('/marcar-consulta', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('marcar-consulta', 
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
            email: dados.email,
            cep: dados.cep,
            rua: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            bairro: dados.bairro,
            complemento: dados.complemento,
            uf: dados.uf,
            numeroSUS: dados.numeroSUS
        })
    }).catch((err) => {
        console.log(err)
        return res.render('marcar-consulta', {error: true, problema: 'Não é possível marcar consulta.'})
    })  
})

app.post('/consulta',(req,res)=>{
    //VALORES VINDOS DO FORMULARIO
    let cpf = req.body.cpf;
    let nome = Usuario.findByPk(cpf).nome;
    // Usuario.findByPk(id).then((dados)=>{
    //     nome = dados.nome
    // })
    let dia = req.body.dia;
    let mes = req.body.mes;
    let ano = req.body.ano;
    let hora = req.body.hora;
    let minuto = req.body.minuto;
    let dataSolicitacao = new Date();
    // let dataConsulta = dia + '/' + mes + '/' + ano + ' ' + hora
    let dataConsulta = new Date(ano, mes, dia, hora, minuto);
    let queixaPaciente = req.body.queixaPaciente;
    
        Consulta.create({
            dataSolicitacao: dataSolicitacao,
            dataConsulta:dataConsulta,
            queixaPaciente:queixaPaciente
        }).then(function(){
            console.log('Cadastrado com sucesso!');
            return res.redirect('/users');
        }).catch(function(erro){
            console.log(`Ops, houve um erro: ${erro}`);
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

//Página de Cadastros
app.get('/login', (req,res) => {
    res.render('login', {NavActiveCad: true})
})


/* Inicialização do Servidor */
const PORT = process.env.NODE_LOCAL_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}!`)
})

