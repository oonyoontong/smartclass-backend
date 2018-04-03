var router = require('express').Router();
var liveController = require('../controllers/liveController');

router.post('/',liveController.get_all_by_lecture);
router.post('/upvote',liveController.upvote_live);

module.exports = router;