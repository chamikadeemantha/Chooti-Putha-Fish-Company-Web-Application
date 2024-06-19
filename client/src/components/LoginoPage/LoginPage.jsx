import React from "react";
import "./LoginPage.css";
import logo from "../../backgroundimage/logo.jpg";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [passowrdStatus, setPassowrdStatus] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEye = () => {
    setPassowrdStatus((prev) => !prev);
  };

  const handleNewAcc = () => {
    navigate("/signup");
  };

  const login = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
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

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/loginuser",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        toast.success("Login Successfully", {
          position: "top-right",
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "User does not exist") {
        toast.error("User does not exist", {
          position: "top-right",
        });
        setPasswordError(false);
        return setEmailError(true);
      }

      setEmailError(false);

      if (error.response.data.message === "Invalid Credentials") {
        toast.error("Invalid Credentials", {
          position: "top-right",
        });
        return setPasswordError(true);
      }
      setPasswordError(false);
    }
  };

  return (
    <div className="loginpage">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="right-middle">
          <div className="login-logo">
            <img src={logo} alt="" className="login-img" />
            <p className="logo-name">Chooti Putha Fish Company</p>
          </div>

          <form className="login-form">
            <div className="log-email">
              <label htmlFor="login-email">User Email</label>
              <input
                id="login-email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? "email-error" : ""}
              />
            </div>
            <div className="log-pass">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type={passowrdStatus ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordError ? "password-error" : ""}
              />
              <IoEyeSharp className="eye" onClick={handleEye} />
            </div>
            <div className="login-text">
              <p className="forget">Forget password</p>
              <p className="haveacc" onClick={handleNewAcc}>
                Create a new account
              </p>
            </div>
            <button onClick={login}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
