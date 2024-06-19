import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/equipment_formimg1.jpg";
import formimg2 from "../../backgroundimage/equipment_formimg2.jpg";
import formimg3 from "../../backgroundimage/equipment_formimg3.jpg";
import "./AddEquipment.css";

const AddEquipment = () => {
  const [equipment, setEquipment] = useState({
    name: "",
    quantity: "",
    relaseamount: "",
    condition: "",
    retail_price: "",
    availability: "",
  });
  const navigate = useNavigate();
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'name' && !/^[A-Za-z]+$/.test(value)) {
      newErrors.name = 'Name must include only letters';
    } else {
      delete newErrors.name;
    }

    if (name === "quantity" || name === "relaseamount") {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        newErrors[name] = "You can only Insert Positive Integer or Decimal Number";
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'availability') {
      setEquipment({ ...equipment, [name]: value });
    } else if (name !== 'name' && name !== 'condition') {
      setEquipment({ ...equipment, [name]: value.toUpperCase() });
    } else {
      setEquipment({ ...equipment, [name]: value });
    }

    setErrors(newErrors);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/equipment/addequipment",
          equipment
        );
        if (response.status === 200) {
          toast.success("Equipment Details Added Successfully", {
            position: "top-right",
          });
          navigate("/equipment");
        } else {
          toast.error("Failed to add equipment", { position: "top-right" });
        }
      } catch (error) {
        toast.error("An error occurred while adding equipment", {
          position: "top-right",
        });
        console.error("Error adding equipment: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="equipmentAddEquipment">
      <button className="equipmentback-button"><Link to={"/equipment"}>Back</Link></button>
      <div className="equipmentcontainer">
        <div className="equipmentimage-container">
          <img
            src={images[imageIndex]}
            alt="Equipment Image"
            className="equipment-image"
          />
        </div>
        <div className="equipmentform-container">
          <div className="equipmentheader">
            <h2 className="equipmentform-title"><center>Add A New Equipment</center></h2>
          </div>
          <form className="equipmentform" onSubmit={submitForm}>
            <div className="equipmentinputGroup">
              <label htmlFor="name">Equipment Name</label>
              <input
                type="text"
                onChange={inputHandler}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Name of The Equipment"
              />
              {errors.name && (
                <span className="equipmenterror">{errors.name}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="quantity">Quantity</label>
              <input type="text" onChange={inputHandler} id="quantity" name="quantity" autoComplete="off" placeholder="Quantity" />
              {errors.quantity && (
                <span className="equipmenterror">{errors.quantity}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="relaseamount">Release Amount</label>
              <input type="text" onChange={inputHandler} id="relaseamount" name="relaseamount" autoComplete="off" placeholder="Release Amount" />
              {errors.relaseamount && <span className="equipmenterror">{errors.relaseamount}</span>}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="condition">Condition</label>
              <input type="text" onChange={inputHandler} id="condition" name="condition" autoComplete="off" placeholder="Condition" />
              {errors.condition && <span className="error">{errors.condition}</span>}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="Availability">Availability</label>
              <select id="availability" name="availability" onChange={inputHandler}>
                <option value="">Select Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="equipmentinputGroup">
              <center>
                <button type="submit" className="equipmentsubmitButton">
                  Add A Equipment
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipment;
