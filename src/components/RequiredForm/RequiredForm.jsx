import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const RequiredForm = ({ onSubmit }) => {
  const { user } = useContext(AuthContext);
  const [age, setAge] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (age < 20) {
      Swal.fire({
        icon: "error",
        title: "Invalid Age",
        text: "Age must be 20 or more.",
      });
      return;
    }

    // Sending data to the backend
    const requiredInfo = {
      age,
      securityDeposit,
      idNumber,
      email: user?.email, // Retrieve the current user's email from AuthContext
    };

    // Simulate sending data to the backend
    fetch("https://your-backend-endpoint.com/submit-required-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requiredInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        // On successful form submission
        Swal.fire({
          icon: "success",
          title: "Information Submitted",
          text: "You can now select a date.",
        });
        onSubmit(); // Allow user to proceed with selecting a date
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your information.",
        });
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Required Information</h2>

      <label className="block mb-2">
        Age (must be 20 or more):
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Security Deposit:
        <input
          type="number"
          value={securityDeposit}
          onChange={(e) => setSecurityDeposit(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mt-1"
          required
        />
      </label>

      <label className="block mb-4">
        ID Number:
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mt-1"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-[#037092] text-white py-2 px-4 rounded hover:bg-[#015974]"
      >
        Submit
      </button>
    </form>
  );
};

export default RequiredForm;
