import validator from "validator";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import userAdminModel from "../models/userAdminModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for Admin user register
const registerAdminUser = async (req, res) => {
  try {
    const { name, email, password, storeName, domain } = req.body;

    // Checking user already exists or not
    const exists = await userAdminModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a  valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length should be greater than 8",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userAdminModel({
      name,
      email,
      password: hashedPassword,
      storeName,
      domain,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for admin login (updated to use userAdminModel)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userAdminModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin user doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      const token = createToken(admin._id);
      res.json({
        success: true,
        token,
        admin: {
          name: admin.name,
          email: admin.email,
          subscription: admin.subscription,
          id: admin._id,
        },
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for admin login
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export { adminLogin, registerAdminUser };
