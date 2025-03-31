import db from "../models/index";
import * as ProductSchema from "../dtos/Product";
import totalPageCaculate from "../utils/totalPageCaculate";

const insertProduct = async (req, res) => {
  const {
    name,
    description,
    category_id,
    section_id,
    product_images = [],
    variants = [],
  } = req.body;
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
  let stock = 0;
  variants.map((value) => {
    stock += parseInt(value.stock);
  });
  console.log(stock);
  const transaction = await db.sequelize.transaction();
  const [product, created] = await db.products.findOrCreate({
    where: { name: name },
    defaults: {
      name,
      description,
      category_id,
      section_id,
      stock: stock,
    },
  });
  if (!created) {
    return res
      .status(200)
      .json({ message: "Sản phầm đã tồn tại, vui lòng chọn tên khác!" });
  }
  //xử lý biến thể
  for (const variant of variants) {
    let sku = "";
    for (const variantItem of variant.variantList) {
      let vari = await db.variants.findOne({
        where: {
          name: variantItem.variant,
        },
      });
      if (!vari) {
        vari = await db.variants.create(
          {
            name: variantItem.variant,
          },
          { transaction }
        );
      }
      let vari_value = await db.variant_values.findOne({
        where: {
          name: variantItem.value,
        },
      });
      if (!vari_value) {
        vari_value = await db.variant_values.create(
          {
            name: variantItem.value,
            variant_id: vari.id,
          },
          { transaction }
        );
      }
      sku += vari_value.id.toString() + "-";
    }
    sku = sku.substring(0, sku.length - 1);
    const product_variant_value = await db.product_variant_values.create(
      {
        product_id: product.id,
        price: variant.price,
        old_price: variant.discount_price,
        stock: variant.stock,
        sku: sku,
      },
      { transaction }
    );
  }
  await transaction.commit();
  const product_variant_values = await db.product_variant_values.findAll({
    where: {
      product_id: product.id,
    },
  });
  return res.status(201).json({
    message: "Thêm mới thành công",
    data: {
      id: product.id,
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      section_id: product.section_id,
      product_variant_values: product_variant_values,
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
