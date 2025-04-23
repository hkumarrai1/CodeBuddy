import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CourseProgress() {
  const [courses, setCourses] = useState([]);
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
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <div>Loading course progress...</div>;
  }

  const totalProgress =
    courses.length > 0
      ? courses.reduce((acc, course) => acc + course.progress, 0) /
        courses.length
      : 0;

  return (
    <div className="course-progress">
      <h2>Overall Course Progress</h2>
      <div className="progress mb-3">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${totalProgress}%` }}
          aria-valuenow={totalProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {totalProgress.toFixed(2)}%
        </div>
      </div>
      <h3>Individual Course Progress</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id._id}>
            <h4>{course.course_id.course_name}</h4>
            <div className="progress">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: `${course.progress}%` }}
                aria-valuenow={course.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {course.progress}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
