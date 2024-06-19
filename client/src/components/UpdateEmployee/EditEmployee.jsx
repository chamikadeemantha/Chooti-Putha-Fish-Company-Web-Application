import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../AddEmployee/AddEmployee.css";
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/employee-forming11.jpg";
import formimg2 from "../../backgroundimage/employee-forming22.jpg";
import formimg3 from "../../backgroundimage/employee-forming33.jpg";

const EditEmployee = () => {
  const employees = {
    name: "",
    position: "",
    department: "",
    NIC: "",
    experience: "",
    salary: "",
    availability: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(employees);
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3]; // Add more images to this array

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const validateName = (name, value, newErrors) => {
    const regex = /^[A-Z][a-z]*(([' -][A-Z][a-z]*)+)*$/;
    if (value.trim() === "") {
      newErrors[name] = "Name is required";
    } else if (!regex.test(value)) {
      newErrors[name] = "Invalid name. Name should start with a capital letter and should not contain numbers or special symbols.";
    } else {
      delete newErrors[name];
    }
  };

  const validatePosition = (name, value, newErrors) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      newErrors[name] = "Position is required";
    } else if (!regex.test(value)) {
      newErrors[name] = "Invalid position. Position should only contain letters and spaces.";
    } else {
      delete newErrors[name];
    }
  };

  const validateDepartment = (name, value, newErrors) => {
    if (value.trim() === "") {
      newErrors[name] = "Department is required";
    } else {
      delete newErrors[name];
    }
  };


  const validateAvailability = (name, value, newErrors) => {
    if (value.trim() === "") {
      newErrors[name] = "Availability is required";
    } else {
      delete newErrors[name];
    }
  };
  
  const validateSalary = (name, value, newErrors) => {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      newErrors[name] = "You can only Insert Positive Integer";
    } else if (value < 35000 || value > 200000) {
      newErrors[name] = "Salary should be between 35000 and 200000";
    } else {
      delete newErrors[name];
    }
  };

  const validateExperience = (name, value, newErrors) => {
    if (!/^\d+$/.test(value)) {
      newErrors[name] = "Experience should be a positive integer";
    } else if (value < 1 || value > 20) {
      newErrors[name] = "Experience should be between 1 and 20 years";
    } else {
      delete newErrors[name];
    }
  };

  const validateNIC = (name, value, newErrors) => {
    const oldNICRegex = /^\d{9}[vV]$/;
    const newNICRegex = /^\d{12}$/;
    if (!oldNICRegex.test(value) && !newNICRegex.test(value)) {
      newErrors[name] = "Invalid NIC. Old NIC should have 9 numbers followed by 'V' or 'v'. New NIC should have 12 numbers.";
    } else {
      delete newErrors[name];
    }
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '');

    switch (name) {
      case "name":
        validateName(name, value, newErrors);
        break;
      case "position":
        validatePosition(name, value, newErrors);
        break;
      case "department":
        validateDepartment(name, value, newErrors);
        break;
      case "availability":
        validateAvailability(name, value, newErrors);
        break;
      case "NIC":
        validateNIC(name, value, newErrors);
        break;
      case "experience":
        validateExperience(name, value, newErrors);
        break;
      case "salary":
        validateSalary(name, value, newErrors);
        break;
      default:
        break;
    }

    setErrors(newErrors);
    setEmployee({
      ...employee,
      [name]: name === "department" ? value.toUpperCase() : value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/employee/getoneemployee/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/employee/updateemployee/${id}`,
          employee,
        );
        if (response.status === 200) {
          toast.success("Employee Details Updated Successfully", {
            position: "top-right",
          });
          navigate("/empsalary");
        } else {
          toast.error("Failed to Updated employee details", {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("An error occurred while Updating employee details", {
          position: "top-right",
        });
        console.error("Error Updating employee details: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="empsalaryEditEmployee">
      <div className="empsalarycontainer">
        <div className="empsalaryimage-container">
          <img
            src={images[imageIndex]}
            alt="Fish Image"
            className="empsalaryfish-image"
          />
        </div>
        <div className="empsalaryform-container">
          <div className="empsalaryheader">
            <h2 className="empsalaryform-title">Update Employee Details</h2>
          </div>
          <form className="empsalaryform" onSubmit={submitForm}>
            <div className="empsalaryinputGroup">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Name of The Employee"
                value={employee.name}
              />
              {errors.name && (
                <span className="empsalaryerror">{errors.name}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="Position">Position</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="position"
                name="position"
                autoComplete="off"
                placeholder="Position"
                value={employee.position}
              />
              {errors.position && (
                <span className="empsalaryerror">{errors.position}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="Department">Department</label>
              <select
                id="department"
                name="department"
                onChange={e =>
                  setEmployee({
                    ...employee,
                    department: e.target.value.toUpperCase(),
                  })
                }
                value={employee.department}
              >
                <option value="">Select a Department</option>
                <option value="KITCHEN">KITCHEN</option>
                <option value="IT">IT</option>
                <option value="CLEANING">CLEANING</option>
              </select>
              {errors.department && (
                <span className="empsalaryerror">{errors.department}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="NIC">NIC</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="NIC"
                name="NIC"
                autoComplete="off"
                placeholder="NIC"
                value={employee.NIC}
              />
              {errors.NIC && (
                <span className="empsalaryerror">{errors.NIC}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="Experience">Experience (Years)</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="experience"
                name="experience"
                autoComplete="off"
                placeholder="Experience (years)"
                value={employee.experience}
              />
              {errors.experience && (
                <span className="empsalaryerror">{errors.experience}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="Salary">Salary(Rupees)</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="salary"
                name="salary"
                autoComplete="off"
                placeholder="Basic Salary"
                value={employee.salary}
              />
              {errors.salary && (
                <span className="empsalaryerror">{errors.salary}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="Availability">Availability</label>
              <select
                id="availability"
                name="availability"
                onChange={inputChangeHandler}
                value={employee.availability}
              >
                <option value="">Select Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.availability && (
                <span className="empsalaryerror">{errors.availability}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <center><button className="empsalarysubmitButton" type="submit">UPDATE Employee Details</button></center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
