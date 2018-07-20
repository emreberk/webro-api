var co = require('co');

var authorization = (req,res,next) => co.wrap(function* (req, res, next) {
  var accessToken = req.header('accessToken');

  var isAuthorized = true;

  if(!isAuthorized){
    res.status(400).send({exception: 'Unauthorized request'});
    return;
  }

  var user = {};

  req.app.set('user_data', user);
  //Response dönene kadar index.js'de Authorization'dan sonra eklenen route'larda aşağıdaki sorguyla user bilgisi alınabilir.
  //var user = req.app.get('user_data');
  next();

})(req,res,next).catch((ex)=>console.log(ex));


module.exports = authorization;
