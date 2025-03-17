const express = require("express");
const router = express.Router();
const Course = require("../models/courses"); // Adjust path if needed
// Assuming you have your protect middleware
const protect = require("../middleware/authMiddleware"); // Adjust path if needed

// Get entire course structure
router.get("/:courseId", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    console.log("Received courseId:", course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific module
router.get("/:courseId/modules/:moduleId", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific project
router.get(
  "/:courseId/modules/:moduleId/projects/:projectId",
  protect,
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const module = course.modules.id(req.params.moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }

      const project = module.projects.id(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Get a specific step
router.get(
  "/:courseId/modules/:moduleId/projects/:projectId/steps/:stepId",
  protect,
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const module = course.modules.id(req.params.moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }

      const project = module.projects.id(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const step = project.steps.id(req.params.stepId);
      if (!step) {
        return res.status(404).json({ message: "Step not found" });
      }

      res.json(step);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Submit code for evaluation (Placeholder)
router.post(
  "/:courseId/modules/:moduleId/projects/:projectId/steps/:stepId/evaluate",
  protect,
  async (req, res) => {
    try {
      res.json({
        success: true, // Placeholder
        message: "Evaluation processed (logic to be added).",
        results: [], // Placeholder
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
