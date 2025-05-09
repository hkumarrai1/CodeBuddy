const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the User model
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const currentDate = new Date();
    const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;

    if (lastLoginDate) {
      const timeDifference = currentDate - lastLoginDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      if (daysDifference < 1) {
        // Same day login, streak remains unchanged
      } else if (daysDifference < 2) {
        // Consecutive day login, increment streak
        user.streak += 1;
      } else {
        // Missed days, reset streak
        user.streak = 1;
      }
    } else {
      // First login, initialize streak
      user.streak = 1;
    }

    user.lastLogin = currentDate;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token: token,
      message: "Login successful",
      streak: user.streak,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update name & email if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Update password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/logout", protect, (req, res) => {
  res.json({ message: "User logged out successfully" });
});

router.get("/user", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name streak lastLogin"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/enrolled-courses", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "enrolledCourses.course_id",
      select: "course_name course_description course_level",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
