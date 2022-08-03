const db = require('./db')

const Paciente = db.sequelize.define('paciente', {
    cpf: {
        type: db.Sequelize.CHAR(14),
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    prontuario:{
        type: db.Sequelize.CHAR(11),
        allowNull: false
    }
}) 

Paciente.sync()

module.exports = Paciente