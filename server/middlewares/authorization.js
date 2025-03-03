import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Error" });
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.status(401).json(err);
    }
    req.user = user;
    next();
  });
};

export default authorization;
