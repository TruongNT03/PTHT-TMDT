import db from "../models/index";
import * as SubCategorySchema from "../dtos/SubCategory";

const insertSubCategory = async (req, res) => {
  const { name, categoryName } = req.body;
  const { error } = SubCategorySchema.insert.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validate Error",
      errors: error,
    });
  }
  const category = await db.categories.findOne({
    where: {
      name: categoryName,
    },
  });
  if (!category) {
    return res
      .status(400)
      .json({ message: "Không tìm thấy category tương ứng" });
  }
  const subCategory = await db.subCategories.findOne({
    where: {
      name: name,
      categoryId: category.id,
    },
  });
  if (subCategory) {
    return res.status(400).json({ message: "SubCategory đã tồn tại" });
  }
  const newSubCategory = await db.subCategories.create({
    name: name,
    categoryId: category.id,
  });
  return res.status(200).json({
    message: "Thêm mới SubCategory thành công",
    data: {
      id: newSubCategory.id,
      name: newSubCategory.name,
      categoryId: newSubCategory.categoryId,
    },
  });
};

const getSubCategory = async (req, res) => {
  const subCategories = await db.subCategories.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: db.categories,
        attributes: ["name"],
      },
    ],
  });
  return res.status(200).json({
    message: "Thành công",
    data: subCategories,
  });
};

const updateSubCategory = async (req, res) => {
  const { id, name, categoryName } = req.body;
  const { error } = SubCategorySchema.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const subCategory = await db.subCategories.findByPk(id);
  if (!categoryName) {
    await subCategory.update({ name });
    return res.status(200).json({
      message: "Cập nhập SubCategory thành công",
      data: {
        id: subCategory.id,
        name: subCategory.name,
      },
    });
  } else {
    const category = await db.categories.findOne({
      where: {
        name: categoryName,
      },
    });
    if (category) {
      if (!name) {
        await subCategory.update({ categoryId: category.id });
      } else {
        await subCategory.update({
          name: name,
          categoryId: category.id,
        });
      }
    } else {
      return res.status(400).json({
        message: "Category Không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Cập nhập SubCategory thành công",
      data: {
        id: subCategory.id,
        name: subCategory.name,
        categoryId: category.id,
      },
    });
  }
};

const deleteSubCategory = async (req, res) => {
  const { id } = req.body;
  const { error } = SubCategorySchema.del.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const subCategory = await db.subCategories.findByPk(id);
  if (!subCategory) {
    return res.status(200).json({ message: "SubCategory không tồn tại" });
  }
  await db.subCategories.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({ message: "Xóa SubCategory thành công" });
};

export {
  insertSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
