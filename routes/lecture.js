var router = require('express').Router();
var lectureController = require('../controllers/lectureController');

router.post('/create',lectureController.create_new_lecture);
router.put('/update',lectureController.update_a_lecture);
router.delete('/delete',lectureController.remove_lecture);
router.post('/', lectureController.get_all_lectures_from_course);
router.get('/', lectureController.get_all_lectures);



module.exports = router;