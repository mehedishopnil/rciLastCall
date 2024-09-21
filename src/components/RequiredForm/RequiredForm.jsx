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

  const email = user?.email;
  console.log(email)

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate age
    if (age < 20) {
      Swal.fire({
        icon: "error",
        title: "Invalid Age",
        text: "Age must be 20 or more.",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "User Email Missing",
        text: "Please log in to submit your information.",
      });
      return;
    }

    // Required data to send
    const requiredInfo = {
      age: Number(age), // Ensure the age is a number
      securityDeposit: Number(securityDeposit), // Ensure deposit is a number
      idNumber,
      email,
    };

    console.log(requiredInfo)

    // Send the data to the backend with the user's email
    fetch(`https://rci-last-call-server.vercel.app/update-user-info?email=${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requiredInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Information Submitted",
            text: "You can now select a date.",
          });
          onSubmit(); // Proceed to the next step after successful submission
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: data.message || "There was an issue submitting your information.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your information.",
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
          min="20" // Set minimum age in the input for better UX
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
          min="0" // Ensure only non-negative numbers
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
        className="bg-[#037092] text-white py-2 px-4 rounded hover:bg-[#015974] transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default RequiredForm;
