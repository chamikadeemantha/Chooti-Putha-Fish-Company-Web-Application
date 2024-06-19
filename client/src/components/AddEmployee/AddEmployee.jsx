import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/employee-forming11.jpg";
import formimg2 from "../../backgroundimage/employee-forming22.jpg";
import formimg3 from "../../backgroundimage/employee-forming33.jpg";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    NIC: "",
    experience: "",
    salary: "",
    availability: "",
  });
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3];

  const navigate = useNavigate();

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const validateInputs = () => {
    let newErrors = {};

    if (!employee.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!employee.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!employee.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!employee.NIC.trim()) {
      newErrors.NIC = "NIC is required";
    } else if (!/^\d{9}[vV]|\d{12}$/.test(employee.NIC)) {
      newErrors.NIC = "Invalid NIC format";
    }

    if (!employee.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (!/^\d+$/.test(employee.experience)) {
      newErrors.experience = "Experience should be a positive integer";
    } else if (employee.experience < 1 || employee.experience > 20) {
      newErrors.experience = "Experience should be between 1 and 20 years";
    }

    if (!employee.salary.trim()) {
      newErrors.salary = "Salary is required";
    } else if (!/^\d+(\.\d+)?$/.test(employee.salary)) {
      newErrors.salary = "Invalid salary format";
    } else if (employee.salary < 35000 || employee.salary > 2000000) {
      newErrors.salary = "Salary should be between 35000 and 200000";
    }

    if (!employee.availability.trim()) {
      newErrors.availability = "Availability is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/employee/createemployee",
          employee
        );

        if (response.status === 200) {
          toast.success("Employee Details Added Successfully", {
            position: "top-right",
          });
          navigate("/empsalary");
        } else {
          throw new Error("Failed to add employee");
        }
      } catch (error) {
        console.error("Error Adding Employee: ", error);
        toast.error("An Error Occurred While Adding Employee Details", {
          position: "top-right",
        });
      }
    } else {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="empsalaryAddEmployee">
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
            <h2 className="empsalaryform-title">Add A New Employee</h2>
          </div>
          <form className="empsalaryform" onSubmit={submitForm}>
            <div className="empsalaryinputGroup">
              <label htmlFor="name">Employee name</label>
              <input
                type="text"
                onChange={inputHandler}
                id="name"
                value={employee.name}
                name="name"
                autoComplete="off"
                placeholder="Name of an employee"
              />
              {errors.name && (
                <span className="empsalaryerror">{errors.name}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                onChange={inputHandler}
                id="position"
                value={employee.position}
                name="position"
                autoComplete="off"
                placeholder="Position"
              />
              {errors.position && (
                <span className="empsalaryerror">{errors.position}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={employee.department}
                onChange={inputHandler}
              >
                <option value="">Select a Department</option>
                <option value="KITCHEN">KITCHEN</option>
                <option value="IT">IT</option>
                <option value="FISHERY">FISHERY</option>
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
                onChange={inputHandler}
                id="NIC"
                value={employee.NIC}
                name="NIC"
                autoComplete="off"
                placeholder="NIC number"
              />
              {errors.NIC && (
                <span className="empsalaryerror">{errors.NIC}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="experience">Experience (Years)</label>
              <input
                type="text"
                onChange={inputHandler}
                id="experience"
                value={employee.experience}
                name="experience"
                autoComplete="off"
                placeholder="Employee experience (years)"
              />
              {errors.experience && (
                <span className="empsalaryerror">{errors.experience}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="salary">Salary (Rupees)</label>
              <input
                type="text"
                onChange={inputHandler}
                id="salary"
                value={employee.salary}
                name="salary"
                autoComplete="off"
                placeholder="Basic Salary"
              />
              {errors.salary && (
                <span className="empsalaryerror">{errors.salary}</span>
              )}
            </div>
            <div className="empsalaryinputGroup">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                value={employee.availability}
                onChange={inputHandler}
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
              <center>
                <button type="submit" className="empsalarysubmitButton">
                  Add A Employee
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
