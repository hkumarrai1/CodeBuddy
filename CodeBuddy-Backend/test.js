const mongoose = require("mongoose");
const Course = require("./models/courses"); // Adjust path as needed
require("dotenv").config();
const connectDb = require("./config/db");

async function testObjectId() {
  try {
    await connectDb(); // Connect to the database
    const courseId = "6567d71cabfa72947dcf77aaac"; // Your courseId here
    console.log("Testing with courseId:", courseId);

    const course = await Course.findById(courseId);

    if (course) {
      console.log("Course found:", course);
    } else {
      console.log("Course not found.");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Test error:", error);
    mongoose.disconnect();
  }
}

testObjectId();
