const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("SIGNUP DATA:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN DATA:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
