import jwt from "jsonwebtoken";

const authorizeAdmin = (req, res, next) => {
  const header = req?.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Error" });
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.status(401).json(err);
    }
    if (user.role === "admin") {
      req.user = user;
      next();
    } else {
      return res.status(403).json({
        message: "Không có quyền thực hiện",
      });
    }
  });
};

export default authorizeAdmin;
