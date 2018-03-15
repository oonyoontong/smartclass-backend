var express = require('express');
var router = express.Router();
var AccountController = require('../controllers/accountController');


router.post('/login', AccountController.authenticate);

router.post('/create',AccountController.create_new_account);

router.get('/',AccountController.read_a_account);

router.post('/update',AccountController.update_a_account);

router.post('/add_course',AccountController.add_course);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;