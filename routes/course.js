var router = require('express').Router();
var courseController = require('../controllers/courseController');

router.post('/create',courseController.create_new_course);
router.put('/update',courseController.update_a_course);
router.delete('/delete',courseController.remove_course);
router.post('/',courseController.read_a_course);
router.get('/',courseController.list_all_courses);
router.post('/findByName', courseController.find_course_name_like);
//router.post('/id',courseController);


module.exports = router;