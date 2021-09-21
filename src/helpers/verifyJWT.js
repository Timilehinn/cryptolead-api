const JWT = require('jsonwebtoken')

const verify_for_access = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token || token == 'null') {
      res.status(401).json({msg:'No Token Found',done:true,success:false,authenticated:false})
    }else{
      JWT.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err) {
          res.status(401).json({msg:'Authentication Failed',done:true,success:false,authenticated:false})
        }else{
          req.userId = decoded.id;
          req.userEmail = decoded.email;
          next();
        }
      })
    }
  }


  const verify_for_login = (req, res, next)=>{
    const { token } = req.query;
    // console.log(req.headers)
    if(!token || token == 'null') {
      res.json({msg: 'No token found', authenticated: false})
    }else{
      JWT.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) {
          res.json({msg: 'Authentiation failed for user login', authenticated: false})
        }else{
          res.userId = decoded.id;
          next();
        }
      })
    }
  }


module.exports = { verify_for_access, verify_for_login }