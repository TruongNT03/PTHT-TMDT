import db, { Sequelize } from "../models/index";
import * as ProductSchema from "../dtos/Product";
import totalPageCaculate from "../utils/totalPageCaculate";
import { Op } from "sequelize";

const insertProduct = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const { product_images, variant_images } = req?.files;
  const { name, description, category_id, section_id, variants } = data;
  const { error } = ProductSchema.insert.validate({
    name,
    description,
    category_id,
    section_id,
    variants,
  });
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
  const transaction = await db.sequelize.transaction();
  const [product, created] = await db.products.findOrCreate({
    where: { name: name },
    defaults: {
      name,
      description,
      category_id,
      section_id,
      stock: stock,
      price: variants[0].price,
    },
  });
  for (const file of product_images) {
    await db.product_images.create(
      {
        product_id: product.id,
        path: "/images/" + file.filename,
      },
      { transaction }
    );
  }
  if (!created) {
    return res.status(200).json({
      errors: { message: "Sản phầm đã tồn tại, vui lòng chọn tên khác!" },
    });
  }
  //xử lý biến thể
  for (let i = 0; i < variants.length; i++) {
    let sku = "";
    for (const variantItem of variants[i].variantList) {
      console.log(variantItem);
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
      const path = variant_images[i]
        ? "/images/" + variant_images[i].filename
        : null;
      if (!vari_value) {
        vari_value = await db.variant_values.create(
          {
            name: variantItem.value,
            image: path,
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
        price: variants[i].price,
        old_price: variants[i].old_price,
        stock: variants[i].stock,
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
  const {
    page = 1,
    keyword,
    sortBy = "createdAt",
    sortOrder = "ASC",
  } = req.query;
  let { limit = 10 } = req.query;
  limit = Number.parseInt(limit);
  const offset = (page - 1) * limit;
  const whereCondition = keyword
    ? {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      }
    : {};
  const { count, rows } = await db.products.findAndCountAll({
    where: whereCondition,
    attributes: ["id", "name", "description", "stock", "price", "createdAt"],
    distinct: true,
    include: [
      {
        model: db.categories,
        attributes: ["id", "name"],
      },
      {
        model: db.sections,
        attributes: ["id", "name"],
      },
      {
        model: db.product_images,
        where: {
          product_id: Sequelize.col("products.id"),
        },
        attributes: ["id", "path"],
        required: false,
      },
    ],
    order: [[sortBy, sortOrder.toUpperCase()]],
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
    attributes: [
      "id",
      "name",
      "description",
      "stock",
      "price",
      "category_id",
      "section_id",
    ],
    include: [
      {
        model: db.product_variant_values,
        where: {
          product_id: id,
        },
        attributes: ["id", "price", "old_price", "stock", "sku"],
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
  const variant_value_data = [];
  for (const element of product.product_variant_values) {
    const sku_arr = element.sku.split("-").map((value) => parseInt(value));
    const listVariant = [];
    for (let i = 0; i < sku_arr.length; i++) {
      const dataFind = await db.variant_values.findByPk(sku_arr[i], {
        attributes: ["id", "name", "image"],
        include: [
          {
            model: db.variants,
            attributes: ["name"],
          },
        ],
      });
      listVariant.push({
        id: dataFind.id,
        value: dataFind.name,
        name: dataFind.variant.name,
        image: dataFind.image,
      });
    }
    variant_value_data.push(listVariant);
  }
  let response = {
    id: product.id,
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    category_id: product.category_id,
    section_id: product.section_id,
    product_variants: [],
    product_images: product.product_images,
  };
  for (let i = 0; i < product.product_variant_values.length; i++) {
    response.product_variants.push({
      id: product.product_variant_values[i].id,
      price: product.product_variant_values[i].price,
      old_price: product.product_variant_values[i].old_price,
      stock: product.product_variant_values[i].stock,
      image: product.product_variant_values[i].image,
      variant: variant_value_data[i],
    });
  }
  return res.status(200).json({ message: "Thành công", data: response });
};

export {
  insertProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getProductById,
};
