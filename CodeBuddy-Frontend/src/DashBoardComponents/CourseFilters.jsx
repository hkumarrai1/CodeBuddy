import React, { useState } from "react";

export default function CourseFilters({ onFilterChange }) {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    onFilterChange({ level: e.target.value, progress: selectedProgress });
  };

  const handleProgressChange = (e) => {
    setSelectedProgress(e.target.value);
    onFilterChange({ level: selectedLevel, progress: e.target.value });
  };

  return (
    <div className="course-filters">
      <h3>Filter Courses</h3>
      <div className="filter-group">
        <label htmlFor="level">Course Level:</label>
        <select id="level" value={selectedLevel} onChange={handleLevelChange}>
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="progress">Progress:</label>
        <select
          id="progress"
          value={selectedProgress}
          onChange={handleProgressChange}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="InProgress">In Progress</option>
        </select>
      </div>
    </div>
  );
}
