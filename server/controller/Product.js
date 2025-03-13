import db from "../models/index";
import * as ProductSchema from "../dtos/Product";

const insertProduct = async (req, res) => {
  const { name, description, price, stock, image, subCategoryId, sectionId } =
    req.body;
  const { error } = ProductSchema.insert.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const subCategory = await db.subCategories.findByPk(subCategoryId);
  if (!subCategory) {
    return res.status(400).json({ message: "Không tồn tại SubCategory" });
  }
  const section = await db.sections.findByPk(sectionId);
  if (!section) {
    return res.status(400).json({ message: "Không tồn tại section" });
  }
  const product = await db.products.create(req.body);
  return res.status(201).json({
    message: "Thêm mới product thành công",
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stoke,
      image: product.image,
      subCategoryId: product.subCategoryId,
      sectionId: product.sectionId,
    },
  });
};

const updateProduct = async (req, res) => {
  const { name, description, price, stock, image, subCategoryId, sectionId } =
    req.body;
  const { id } = req.body;
  const { error } = ProductSchema.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const product = await db.products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "Không tồn tại product" });
  }
  await product.update(req.body);
  return res.status(201).json({
    message: "Cập nhập product thành công",
  });
};

const getProduct = async (req, res) => {
  const products = await db.products.findAll({
    attributes: ["id", "description", "price", "stock", "image"],
    include: [
      {
        model: db.subCategories,
        attributes: ["name"],
      },
      {
        model: db.sections,
        attributes: ["name"],
      },
    ],
  });
  return res.status(200).json({ message: "Thành công", data: products });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const { error } = ProductSchema.del.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const product = await db.products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "Product không tồn tại" });
  }
  await product.destroy();
  return res.status(200).json({ message: "Xóa product thành công" });
};

export { insertProduct, updateProduct, getProduct, deleteProduct };
