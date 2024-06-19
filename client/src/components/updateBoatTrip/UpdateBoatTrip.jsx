import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../addBoatTrip/AddBoatTrip.css";
import formimg1 from "../../backgroundimage/boattrip1.jpg";
import formimg2 from "../../backgroundimage/boattrip2.jpg";
import formimg3 from "../../backgroundimage/boattrip3.jpg";

const UpdateBoatTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3];

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    fetchBoatTrip();
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchBoatTrip = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/boattrip/getoneboattrip/${id}`);
      if (response.status === 200) {
        setBoatTrip(response.data);
      } else {
        toast.error("Failed to fetch boat trip", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch boat trip", { position: "top-right" });
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBoatTrip({
      ...boatTrip,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/boattrip/updateboattrip/${id}`,
        boatTrip
      );
      if (response.status === 200) {
        toast.success("Boat trip updated successfully", { position: "top-right" });
        navigate("/boattrip");
      } else {
        toast.error("Failed to update boat trip", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update boat trip", { position: "top-right" });
    }
  };

  return (
    <div className="boatAddBoatTrip">
      <div className="boatcontainer">
        <div className="boatimage-container">
          <img
            src={images[imageIndex]}
            alt="Boat Image"
            className="boatboat-image"
          />
        </div>
        <div className="boatform-container">
          <div className="boatheader">
            <h2 className="boatform-title">Update Boat Trip</h2>
          </div>
          <form className="boatform" onSubmit={submitForm}>
            <div className="boatinputGroup">
              <label htmlFor="tripID">Trip ID</label>
              <input
                type="text"
                readOnly // Make the input readonly
                value={boatTrip.tripID}
                id="tripID"
                name="tripID"
                autoComplete="off"
                placeholder="Trip ID"
              />
            </div>
            <div className="boatinputGroup">
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
            </div>
            <div className="boatinputGroup">
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
                <option value="two_weeks">Two Week</option>
              </select>
            </div>
            <div className="boatinputGroup">
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
            </div>
            <div className="boatinputGroup">
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
            </div>
            <div className="boatinputGroup">
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
            </div>
            <div className="boatinputGroup">
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
            </div>
            <div className="boatinputGroup">
              <center>
              <button type="submit" className="boatsubmitButton">
                Update Trip
              </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBoatTrip;
