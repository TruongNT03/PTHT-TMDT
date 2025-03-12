import db from "../models/index";
import * as CategorySchema from "../dtos/Category";

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { error } = CategorySchema.insert.validate({ name: name });
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const category = await db.categories.create({
    name,
  });
  return res.status(201).json({
    message: "Thêm mới category thành công",
    data: {
      id: category.id,
      name: category.name,
    },
  });
};

const updateCategory = async (req, res) => {
  const { id, name } = req.body;
  const { error } = CategorySchema.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const category = await db.categories.findByPk(id);
  if (!category) {
    return res
      .status(400)
      .json({ message: "Không tìm thấy category tương ứng" });
  }
  await category.update({ name: name });
  return res.status(200).json({
    message: "Cập nhập thông tin category thành công",
    data: {
      id: category.id,
      name: category.name,
    },
  });
};

const getCategory = async (req, res) => {
  const categories = await db.categories.findAll({
    attributes: ["id", "name"],
  });
  return res.status(200).json({
    message: "Thành công",
    data: categories,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  const { error } = CategorySchema.del.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validate Error",
      errors: error,
    });
  }
  const category = await db.categories.findByPk(id);
  if (!category) {
    return res.status(400).json({
      message: "Category không tồn tại",
    });
  }
  await category.destroy();
  return res.status(200).json({
    message: "Xóa category thành công",
  });
};

export { insertCategory, updateCategory, getCategory, deleteCategory };
