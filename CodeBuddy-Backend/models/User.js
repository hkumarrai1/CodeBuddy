const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  streak: {
    type: Number,
    default: 0,
  },
  enrolledCourses: [
    {
      course_id: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId to reference Course model
        ref: "Course",
      },
      progress: {
        type: Number,
        default: 0, // Progress in percentage
      },
    },
  ],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
