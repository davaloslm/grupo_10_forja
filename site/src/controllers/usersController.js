const controller = {
    cart: (req, res)=> {
        res.render('cart')
    },
    register: (req, res)=> {
        res.render('register')
    },
    login: (req, res)=> {
        res.render('login')
    },
}

module.exports = controller;