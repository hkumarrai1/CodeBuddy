const mongoose = require("mongoose");
const Course = require("./models/courses");
const connectDb = require("./config/db");
require("dotenv").config();

connectDb()
  .then(() => {
    console.log("MongoDB Connected via connectDb");
    seedData();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

async function seedData() {
  try {
    await Course.deleteMany({});

    const course = new Course({
      title: "Test Course",
      description: "Test Description",
    });

    await course.save();
    console.log("Seed data created successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.disconnect();
  }
}
