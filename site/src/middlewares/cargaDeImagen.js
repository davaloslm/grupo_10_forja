const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/users')
    },
    filename: function (req, file, callback) {
        callback(null, `img-${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: storage })

module.exports = upload;