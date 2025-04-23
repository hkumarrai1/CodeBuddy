import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isSuccess && user) {
      // navigate("/dashboard"); // Redirect to dashboard after successful login
      console.log("Login SuccessFull");
    }
  }, [isSuccess, user, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white px-3">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h2 className="text-center text-primary fw-bold mb-1">
              Welcome Back
            </h2>
            <p className="text-center text-secondary mb-4">
              Login to your account
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email or Username
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
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="text-center mt-3 text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-none text-primary"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
