import jwt from "jsonwebtoken";

function jwtGuard(req, res, next) {
  const token = req.cookies["jwt"];

  if (!token) {
    return res.status(401).json({
      "message": "invalid token",
    });
  }
  
  if (!process.env.SECRET) {
    return res.status(500).json({
      "message": "Server error: No secret key",
    });
  }
  
  const claims = jwt.verify(token, process.env.SECRET);
  if (!claims) {
    return res.status(401).json({
      "message": "invalid token",
    });
  } 
  res.locals.claims = claims;
  next();
}

export {
  jwtGuard
}