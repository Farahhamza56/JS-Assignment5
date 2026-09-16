import { User } from "../../models/associations.js";

// 1
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = User.build({ name, email, password, role });
    await user.save();

    return res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// 2
export const createOrUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await User.findByPk(id);

    if (user) {
      await user.update(data, { validate: false });
    } else {
      await User.create({ ...data, id }, { validate: false });
    }

    return res
      .status(200)
      .json({ message: "User created or updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// 3
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// 4
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};