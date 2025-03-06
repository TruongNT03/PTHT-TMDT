import AddressSchema from "../dtos/Address";
import db from "../models/index";

const newAddress = async (req, res) => {
  const { error } = AddressSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  const user = await db.users.findOne({
    where: {
      id: req.user.id,
      email: req.user.email,
    },
  });
  const newAddress = await db.address.create({
    ...req.body,
    userId: user.id,
  });
  return res.status(200).json({
    message: "Thêm mới địa chỉ thành công",
  });
};

const getAddress = async (req, res) => {
  const user = await db.users.findOne({
    where: {
      id: req.user.id,
      email: req.user.email,
    },
  });
  const addresses = await db.address.findAll({
    where: {
      userId: user.id,
    },
  });
  const resAddresses = addresses.map(({ dataValues }) => ({
    id: dataValues.id,
    name: dataValues.name,
    phone: dataValues.phone,
    address: dataValues.address,
    isDefault: dataValues.isDefault,
  }));
  res.status(200).json({
    message: "Thành công",
    data: resAddresses,
  });
};

export { newAddress, getAddress };
