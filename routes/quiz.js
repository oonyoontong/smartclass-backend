var router = require('express').Router();
var quizController = require('../controllers/quizController');

router.post("/create",quizController.create_new_quiz);
router.get("/",quizController.get_all_quiz);
router.delete("/delete",quizController.remove_quiz);
router.put("/update",quizController.update_quiz);

module.exports = router;