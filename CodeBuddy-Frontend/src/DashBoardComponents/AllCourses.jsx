import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardLayout.css";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/allcourses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching all courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  if (loading) {
    return <div>Loading all courses...</div>;
  }

  return (
    <div className="all-courses">
      <h2 className="section-title">All Courses</h2>
      <div className="course-cards">
        {courses.length === 0 ? (
          <p>No courses available at the moment.</p>
        ) : (
          courses.map((course) => (
            <div className="course-card" key={course._id}>
              <h3>{course.course_name}</h3>
              <p>{course.course_description}</p>
              <p>Level: {course.course_level}</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
