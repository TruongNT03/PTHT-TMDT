import db from "../models/index";
import * as Schema from "../dtos/ProductVariantValue";

const insertProductVariantValue = async (req, res) => {
  const { name, description, product_id } = req.body;
  const { error } = Schema.insert.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate error", errors: error });
  }
};

export { insertProductVariantValue };
