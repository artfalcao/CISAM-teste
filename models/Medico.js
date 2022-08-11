const db = require('./db')

const Medico = db.sequelize.define('medico', {
    cpf: {
        type: db.Sequelize.CHAR(14),
        allowNull: false,
        primaryKey: true
    },
    termoLGPD: {
        type: db.Sequelize.CHAR(3),
        allowNull: false
     },
    nome:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    nomeSocial: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    crm:{
        type: db.Sequelize.CHAR(13),
        allowNull: false,
    },
    telefone: {
        type: db.Sequelize.CHAR(11),
        allowNull: false
    }, 
    dataNasc: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    sexo: {
        type: db.Sequelize.CHAR(1),
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
	 cep: {
        type: db.Sequelize.CHAR(9),
        allowNull: false
     },
	 logradouro: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 numero: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 complemento: {
        type: db.Sequelize.STRING,
        allowNull: true
     },
	 bairro: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
     }
}) 

Medico.sync()

module.exports = Medico