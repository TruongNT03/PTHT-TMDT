import { Op } from "sequelize";
import db from "../models";

const createRoom = async (req, res) => {
  const { user_one, user_two } = req.body;
  const chat_room = await db.chat_rooms.findOrCreate({
    where: {
      user_one: user_one || user_two,
      user_two: user_two || user_one,
    },
    defaults: {
      user_one,
      user_two,
    },
  });
  return res.status(201).json({ msg: "Tạo room thành công!" });
};

const getRoom = async (req, res) => {
  const { user_one, user_two } = req.body;
  const chat_room = await db.chat_rooms.find({
    where: {
      user_one: user_one || user_two,
      user_two: user_two || user_one,
    },
  });
  return res.status(200).json({ chat_room });
};

const getMessageLog = async (req, res) => {
  const { id } = req.user;

  const chat_room = await db.chat_rooms.findAll({
    where: {
      [Op.or]: {
        user_one: id,
        user_two: id,
      },
    },
    attributes: ["id", "user_one", "user_two"],
    include: [
      {
        model: db.chat_messages,
        attributes: ["id", "msg", "from", "to"],
        order: ["createdAt", "ASC"],
      },
      {
        model: db.users,
        attributes: ["id", "firstname", "lastname", "avatar"],
      },
    ],
  });

  return res.status(200).json({ msg: "Thành công!", chat_room: chat_room });
};

export { createRoom, getMessageLog };
