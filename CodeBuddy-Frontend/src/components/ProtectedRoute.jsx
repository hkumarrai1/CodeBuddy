// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const ProtectedRoute = () => {
//   console.log("ProtectedRoute rendered");

//   const token = localStorage.getItem("token");
//   console.log("Token:", token);

//   if (!token) {
//     console.log("No token found. Redirecting to login.");
//     return (
//       <Navigate
//         to="/login"
//         state={{ message: "Session expired. Please login again." }}
//       />
//     );
//   }

//   try {
//     const decoded = jwtDecode(token);
//     console.log("Decoded token:", decoded);
//     const isExpired = decoded.exp * 1000 < Date.now();

//     if (isExpired) {
//       console.log("Token expired. Redirecting to login.");
//       localStorage.removeItem("token");
//       return (
//         <Navigate
//           to="/login"
//           state={{ message: "Session expired. Please login again." }}
//         />
//       );
//     }
//   } catch (error) {
//     console.error("Invalid token:", error);
//     // localStorage.removeItem("token");
//     return (
//       <Navigate
//         to="/login"
//         state={{ message: "Invalid token. Please login again." }}
//       />
//     );
//   }

//   console.log("Token is valid. Rendering protected content.");
//   return <Outlet />;
// };

// export default ProtectedRoute;
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) {
        console.log("Token is valid.");
        return children || <Outlet />;
      } else {
        console.log("Token is expired. Redirecting to /login.");
        return (
          <Navigate
            to="/login"
            state={{ message: "Session expired. Please login again." }}
          />
        );
      }
    } catch (error) {
      console.error("Invalid token:", error);
      console.log("Invalid token. Redirecting to /login.");
      localStorage.removeItem("token"); // Consider removing the invalid token
      return (
        <Navigate
          to="/login"
          state={{ message: "Invalid token. Please login again." }}
        />
      );
    }
  } else {
    console.log("No token found. Redirecting to /login.");
    return (
      <Navigate
        to="/login"
        state={{ message: "Please login to access this page." }}
      />
    );
  }
};

export default ProtectedRoute;
