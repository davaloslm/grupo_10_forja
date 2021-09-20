const controller = {
    boxeo: (req, res)=> {
        res.render('products/boxeo')
    },
    entrenamiento: (req, res)=> {
        res.render('products/entrenamiento')
    },
    jiujitsu: (req, res)=> {
        res.render('products/jiuJitsu')
    },
    judo: (req, res)=> {
        res.render('products/judo')
    },
    kickboxing: (req, res)=> {
        res.render('products/kickBoxing')
    },
    taekwondo: (req, res)=> {
        res.render('products/taeKwonDo')
    }
}

module.exports = controller;
