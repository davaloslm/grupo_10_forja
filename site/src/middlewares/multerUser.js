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

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "Solo se permiten los archivos con las extensiones: .JPG, .PNG, .GIF, .JPEG y .WEBP";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}


const upload = multer({ storage: storage, fileFilter})

module.exports = upload;