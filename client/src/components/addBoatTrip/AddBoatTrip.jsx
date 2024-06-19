import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../addBoatTrip/AddBoatTrip.css";
import formimg1 from "../../backgroundimage/boattrip1.jpg";
import formimg2 from "../../backgroundimage/boattrip2.jpg";
import formimg3 from "../../backgroundimage/boattrip3.jpg";

const AddBoatTrip = () => {
  const initialBoatTripState = {
    tripID: "",
    boatName: "",
    tripType: "",
    noOfEmployees: "",
    fishingCaught: "",
    costAvg: "",
    profitAvg: ""
  };

  const [boatTrip, setBoatTrip] = useState(initialBoatTripState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3];

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    
    
    if (name === 'boatName') {
      const filteredValue = value.replace(/[^\w\s]/gi, '');// Remove numeric characters
      setBoatTrip({
        ...boatTrip,
        [name]: filteredValue
      });
    } else {
      setBoatTrip({
        ...boatTrip,
        [name]: value
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/boattrip/createboattrip",
        boatTrip
      );
      if (response.status === 200) {
        toast.success("Boat trip added successfully", { position: "top-right" });
        navigate("/");
      } else {
        toast.error("Failed to add boat trip", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add boat trip", { position: "top-right" });
    }
  };

  const validateForm = () => {
    const errors = {};

    for (const key in boatTrip) {
      if (!boatTrip[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    if (parseInt(boatTrip.noOfEmployees) <= 5 || parseInt(boatTrip.noOfEmployees) >= 15) {
      errors.noOfEmployees = "Number of employees must be between 1 and 14";
    }

    if (parseInt(boatTrip.fishingCaught) <= 2400) {
      errors.fishingCaught = "Fishing caught must be greater than 2400 Kg";
    }

    if (parseInt(boatTrip.costAvg) <= 0) {
      errors.costAvg = "Cost must be greater than 0";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="AddBoatTrip">
      <div className="container">
        <div className="image-container">
          <img
            src={images[imageIndex]}
            alt="Boat Image"
            className="boat-image"
          />
        </div>
        <div className="form-container">
          <div className="header">
            <h2 className="form-title">Add New Boat Trip</h2>
          </div>
          <form className="form" onSubmit={submitForm}>
            <div className="inputGroup">
              <label htmlFor="tripID">Trip ID</label>
              <input
                type="number"
                onChange={inputHandler}
                value={boatTrip.tripID}
                id="tripID"
                name="tripID"
                autoComplete="off"
                placeholder="Trip ID"
              />
              {errors.tripID && <span className="error">{errors.tripID}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="boatName">Boat Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={boatTrip.boatName}
                id="boatName"
                name="boatName"
                autoComplete="off"
                placeholder="Boat Name"
              />
              {errors.boatName && <span className="error">{errors.boatName}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="tripType">Trip Type</label>
              <select
                id="tripType"
                name="tripType"
                onChange={inputHandler}
                value={boatTrip.tripType}
              >
                <option value="">Select Trip Type</option>
                <option value="one_day">One Day</option>
                <option value="one_week">One Week</option>
                <option value="One_month">One Month</option>
              </select>
              {errors.tripType && <span className="error">{errors.tripType}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="noOfEmployees">No Of Employees Joining</label>
              <input
                type="number"
                onChange={inputHandler}
                value={boatTrip.noOfEmployees}
                id="noOfEmployees"
                name="noOfEmployees"
                autoComplete="off"
                placeholder="No Of Employees Joining"
              />
              {errors.noOfEmployees && <span className="error">{errors.noOfEmployees}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="fishingCaught">Fishing Caught(Kg)</label>
              <input
                type="number"
                onChange={inputHandler}
                value={boatTrip.fishingCaught}
                id="fishingCaught"
                name="fishingCaught"
                autoComplete="off"
                placeholder="Fishing Caught(Kg)"
              />
              {errors.fishingCaught && <span className="error">{errors.fishingCaught}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="costAvg">Cost Avg (Rs)</label>
              <input
                type="number"
                onChange={inputHandler}
                value={boatTrip.costAvg}
                id="costAvg"
                name="costAvg"
                autoComplete="off"
                placeholder="Rupees"
              />
              {errors.costAvg && <span className="error">{errors.costAvg}</span>}
            </div>
            <div className="inputGroup">
              <label htmlFor="profitAvg">Profit Avg(Rs)</label>
              <input
                type="number"
                onChange={inputHandler}
                value={boatTrip.profitAvg}
                id="profitAvg"
                name="profitAvg"
                autoComplete="off"
                placeholder="Rupees"
              />
              {errors.profitAvg && <span className="error">{errors.profitAvg}</span>}
            </div>
            <div className="inputGroup">
              <center>
                <button type="submit" className="submitButton">
                  Add Trip
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBoatTrip;
