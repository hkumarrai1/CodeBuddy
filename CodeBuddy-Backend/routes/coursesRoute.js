const express = require("express");
const router = express.Router();
const Course = require("../models/courses");
// const protect = require("../middleware/authMiddleware");

router.post("/addCourse", async (req, res) => {
  try {
    const {
      course_id,
      course_name,
      course_description,
      course_modules,
      course_level,
    } = req.body;

    const newCourse = new Course({
      course_id,
      course_name: course_name,
      course_description: course_description,
      course_modules,
      course_level,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., course_id is not unique)
      return res.status(400).json({ message: "Course ID must be unique." });
    } else if (error.errors) {
      // Handle validation errors from the schema
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ message: "Validation errors", errors });
    } else {
      // Handle other errors
      console.error("Error adding course:", error);
      res.status(500).json({ message: "Failed to add course." });
    }
  }
});

router.post("/courses/:courseId/modules", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const newModule = req.body; // The request body should contain the new module object

    const course = await Course.findOneAndUpdate(
      { course_id: courseId },
      { $push: { course_modules: newModule } },
      { new: true } // Return the updated document
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(201).json(course);
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern["course_modules.module_id"]
    ) {
      return res
        .status(400)
        .json({ message: "Module ID must be unique within the course." });
    } else if (error.errors) {
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ message: "Validation errors", errors });
    } else {
      console.error("Error adding module:", error);
      res.status(500).json({ message: "Failed to add module." });
    }
  }
});

// Route to add a new step to a specific module of a course
router.post("/courses/:courseId/modules/:moduleId/steps", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    const newStep = req.body; // The request body should contain the new step object

    const course = await Course.findOne({ course_id: courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const moduleIndex = course.course_modules.findIndex(
      (module) => module.module_id === moduleId
    );

    if (moduleIndex === -1) {
      return res
        .status(404)
        .json({ message: "Module not found in the course." });
    }

    course.course_modules[moduleIndex].module_steps.push(newStep);

    const updatedCourse = await course.save();

    res.status(201).json(updatedCourse);
  } catch (error) {
    if (error.errors) {
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ message: "Validation errors", errors });
    } else {
      console.error("Error adding step:", error);
      res.status(500).json({ message: "Failed to add step." });
    }
  }
});
module.exports = router;
