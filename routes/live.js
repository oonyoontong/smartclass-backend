var router = require('express').Router();
var liveController = require('../controllers/liveController');

router.post('/',liveController.get_all_by_lecture);
router.post('/upvote',liveController.upvote_live);
router.post('/delete',liveController.remove_live);
router.post('/answer',liveController.answer_live);
module.exports = router;