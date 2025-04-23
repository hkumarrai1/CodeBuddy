import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import CourseProgress from "./CourseProgress";
import EnrolledCourses from "./EnrolledCourses";
import AllCourses from "./AllCourses";
import "./DashBoardLayout.css"; // Add a CSS file for styling

export default function DashBoardLayout() {
  return (
    <div className="dashboard-layout container py-4">
      {/* Welcome Banner */}
      <section className="mb-4 welcome-banner">
        <WelcomeBanner />
      </section>

      {/* All Courses */}
      <section className="mb-4 all-courses">
        <AllCourses />
      </section>

      {/* Course Progress */}
      <section className="mb-4 course-progress">
        <h2 className="section-title">Your Progress</h2>
        <CourseProgress />
      </section>

      {/* Enrolled Courses */}
      <section className="course-section">
        <div className="enrolled-courses">
          <h2 className="section-title">Your Enrolled Courses</h2>
          <EnrolledCourses />
        </div>
      </section>
    </div>
  );
}
