var router = require('express').Router();
var questionController = require('../controllers/questionController');

router.delete("/delete",questionController.remove_question);
router.put("/update",questionController.update_question);

module.exports = router;