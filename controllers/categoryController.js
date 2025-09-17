import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name, adminId: req.user._id });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

// Add Subcategory
export const subCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newSubCategory = new SubCategory({ name, adminId: req.user._id });
    await newSubCategory.save();
    res.status(201).json({ message: "Subcategory added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding subcategory", error });
  }
};

// Get Categories
export const getCategories = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From query parameter
    } else {
      return res.status(400).json({
        message: "Admin ID is required to fetch categories",
      });
    }
    console.log("🔐 getCategories req.user:", req.user);

    const categories = await Category.find({ adminId });

    if (!categories) {
      return res.status(404).json({
        message: "No categories found",
      });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get Subcategories
export const getSubCategories = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From query parameter
    } else {
      return res.status(400).json({
        message: "Admin ID is required to fetch subcategories",
      });
    }
    console.log("🔐 getSubCategories req.user:", req.user);
    const subCategories = await SubCategory.find({ adminId });
    if (!subCategories) {
      return res.status(404).json({
        message: "No subcategories found",
      });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findOneAndDelete({ _id: id, adminId: req.user._id });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Delete Subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await SubCategory.findOneAndDelete({ _id: id, adminId: req.user._id });
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.findOneAndUpdate(
      { _id: id, adminId: req.user._id },
      { name }
    );
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Update Subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await SubCategory.findOneAndUpdate(
      { _id: id, adminId: req.user._id },
      { name }
    );
    res.status(200).json({ message: "Subcategory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error });
  }
};
