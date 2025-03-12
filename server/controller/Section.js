import db from "../models/index";
import * as SectionSchema from "../dtos/Section";

const insertSection = async (req, res) => {
  const { name } = req.body;
  const { error } = SectionSchema.insert.validate({ name: name });
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const section = await db.sections.create({
    name,
  });
  return res.status(201).json({
    message: "Thêm mới section thành công",
    data: {
      id: section.id,
      name: section.name,
    },
  });
};

const updateSection = async (req, res) => {
  const { id, name } = req.body;
  const { error } = SectionSchema.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validate Error", errors: error });
  }
  const section = await db.sections.findByPk(id);
  if (!section) {
    return res
      .status(400)
      .json({ message: "Không tìm thấy section tương ứng" });
  }
  await section.update({ name: name });
  return res.status(200).json({
    message: "Cập nhập thông tin section thành công",
    data: {
      id: section.id,
      name: section.name,
    },
  });
};

const getSection = async (req, res) => {
  const sections = await db.sections.findAll({
    attributes: ["id", "name"],
  });
  return res.status(200).json({
    message: "Thành công",
    data: sections,
  });
};

const deleteSection = async (req, res) => {
  const { id } = req.body;
  const { error } = SectionSchema.del.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validate Error",
      errors: error,
    });
  }
  const section = await db.sections.findByPk(id);
  if (!section) {
    return res.status(400).json({
      message: "Section không tồn tại",
    });
  }
  await section.destroy();
  return res.status(200).json({
    message: "Xóa section thành công",
  });
};

export { insertSection, updateSection, getSection, deleteSection };
