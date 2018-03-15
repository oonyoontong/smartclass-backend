var router = require('express').Router();
var courseController = require('../controllers/accountController');

router.post('/create',courseController);
router.post('/id',courseController);


module.exports = router;