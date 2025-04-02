import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserSchema from "../dtos/User.js";
import db from "../models/index.js";

const saltRounds = 10;

const register = async (req, res) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return res.status(401).json({
      errors: error,
    });
  }
  const user = await db.users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user && user.type === "LOCAL") {
    return res.status(401).json({ message: "Email đã tồn tại." });
  }
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = await db.users.create({
    ...req.body,
    password: password,
  });
  res.status(201).json({
    message: "Đăng ký thành công!",
    data: {
      fullname: newUser.fullname,
      email: newUser.email,
      username: newUser.username,
    },
  });
};

const login = async (req, res) => {
  const user = await db.users.findOne({
    where: {
      email: req.body.email,
      type: "LOCAL",
    },
  });
  if (user) {
    const comparePass = bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(401).json({
        message: "Tài khoản mật khẩu không chính xác.",
      });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, type: user.type },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({
      message: "Đăng nhập thành công.",
      token: token,
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        avatar: user.vavatar,
        address: user.address,
      },
    });
  }
};

const getUserData = async (req, res) => {
  const user = await db.users.findByPk(req.user.id);

  return res.status(200).json({
    message: "Successfully",
    data: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

const changePassword = async (req, res) => {
  const { id, email } = req.user;
  const user = await db.users.findOne({
    where: {
      id: id,
      email: email,
    },
  });
  if (user) {
    const newPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
    await user.update({
      password: newPassword,
    });
    await user.save();
  }
  res.status(200).json({
    message: "Đổi mật khẩu thành công",
  });
};

const google = async (req, res) => {};

export { register, login, getUserData, changePassword };
