var express = require('express');
var router = express.Router();
var menus = require("../data/menu.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  var menu = {checked : "Overview" , menus : menus};
  console.log(menu)
  res.render('index', { title: 'Express' ,menu:menu});
});
router.get('/w2w', function(req, res, next) {
  var menu = {checked : "w2w" , menus : menus};
  res.render('w2w', { title: 'W2W' ,menu:menu});
});
module.exports = router;
