import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../AddFishPrice/AddFishPrice.css";
import formimg1 from "../../backgroundimage/fishprice_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishprice_formimg2.jpg";
import formimg3 from "../../backgroundimage/fishprice_formimg3.jpg";
import toast from "react-hot-toast";

const EditFishPrice = () => {
  const fishprices = {
    name: "",
    fishType: "",
    species: "",
    grade: "",
    wholesale_price: "",
    retail_price: "",
    average_weight: "",
    availability: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [fishprice, setFishPrice] = useState(fishprices);
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3];

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/fish/getonefish/${id}`)
      .then((response) => {
        setFishPrice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputChangeHandler = (e) => {
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
      filteredValue = value.replace(/[^\d.]|(?<=\..*)\./g, "");
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

    // Validation
    let newErrors = {};
    if (fishprice.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (fishprice.species.trim() === "") {
      newErrors.species = "Species is required";
    }
    if (fishprice.wholesale_price.trim() === "") {
      newErrors.wholesale_price = "Wholesale Price is required";
    }
    if (fishprice.retail_price.trim() === "") {
      newErrors.retail_price = "Retail Price is required";
    }
    if (fishprice.average_weight.trim() === "") {
      newErrors.average_weight = "Average Weight is required";
    }
    setErrors(newErrors);

    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/fish/updatefish/${id}`,
          fishprice
        );
        if (response.status === 200) {
          toast.success("Fish Details Updated Successfully", {
            position: "top-right",
          });
          navigate("/fishprice");
        } else {
          toast.error("Failed to Update fish price", {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("An error occurred while Updating fish price", {
          position: "top-right",
        });
        console.error("Error Updating fish price: ", error);
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
            <h2 className="fishform-title">Update Fish Details</h2>
          </div>
          <form className="fishform" onSubmit={submitForm}>
            <div className="fishinputGroup">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Name of The Fish"
                value={fishprice.name}
              />
              {errors.name && (
                <span className="fisherror">{errors.name}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="FishType">Fish Type</label>
              <select
                id="fishType"
                name="fishType"
                onChange={inputChangeHandler}
                value={fishprice.fishType}
              >
                <option value="">Select The Fish Type</option>
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
                onChange={inputChangeHandler}
                id="species"
                name="species"
                autoComplete="off"
                placeholder="Species"
                value={fishprice.species}
              />
              {errors.species && (
                <span className="fisherror">{errors.species}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Grade">Grade</label>
              <select
                id="grade"
                name="grade"
                onChange={(e) =>
                  setFishPrice({
                    ...fishprice,
                    grade: e.target.value.toUpperCase(),
                  })
                }
                value={fishprice.grade}
              >
                <option value="">Select a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="fishinputGroup">
              <label htmlFor="wholesale Price">Wholesale Price</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="wholesale_price"
                name="wholesale_price"
                autoComplete="off"
                placeholder="Wholesale Price per 1kg"
                value={fishprice.wholesale_price}
              />
              {errors.wholesale_price && (
                <span className="fisherror">{errors.wholesale_price}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Retail Price">Retail Price</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="retail_price"
                name="retail_price"
                autoComplete="off"
                placeholder="Retail Price per 1kg"
                value={fishprice.retail_price}
              />
              {errors.retail_price && (
                <span className="fisherror">{errors.retail_price}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Average Weight">Average Weight</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="average_weight"
                name="average_weight"
                autoComplete="off"
                placeholder="Today Average Weight of One Fish"
                value={fishprice.average_weight}
              />
              {errors.average_weight && (
                <span className="fisherror">{errors.average_weight}</span>
              )}
            </div>
            <div className="fishinputGroup">
              <label htmlFor="Availability">Fish Type</label>
              <select
                id="availability"
                name="availability"
                onChange={inputChangeHandler}
                value={fishprice.availability}
              >
                <option value="">Today Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="fishinputGroup">
              <center>
                <button type="submit" className="fishsubmitButton">
                  UPDATE Fish Details
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFishPrice;
