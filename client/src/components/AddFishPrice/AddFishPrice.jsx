import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/fishprice_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishprice_formimg2.jpg";
import formimg3 from "../../backgroundimage/fishprice_formimg3.jpg";
//import formimg4 from "../../backgroundimage/fishprice_formimg4.jpg";
import "./AddFishPrice.css";

const AddFishPrice = () => {
  const [fishprice, setFishPrice] = useState({
    name: "",
    fishType: "",
    species: "",
    grade: "",
    wholesale_price: "",
    retail_price: "",
    average_weight: "",
    availability: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3]; // Add more images to this array

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Mod by the total number of images
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;
  
    if (name === "name" || name === "species") {
      filteredValue = value.replace(/[^A-Za-z\s]/g, "");
      if (value !== filteredValue) {
        setErrors({ ...errors, [name]: "You can only enter string values" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "wholesale_price" || name === "retail_price" || name === "average_weight") {
      filteredValue = value.replace(/[^\d.]|(?<=\..*)\./g, ""); // Allow only digits and decimal point
      if (value !== filteredValue) {
        setErrors({ ...errors, [name]: "You can only enter numerical values" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  
    setFishPrice({ ...fishprice, [name]: filteredValue });
  };
  

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).every(key => errors[key] === "")) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/fish/createfish",
          fishprice
        );
        if (response.status === 200) {
          toast.success("Fish Details Added Successfully", {
            position: "top-right",
          });
          navigate("/fishprice");
        } else {
          toast.error("Failed to add fish price", { position: "top-right" });
        }
      } catch (error) {
        toast.error("An error occurred while adding fish price", {
          position: "top-right",
        });
        console.error("Error adding fish price: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="fishAddFishPrice">
      <div className="fishcontainer">
        <div className="fishimage-container">
          <img
            src={images[imageIndex]}
            alt="Fish Image"
            className="fish-image"
          />
        </div>
        <div className="fishform-container">
          <div className="fishheader">
            <h2 className="fishform-title">Add A New Fish</h2>
          </div>
          <form className="fishform" onSubmit={submitForm}>
            <div className="fishinputGroup">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={fishprice.name}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Name of The Fish"
              />
              {errors.name && (
                <span className="fisherror">{errors.name}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="FishType">Fish Type</label>
              <select id="fishType" name="fishType" onChange={inputHandler}>
                <option value="">Select the Fish Type</option>
                <option value="Seer">Seer</option>
                <option value="Paraw">Paraw</option>
                <option value="Tuna">Tuna</option>
                <option value="Blood Fish">Blood Fish</option>
                <option value="Sharks">Sharks</option>
                <option value="Skate">Skate</option>
                <option value="Galmalu">Rock Fish(Galmalu)</option>
                <option value="Shore Seinen">Shore Seine</option>
                <option value="Prawns">Prawns</option>
                <option value="Lobster">Lobster</option>
                <option value="Squids">Squids</option>
                <option value="Crabs">Crabs</option>
                <option value="Small Fish">Small Fish</option>
              </select>
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Species">Species</label>
              <input
                type="text"
                onChange={inputHandler}
                id="species"
                name="species"
                value={fishprice.species}
                autoComplete="off"
                placeholder="Species"
              />
              {errors.species && (
                <span className="fisherror">{errors.species}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Grade">Grade</label>
              <select id="grade" name="grade" onChange={inputHandler}>
                <option value="">Select a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="fishinputGroup">
              <label htmlFor="wholesale_price">Wholesale Price(Rs)</label>
              <input
                type="text"
                onChange={inputHandler}
                id="wholesale_price"
                name="wholesale_price"
                value={fishprice.wholesale_price}
                autoComplete="off"
                placeholder="Wholesale Price per 1kg"
              />
              {errors.wholesale_price && (
                <span className="fisherror">{errors.wholesale_price}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="retail_price">Retail Price(Rs)</label>
              <input
                type="text"
                onChange={inputHandler}
                id="retail_price"
                name="retail_price"
                value={fishprice.retail_price}
                autoComplete="off"
                placeholder="Retail Price per 1kg"
              />
              {errors.retail_price && (
                <span className="fisherror">{errors.retail_price}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="average_weight">Average Weight(Kg)</label>
              <input
                type="text"
                onChange={inputHandler}
                id="average_weight"
                name="average_weight"
                value={fishprice.average_weight}
                autoComplete="off"
                placeholder="Today Average Weight of One Fish"
              />
              {errors.average_weight && (
                <span className="fisherror">{errors.average_weight}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="availability">Today Availability</label>
              <select
                id="availability"
                name="availability"
                onChange={inputHandler}
              >
                <option value="">Today Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="fishinputGroup">
              <center>
                <button type="submit" className="fishsubmitButton">
                  ADD A Fish
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFishPrice;
