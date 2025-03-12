import db from "../models/products";
import * as ProductSchema from "../dtos/Product";

const insertProduct = async (req, res) => {
  const {
    id,
    name,
    description,
    price,
    stock,
    image,
    subCategoryId,
    sectionId,
  } = req.body;
  const { error } = ProductSchema.insert.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
};

export { insertProduct };
