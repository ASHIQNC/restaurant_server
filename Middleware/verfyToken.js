const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("gg", req.user);
  //namukk headersil authorisation sectionil check chyunnu
  if (!req.headers.authorization)
    return res.status(403).json({ msg: "not authorised no token" });

  //startsWith is a js function which checks with its starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //split give us back an array.ie the "bearer first and token" so in order to get second elemnt from an array we
    //are giving first index[1]
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ msg: "wrong token or expired" });
      else {
        req.user = data;
        next();
      }
    }); //true/false aanu veraa
  }
};

const verifyadminToken = (req, res, next) => {
  console.log("gg", req.user);
  //namukk headersil authorisation sectionil check chyunnu
  if (!req.headers.authorization)
    return res.status(403).json({ msg: "not authorised no token" });

  //startsWith is a js function which checks with its starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //split give us back an array.ie the "bearer first and token" so in order to get second elemnt from an array we
    //are giving first index[1]
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ msg: "wrong token or expired" });
      else {
        //data={id:user._id,isAdmin:user.isAdmin}
        if (!data.isAdmin)
          return res.status(404).json({ msg: "you are not admin" });
        req.user = data;
        next();
      }
    }); //true/false aanu veraa
  }
};
module.exports = { verifyToken, verifyadminToken };
