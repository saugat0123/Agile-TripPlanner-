const jwt = require("jsonwebtoken");
const User = require("../modules/customer_Registration");

//guard for
module.exports.verifyUser = function (req, res, next) {
    try{
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token,'mysecretkey');
        
        User.findOne({_id:data.id})
        .then(function(result){
            // console.log(result)
            req.user=result;
            next();
        })
        .catch(function(e){
            res.status(401).json({error:e})
        })
    
    }
    catch(e){
        res.status(401).json({error:e})
    }
};

//antother user

module.exports.verifyAdmin = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ mesasge: "UnAuthorized User" });
  } else if (req.user.UserType !== "Admin") {
    return res.status(401).json({ mesasge: "UnAuthorized Permission" });
  }
  next();
};

//verify employee

module.exports.verifyEmployee = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ mesasge: "UnAuthorized User" });
  } else if (req.user.UserType !== "Employee") {
    return res.status(401).json({ mesasge: "UnAuthorized Permission" });
  }
  next();
};

//for norrmal user

// module.exports.verifyAdmin = function(req,res,next){

//     if(!req.user)
//     {

//         return res.status(401).json({mesasge:"UnAuthorized User"})
//     }
//     else if(req.user.UserType!=="Customer"){
//         return res.status(401).json({mesasge:"UnAuthorized Permission"})

//     }
//     next()

//     }
