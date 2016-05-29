var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render("registration");
});

router.get('/chat', function(req, res, next){
	res.redirect("/");
})

router.get('/profile', function(req, res, next) {
    console.log(req.app.locals.users);
    res.render("profile", {username: req.app.locals.users});
});

router.get("/history", function(req, res, next) {
    res.render("history")
});

router.get("/group-chat", function(req, res, next) {
    res.render("group_chat")
});

router.post('/chat', function(req, res, next) {
	if (!(req.body.username && req.body.password)) {
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
