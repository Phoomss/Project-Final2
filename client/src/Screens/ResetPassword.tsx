import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams<{ id: string; token: string }>();

  console.log("ID:", id);
  console.log("Token:", token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/reset_password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.Status === "Success") {
          navigate("/login");
        } else {
          console.error(data.Message);
        }
      } else {
        console.error("HTTP error! status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
