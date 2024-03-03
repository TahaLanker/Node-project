const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepo");

async function tokenAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) res.status(401).send("Unauthorized");
    else {
      const tokenStr = authHeader.split(" "); //  Bearer skdfsdjkfhsdkj
      const token = tokenStr[1];
      const decodedToken = jwt.verify(token, "secret"); //same secret string as at the time of generation
      const roleId = decodedToken.roleId;
      const role = await userRepo.getRole(roleId);
      req.role = role || {};
      const userId = decodedToken.id;
      req.userId = userId;
      next();
    }
  } catch (err) {
    res.status(401).send("Not Authorized");
  }
}

module.exports = {
  tokenAuth,
};
