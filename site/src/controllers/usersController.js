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
}

module.exports = controller;