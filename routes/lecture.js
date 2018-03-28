var router = require('express').Router();
var lectureController = require('../controllers/lectureController');

router.post('/create',lectureController.create_new_lecture);
router.post('/update',lectureController.update_a_lecture);
//router.post('/delete',lectureController.remove_course);
router.post('/', lectureController.read_a_lecture);



module.exports = router;