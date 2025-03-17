const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modules: [
    {
      moduleTitle: { type: String, required: true },
      projects: [
        {
          projectTitle: { type: String, required: true },
          steps: [
            {
              stepTitle: { type: String, required: true },
              explanation: { type: String, required: true },
              exampleCode: { type: String },
              instructions: [{ type: String, required: true }],
              notes: [{ type: String }],
              problem: {
                description: { type: String, required: true },
                testCases: [
                  {
                    input: { type: String },
                    expectedOutput: { type: String, required: true },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
