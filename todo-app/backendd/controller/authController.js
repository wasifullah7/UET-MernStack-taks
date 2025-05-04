const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


const JWT_SECRET = "123abcg23de";
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All Fields are required!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "Already exits" });
    }

    
    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ error: "All fields required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
