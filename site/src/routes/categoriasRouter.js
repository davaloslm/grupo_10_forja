const express = require("express");
const router = express.Router();
const { boxeo, entrenamiento, jiujitsu, judo, kickboxing, taekwondo } = require('../controllers/categoriasController.js')

router.get('/boxeo', boxeo);
router.get('/entrenamiento', entrenamiento);
router.get('/jiujitsu', jiujitsu);
router.get('/judo', judo);
router.get('/kickboxing', kickboxing);
router.get('/taekwondo', taekwondo);



module.exports = router;