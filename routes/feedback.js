var router = require('express').Router();
var feedbackController = require('../controllers/feedbackController');

router.post('/create',feedbackController.create_feedback);
router.post('/',feedbackController.get_all_by_lecture);
router.delete('/delete',feedbackController.remove_feedback);

module.exports = router;