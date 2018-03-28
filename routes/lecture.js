var router = require('express').Router();
var lectureController = require('../controllers/lectureController');

router.post('/create',lectureController.create_new_lecture);
router.post('/update',lectureController.update_a_lecture);
router.post('/delete',lectureController.remove_lecture);
router.post('/', lectureController.get_all_lectures_from_course);
router.get('/', lectureController.get_all_lectures);



module.exports = router;