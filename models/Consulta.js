const db = require('./db')

const Consulta = db.sequelize.define('consultas', {
    id_consulta: {
        type: db.Sequelize.INTEGER,
        auto_increment: true,
        allowNull: false,
        primaryKey: true
    },
    dataSolicitacao: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    dataConsulta: {
        type: db.Sequelize.DATE,
        allowNull: false
        // get: function(){
        //     return this.getDataValue('dataConsulta').toLocaleString('en-GB', {timeZone: 'UTC'});
        // }
    },
    queixaPaciente: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
    
})  

Consulta.sync()

module.exports = Consulta 

/*    
    Paciente_cpf: {
        type: db.Sequelize.CHAR(11),
        allowNull: false
    },
    Usuario_cpf: {
        type: db.Sequelize.CHAR(11),
        allowNull: true
    },
    Especialidade_idEspecialidade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    TipoAtendimento_idTipoAtendimento: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }


    foreign key (Paciente_cpf) references paciente (cpf_paciente),
    foreign key (Usuario_cpf) references usuario (cpf_usuario),
    foreign key (Especialidade_idEspecialidade) references especialidadeMedica(id_especialidade),
    foreign key (TipoAtendimento_idTipoAtendimento) references tipoAtendimento(id_atendimento)
    );
*/