import { User } from "../../models/user.js";

async function isAdmin(req, res, next) {
  const user = await User.findById(res.locals.claims.userId);

  if (!user.role) {
    return res.status(403).json({
      "message": "unauthorized",
    });
  }
  
  next();
}

export {
  isAdmin,
}