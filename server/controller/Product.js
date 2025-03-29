import db from "../models/index";
import * as ProductSchema from "../dtos/Product";
import totalPageCaculate from "../utils/totalPageCaculate";

const insertProduct = async (req, res) => {
  const { name, description, category_id, section_id, variant_product } =
    req.body;
  const variants = variant_product.variant;
  const { error } = ProductSchema.insert.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const category = await db.categories.findByPk(category_id);
  if (!category) {
    return res.status(400).json({ message: "Không tồn tại category" });
  }
  const section = await db.sections.findByPk(section_id);
  if (!section) {
    return res.status(400).json({ message: "Không tồn tại section" });
  }
  const transaction = await db.sequelize.transaction();
  const [product, created] = await db.products.findOrCreate({
    where: { name, category_id, section_id },
    defaults: {
      name,
      description,
      category_id,
      section_id,
      stock: Number.parseInt(variant_product.stock),
    },
    transaction,
  });

  if (!created) {
    product.stock += Number.parseInt(variant_product.stock);
    await product.save({ transaction });
  }
  //xử lý biến thể
  let variant_value_id = [];
  for (const element of variants) {
    const variant = await db.variants.findOrCreate({
      where: {
        name: Object.keys(element)[0],
      },
      defaults: {
        name: Object.keys(element)[0],
      },
      transaction,
    });
    const variant_value = await db.variant_values.findOrCreate({
      where: {
        name: Object.values(element)[0],
      },
      defaults: {
        name: Object.values(element)[0],
        variant_id: variant.id,
      },
      transaction,
    });
    variant_value_id.push(variant_value[0].id);
  }
  let sku_string = "";
  for (const id of variant_value_id) {
    sku_string += id.toString() + "-";
  }
  sku_string = sku_string.substring(0, sku_string.length - 1);
  const product_variant_value = await db.product_variant_values.create(
    {
      product_id: product.id,
      price: variant_product.price,
      old_price: variant_product.old_price,
      stock: variant_product.stock,
      sku: sku_string,
    },
    { transaction }
  );
  await transaction.commit();
  return res.status(201).json({
    message: "Thêm mới thành công",
    data: {
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      section_id: product.section_id,
      variant: {
        product_id: product_variant_value.product_id,
        price: product_variant_value.price,
        old_price: product_variant_value.old_price,
        stock: product_variant_value.stock,
        sku: product_variant_value.sku,
      },
    },
  });
};

const updateProduct = async (req, res) => {
  const { id, name, description, category_id, section_id } = req.body;
  const { error } = ProductSchema.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const product = await db.products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "Không tồn tại product" });
  }
  await product.update({ ...req.body });
  return res.status(201).json({
    message: "Cập nhập product thành công",
  });
};

const getProduct = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  const { rows, count } = await db.products.findAndCountAll({
    attributes: ["id", "name", "description", "price", "stock", "image"],
    include: [
      {
        model: db.subCategories,
        attributes: ["id", "name"],
      },
      {
        model: db.sections,
        attributes: ["id", "name"],
      },
    ],
    limit,
    offset,
  });
  const totalItem = count;
  const totalPage = totalPageCaculate(totalItem);
  return res.status(200).json({
    message: "Thành công",
    data: rows,
    totalItem: totalItem,
    currentPage: Number.parseInt(page),
    totalPage: totalPage,
  });
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

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await db.products.findByPk(id, {
    attributes: ["id", "name", "description", "stock"],
    include: [
      {
        model: db.product_variant_values,
        where: {
          product_id: id,
        },
        attributes: ["id", "price", "old_price", "stock"],
        required: false,
      },
      {
        model: db.product_images,
        where: {
          product_id: id,
        },
        attributes: ["path"],
        required: false,
      },
    ],
  });
  if (!product) {
    return res.status(200).json({ message: "Không tồn tại sản phẩm" });
  }
  return res.status(200).json({ message: "Thành công", data: product });
};

export {
  insertProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getProductById,
};
