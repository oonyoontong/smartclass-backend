var router = require('express').Router();
var questionController = require('../controllers/questionController');

router.post("/delete",questionController.remove_question);
router.post("/update",questionController.update_question);

module.exports = router;