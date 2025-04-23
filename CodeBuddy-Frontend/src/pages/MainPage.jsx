// src/pages/MainPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function MainPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-light text-dark position-relative">
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          backgroundImage: 'url("/assets/mascot.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 123, 255, 0.8)",
        }}
        data-aos="fade-up"
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to CodeBuddy 👨‍💻</h1>
          <p className="lead fs-4">
            Learn to code, practice challenges, and build your career with us.
          </p>
          <Link
            to="/register"
            className="btn btn-outline-light btn-lg fw-bold mt-3 shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2
            className="fw-bold text-center text-primary mb-5"
            data-aos="fade-right"
          >
            Why Choose CodeBuddy?
          </h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="bi bi-lightbulb fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">Interactive Lessons</h5>
                  <p className="text-muted">
                    Learn through visual, engaging coding tutorials.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="bi bi-code-slash fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">Real Code Challenges</h5>
                  <p className="text-muted">
                    Practice with hands-on problems and projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up-arrow fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">Progress Tracker</h5>
                  <p className="text-muted">
                    Track your learning and unlock achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="text-center py-5 bg-primary text-white"
        data-aos="fade-up"
      >
        <div className="container">
          <h2 className="fw-bold display-5">Start Your Coding Journey Today</h2>
          <p className="lead fs-5">
            No experience needed. Just passion and curiosity.
          </p>
          <Link
            to="/register"
            className="btn btn-light btn-lg fw-bold mt-3 shadow-sm"
          >
            Join CodeBuddy
          </Link>
        </div>
      </section>
    </div>
  );
}
