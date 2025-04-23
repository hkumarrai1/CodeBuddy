import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseFilters from "./CourseFilters";

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/enrolled-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleFilterChange = (filters) => {
    const { level, progress } = filters;
    let updatedCourses = [...courses];

    if (level) {
      updatedCourses = updatedCourses.filter(
        (course) => course.course_id.course_level === level
      );
    }

    if (progress) {
      updatedCourses = updatedCourses.filter((course) => {
        if (progress === "Completed") return course.progress === 100;
        if (progress === "InProgress") return course.progress < 100;
        return true;
      });
    }

    setFilteredCourses(updatedCourses);
  };

  if (loading) {
    return <div>Loading enrolled courses...</div>;
  }

  return (
    <div className="enrolled-courses">
      <CourseFilters onFilterChange={handleFilterChange} />
      <div className="course-cards">
        {filteredCourses.length === 0 ? (
          <p>No courses match the selected filters.</p>
        ) : (
          filteredCourses.map((course) => (
            <div className="course-card" key={course.course_id._id}>
              <h3>{course.course_id.course_name}</h3>
              <p>{course.course_id.course_description}</p>
              <p>Level: {course.course_id.course_level}</p>
              <p>Progress: {course.progress}%</p>
              <button className="btn btn-primary">Resume</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}