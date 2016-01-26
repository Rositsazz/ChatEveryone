var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res, next){
	res.redirect("/");
})

router.post('/chat', function(req, res, next) {
	if (!req.body.username) {
		res.redirect("/");
	} else {
		req.app.locals.users.push(req.body.username);
		res.render('chat', { username: req.body.username });
	}
})

router.post("/checkUsername", function(req, res, next){
	if (req.app.locals.users.filter(function(x){ return x == req.body.username; }).length > 0) {
		res.send({success:false});
	} else {
		res.send({success:true});
	}
})

module.exports = router;