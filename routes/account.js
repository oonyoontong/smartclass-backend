var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController');


router.post('/login', accountController.authenticate);

router.post('/create',accountController.create_new_account);

router.get('/',accountController.read_a_account);

router.delete('/delete', accountController.delete_account);

router.post('/update',accountController.update_a_account);

router.post('/add_course',accountController.add_course);

router.post('/delete_course',accountController.delete_course);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;