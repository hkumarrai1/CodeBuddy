const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
    unique: true,
  },
  course_description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  course_modules: [
    {
      module_id: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId for consistency
        auto: true, // Automatically generate unique IDs for modules
      },
      module_title: {
        type: String,
      },
      module_steps: [
        {
          step_title: {
            type: String,
          },
          step_example: {
            type: String,
            maxlength: 500,
          },
          step_description: {
            type: String,
            maxlength: 500,
          },
          step_task: [
            {
              task_description: {
                type: String,
                maxlength: 500,
              },
              task_testcases: {
                type: String,
                maxlength: 500,
              },
              task_output: {
                type: String,
                maxlength: 500,
              },
            },
          ],
        },
      ],
    },
  ],
  course_level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advance"],
  },
});

module.exports = mongoose.model("Course", courseSchema);
