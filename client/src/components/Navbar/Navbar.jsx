import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import ownerImg from "./Navimage/owner.jpg";
import sysadminImg from "./Navimage/sysadmin.jpg";
import transportmanagerImg from "./Navimage/transportmanager.jpg";
import inventorymanagerImg from "./Navimage/inventorymanager.jpg";
import writtingpersonImg from "./Navimage/writtingperson.jpg";

function Navbar({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordStatus, setOldPasswordStatus] = useState(true);
  const [newPasswordStatus, setNewPasswordStatus] = useState(true);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  let post = "";

  if (user.position === "owner") {
    post = "Owner";
  } else if (user.position === "coordinator") {
    post = "Coordinator";
  } else if (user.position === "tansportmanager") {
    post = "Transport Manager";
  } else if (user.position === "inventorymanager") {
    post = "Inventory Manager";
  } else if (user.position === "writtingperson") {
    post = "Writting Person";
  } else if (user.position === "hrmanager") {
    post = "HR Manager";
  } else {
    post = "User";
  }

  let profileImg = "";
  if (user.position === "owner") {
    profileImg = ownerImg;
  } else if (user.position === "coordinator") {
    profileImg = sysadminImg;
  } else if (user.position === "tansportmanager") {
    profileImg = transportmanagerImg;
  } else if (user.position === "inventorymanager") {
    profileImg = inventorymanagerImg;
  } else if (user.position === "writtingperson") {
    profileImg = writtingpersonImg;
  } else if (user.position === "hrmanager") {
    profileImg = writtingpersonImg;
  } else {
    profileImg =
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg";
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (location.pathname === "/") {
    return null;
  }

  if (location.pathname === "/login") {
    return null;
  }

  if (location.pathname === "/signup") {
    return null;
  }

  const changepasswordfun = async () => {
    if (!newPassword || !oldPassword || !confirmPassword) {
      return toast.error("Please fill all the fields", {
        position: "top-right",
      });
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "top-right",
      });
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New Passwords are not Matching", {
        position: "top-right",
      });
    }

    try {
      const response = await axios.patch(
        "http://localhost:4000/api/user/changepassword",
        { id: user.id, oldPassword, newPassword }
      );

      if (response.status === 200) {
        toast.success("Password Reset Successfully", {
          position: "top-right",
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const redirectToSupportButton = () => {
    navigate("/supportpage");
  };

  return (
    <div className="nav">
      <div className="navbar">
        <div className="logo" onClick={toggleSidebar}>
          <img src="logo.svg" alt="" />
          <span>Chooti Putha Fish Company</span>
        </div>
        <div className="icons">
          <img
            src="/app.svg"
            alt=""
            className="icon"
            onClick={redirectToDashboard}
          />
          <button
            className="support-btn1" // Added class for styling
            onClick={redirectToSupportButton}
          >
            Support
          </button>
          <div className="notification"></div>
          <div className="user">
            <img src={profileImg} alt="" />
            <span>{post}</span>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
          {/* <img src="/setting.svg  " alt="" className="icon" /> */}
        </div>
      </div>
      {/*sidebar*/}
      {sidebarOpen && (
        <div className="nav-sidebar">
          <div className="top">
            <p>User Profile</p>
            <IoMdCloseCircleOutline onClick={toggleSidebar} />
          </div>

          <div className="side-imgname">
            <img src={profileImg} alt="" />
            <p className="pos">{post}</p>
            <p className="name">{user.name}</p>

            <div className="oldpass">
              <label htmlFor="oldpass">Old Password</label>
              <input
                type={oldPasswordStatus ? "password" : "text"}
                id="oldpass"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                value={oldPassword}
              />
              <IoEyeSharp
                className="eye"
                onClick={() => {
                  setOldPasswordStatus((prev) => !prev);
                }}
              />
            </div>
            <div className="newpass">
              <label htmlFor="newpass">New Password</label>
              <input
                type={newPasswordStatus ? "password" : "text"}
                id="newpass"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
              />
              <IoEyeSharp
                className="eye"
                onClick={() => {
                  setNewPasswordStatus((prev) => !prev);
                }}
              />
            </div>
            <div className="conpass">
              <label htmlFor="conpass">Confirm Password</label>
              <input
                type={confirmPasswordStatus ? "password" : "text"}
                id="conpass"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
              <IoEyeSharp
                className="eye"
                onClick={() => {
                  setConfirmPasswordStatus((prev) => !prev);
                }}
              />
            </div>
            <center>
              <button className="changepass-btn" onClick={changepasswordfun}>
                Change Password
              </button>
            </center>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
