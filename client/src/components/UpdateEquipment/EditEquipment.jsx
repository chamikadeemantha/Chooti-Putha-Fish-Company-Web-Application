import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../AddEquipment/AddEquipment.css";
import formimg4 from "../../backgroundimage/equipment_formimg1.jpg";
import formimg5 from "../../backgroundimage/equipment_formimg2.jpg";
import formimg6 from "../../backgroundimage/equipment_formimg3.jpg";
import toast from "react-hot-toast";

const EditEquipment = () => {
  const equipments = {
    name: '',
    quantity: '',
    relaseamount: '',
    condition: '',
    availability:'',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(equipments);
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg4, formimg5, formimg6];

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const inputChangeHandler = (e) => {
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

    setErrors(newErrors);

    if (name === 'availability') {
      setEquipment({ ...equipment, [name]: value });
    } else {
      setEquipment({ ...equipment, [name]: value });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/equipment/getoneequipment/${id}`)
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/equipment/updateequipment/${id}`, equipment
        );
        if (response.status === 200) {
          toast.success("Equipment Details Updated Successfully", {
            position: "top-right",
          });
          navigate("/equipment");
        } else {
          toast.error("Failed to Updated equipment", {
            position: "top-right",
          });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          for (const key in errorMessages) {
            if (errorMessages.hasOwnProperty(key)) {
              toast.error(errorMessages[key].message, { position: "top-right" });
            }
          }
        } else {
          toast.error("An error occurred while Updating equipment", {
            position: "top-right",
          });
          console.error("Error Updating equipment: ", error);
        }
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
            alt="equipment Image"
            className="equipment-image"
          />
        </div>
        <div className="equipmentform-container">
          <div className="equipmentheader">
            <h2 className="equipmentform-title">Update Equipment Details</h2>
          </div>
          <form className="equipmentform" onSubmit={submitForm}>
            <div className="equipmentinputGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Name of The Equipment"
                value={equipment.name}
              />
              {errors.name && (
                <span className="equipmenterror">{errors.name}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="quantity"
                name="quantity"
                autoComplete="off"
                placeholder="Quantity"
                value={equipment.quantity}
              />
              {errors.quantity && (
                <span className="equipmenterror">{errors.quantity}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="relaseamount">Release Amount</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="relaseamount"
                name="relaseamount"
                autoComplete="off"
                placeholder="Release Amount"
                value={equipment.relaseamount}
              />
              {errors.relaseamount && (
                <span className="equipmenterror">{errors.relaseamount}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="condition">Condition</label>
              <input
                type="text"
                onChange={inputChangeHandler}
                id="condition"
                name="condition"
                autoComplete="off"
                placeholder="Condition"
                value={equipment.condition}
              />
              {errors.condition && (
                <span className="equipmenterror">{errors.condition}</span>
              )}
            </div>
            <div className="equipmentinputGroup">
              <label htmlFor="Availability">Availability</label>
              <select
                id="availability"
                name="availability"
                onChange={inputChangeHandler}
                value={equipment.availability}
              >
                <option value="">Select Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="equipmentinputGroup">
              <center>
                <button type="submit" className="equipmentsubmitButton">Update Equipment</button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEquipment;