import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white px-3">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h2 className="text-center text-primary fw-bold mb-1">
              Create Account
            </h2>
            <p className="text-center text-secondary mb-4">Join us today</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {isError && (
                <div
                  className="alert alert-danger py-2 text-center"
                  role="alert"
                >
                  {message}
                </div>
              )}

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary rounded-3 fw-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>

            <div className="text-center mt-3 text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
