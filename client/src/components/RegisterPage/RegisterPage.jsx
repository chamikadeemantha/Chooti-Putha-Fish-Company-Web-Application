import React, { useState } from "react";
import logoimg from "../../backgroundimage/logo.jpg";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passowrdStatus, setPassowrdStatus] = useState(true);
  const [secretCode, setSecretCode] = useState("");
  const [showTopUpMessage, setShowTopUpMessage] = useState(false);

  const handleEye = () => {
    setPassowrdStatus((prev) => !prev);
  };

  const handlePositionSelect = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
    if (
      selectedPosition === "owner" ||
      selectedPosition === "coordinator" ||
      selectedPosition === "tansportmanager" ||
      selectedPosition === "inventorymanager" ||
      selectedPosition === "writtingperson" ||
      selectedPosition === "hrmanager"      
    ) {
      setShowTopUpMessage(true);
    } else {
      setShowTopUpMessage(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      fullName === "" ||
      position === "" ||
      employeeId === "" ||
      email === "" ||
      password === ""
    ) {
      return toast.error("Please fill all the fields", {
        position: "top-right",
      });
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid Email", {
        position: "top-right",
      });
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "top-right",
      });
    }

    // Check secret code
    const correctCodes = {
      owner: "1111",
      coordinator: "2222",
      tansportmanager: "3333",
      inventorymanager: "4444",
      writtingperson: "5555",
      hrmanager: "6666",      
    };

    if (correctCodes[position] !== secretCode) {
      return toast.error("Entered code is wrong", {
        position: "top-right",
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/createuser",
        {
          name: fullName,
          position,
          empId: employeeId,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("User created Successfully", {
          position: "top-right",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="registerpage">
      <div className="reg-left">
        <div className="reg-left-middle">
          <div className="reg-logo">
            <img src={logoimg} alt="" className="reg-logo-img" />
            <p className="logo-name">Chooti Putha Fish Company</p>
          </div>
          <form action="" className="reg-form">
            <div className="reg-name">
              <label htmlFor="reg-name">Full Name</label>
              <input
                type="text"
                id="reg-name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div className="reg-position">
              <label htmlFor="reg-position">Position</label>
              <select
                name=""
                id="reg-position"
                onChange={handlePositionSelect}
              >
                <option value="">Select a Position</option>
                <option value="owner">owner</option>
                <option value="coordinator">Coordinator</option>
                <option value="tansportmanager">Transport Manager</option>
                <option value="inventorymanager">Inventory Manager</option>
                <option value="writtingperson">Writing Person</option>
                <option value="hrmanager">Human Resource Manager</option>
              </select>
            </div>
            {showTopUpMessage && (
              <div className="top-up-message">
                <p>Enter your Secret Code</p>
                <input
                  type="password"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                />
                <button onClick={() => setShowTopUpMessage(false)}>
                  Close
                </button>
              </div>
            )}
            <div className="reg-empId">
              <label htmlFor="reg-empId">Phone Number</label>
              <input
                type="text"
                id="reg-empId"
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
              />
            </div>
            <div className="reg-email">
              <label htmlFor="reg-email">Email</label>
              <input
                type="email"
                id="reg-email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="reg-password">
              <label htmlFor="reg-password">Password</label>
              <input
                type={passowrdStatus ? "password" : "text"}
                id="reg-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <IoEyeSharp className="eye" onClick={handleEye} />
            </div>
            <div className="already-acc">
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account
              </p>
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
          </form>
        </div>
      </div>
      <div className="reg-right">ass</div>
    </div>
  );
}

export default RegisterPage;
