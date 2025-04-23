import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WelcomeBanner() {
  const [userData, setUserData] = useState({
    name: "",
    streak: 0,
    lastLogin: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="welcome-banner bg-primary text-white p-4 rounded">
      <h1 className="fw-bold">Welcome back, {userData.name}!</h1>
      <p>🔥 {userData.streak}-day streak!</p>
      <p>
        Last login:{" "}
        {userData.lastLogin
          ? new Date(userData.lastLogin).toLocaleDateString()
          : "First Login"}
      </p>
    </div>
  );
}
