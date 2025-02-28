import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserSchema from "../dtos/User.js";
import { users } from "../models/users.js";

const saltRounds = 10;

const register = async (req, res) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      errors: error,
    });
  }
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = await users.create({
    ...req.body,
    password: password,
    role: "user",
  });
  res.status(200).json({
    message: "Đăng ký thành công!",
    data: {
      fullname: newUser.fullname,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    },
  });
};

const login = async (req, res) => {
  const user = await users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(401).json({
        message: "Tài khoản mật khẩu không chính xác.",
      });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({
      message: "Đăng nhập thành công.",
      token: token,
    });
  }
};

export { register, login };
