const Sequelize = require('sequelize')
//const { applyExtraSetup } = require('./extra-setup')

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local DB.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize('cisam', 'root', 'root', {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})
/*
const modelDefiners = [
	require('./Paciente'),
	require('./Usuario'),
	require('./Especialidade_Medica'),
    require('./Tipo_Atendimento'),
    require('./Consulta')
	// Add more models here...
	// require('./models/item'),
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);
*/

// We export the sequelize connection instance to be used around our app.
module.exports = {Sequelize, sequelize}

/*
sequelize.authenticate().then(function() {
    console.log('Conectado com Sucesso com o BD!')
}).catch(function(err) {
    console.log('Falha ao acessar o BD:'+ err)
})
*/