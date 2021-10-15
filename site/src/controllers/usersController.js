const usuarios = require('../data/users.json')
const controller = {
    cart: (req, res)=> {
        res.render('users/cart')
    },
    register: (req, res)=> {
        res.render('users/register')
    },
    login: (req, res)=> {
        res.render('users/login')
    },
    userProfile: (req, res)=> {
        const {id} = req.params;
        const usuario = usuarios.find(usuario=>usuario.id === parseInt(id) )
        res.render('users/userProfile', {usuario} )
    }
}

module.exports = controller;