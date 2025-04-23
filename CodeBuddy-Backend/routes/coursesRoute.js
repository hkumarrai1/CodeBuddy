const express = require("express");
const router = express.Router();
const Course = require("../models/courses");
// const protect = require("../middleware/authMiddleware");

router.post("/addCourse", async (req, res) => {
  try {
    const { course_name, course_description, course_modules, course_level } =
      req.body;

    const newCourse = new Course({
      course_name,
      course_description,
      course_modules,
      course_level,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate course detected." });
    } else if (error.errors) {
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ message: "Validation errors", errors });
    } else {
      console.error("Error adding course:", error);
      res.status(500).json({ message: "Failed to add course." });
    }
  }
});

router.get("/allcourses", async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      "course_name course_description course_level"
    );
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
});

router.post("/courses/:courseId/modules", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const newModule = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { course_modules: newModule } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(201).json(course);
  } catch (error) {
    if (error.errors) {
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

router.post(
  "/courses/:courseId/modules/:modulestepsId/steps",
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const moduleId = req.params.moduleId;
      const newStep = req.body;

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }

      const module = course.course_modules.id(moduleId);

      if (!module) {
        return res
          .status(404)
          .json({ message: "Module not found in the course." });
      }

      module.module_steps.push(newStep);

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
  }
);

module.exports = router;
