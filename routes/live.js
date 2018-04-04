var router = require('express').Router();
var liveController = require('../controllers/liveController');

router.post('/',liveController.get_all_by_lecture);
router.put('/upvote',liveController.upvote_live);
router.delete('/delete',liveController.remove_live);
router.put('/answer',liveController.answer_live);
module.exports = router;