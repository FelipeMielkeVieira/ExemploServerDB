const express = require('express');
const cors = require('cors');
const server = express();

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('almoxarifado', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Deu Certo!");
}).catch(err => {
    console.log("Erro: " + err);
})

const User = sequelize.define('users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        createdAt: false,
        updatedAt: false
    }
);

server.use(cors());
server.use(express.json());

server.post('/user', (req, res) => {
    const { firstName, age } = req.body;

    User.create({ firstName, age }).then(() => {
        res.json({ message: "Sucess" });
    }).catch(err => {
        res.json({ error: err });
    })
});

server.listen(3000, async () => {
    await sequelize.sync();
    console.log("Porta 3000");
})