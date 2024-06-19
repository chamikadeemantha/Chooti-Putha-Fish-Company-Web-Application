import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./AddFishBuyer.css";
import toast from 'react-hot-toast';
import formimg1 from "../../backgroundimage/fishbuyer_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishbuyer_formimg2.jpg";
import formimg3 from "../../backgroundimage/fishbuyer_formimg3.jpg";

const AddFishBuyer = () => {
  const [fishbuyer, setFishBuyer] = useState({
    name: "",
    contact_number: "",
    last_payment_option: "Creditor",
    last_payment: "",
    last_buy_quantity: "",
    total_payment: "",
    arrear: "",
    last_purchase_date: "",
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
    let filteredValue = value;

    // Filter only letters for name
    if (name === 'name') {
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        if (!/^[A-Za-z\s]+$/.test(filteredValue)) {
        newErrors.name = 'Name must contain only letters and spaces';
      } else {
        delete newErrors.name;
      }
      
    }

    // Filter only digits for numeric inputs
    if (['contact_number', 'last_payment', 'total_payment', 'last_buy_quantity', 'arrear'].includes(name)) {
      filteredValue = value.replace(/\D/g, '');
    }

    setFishBuyer({ ...fishbuyer, [name]: filteredValue });

    // Validation for contact number length
    if (name === 'contact_number') {
      if (filteredValue.length > 10) {
        newErrors[name] = 'Contact number must be 10 digits';
      } else {
        delete newErrors[name];
      }

      
    }

    // Validation for numeric inputs
    if (['last_payment', 'total_payment', 'last_buy_quantity', 'arrear'].includes(name)) {
      if (!/^\d+(\.\d+)?$/.test(filteredValue)) {
        newErrors[name] = "Please enter a valid positive number";
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };

  const handleContactNumberInput = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/\D/g, '').slice(0, 10);
    setFishBuyer((prevState) => ({
      ...prevState,
      contact_number: filteredValue,
    }));
  };

  const handleDateInput = (e) => {
    const { value } = e.target;
    const today = new Date().toISOString().split('T')[0];
    if (value > today) {
      setFishBuyer((prevState) => ({
        ...prevState,
        last_purchase_date: today,
      }));
    } else {
      setFishBuyer((prevState) => ({
        ...prevState,
        last_purchase_date: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:4000/api/buyer/createbuyer", fishbuyer);
        if (response.status === 200) {
          toast.success("Fish Buyer Details Added Successfully", { position: "top-right" });
          navigate("/fishbuyer");
        } else {
          toast.error("Failed to add fish buyer", { position: "top-right" });
        }
      } catch (error) {
        toast.error("An error occurred while adding fish buyer", { position: "top-right" });
        console.error("Error adding fish buyer: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", { position: "top-right" });
    }
  };

  return (
    <div className="fishbuyerAddFishBuyer">
      <button className="fishbuyerback-button"><Link to={"/fishbuyer"} >Back</Link></button>
      <div className="fishbuyercontainer">
        <div className="fishbuyerimage-container">
          <img
            src={images[imageIndex]}
            alt=""
            className="fishbuyer-image"
          />
        </div>
        <div className="fishbuyerform-container">
          <div className="fishbuyerheader">
            <h1>Add A New Fish Buyer</h1>
          </div>
          <form className="fishbuyerAddFishBuyerform" onSubmit={submitForm}>
              <div className="fishbuyerinputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" onChange={inputHandler} id="name" name="name" autoComplete="off" value={fishbuyer.name} placeholder="Name of The Fish Buyer" />
              {errors.name && <span className="fishbuyererror">{errors.name}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="contact_number">Contact Number</label>
              <input type="text" onChange={handleContactNumberInput} id="contact_number" name="contact_number" autoComplete="off" placeholder="Contact Number" value={fishbuyer.contact_number} maxLength={10} />
              {errors.contact_number && <span className="fishbuyererror">{errors.contact_number}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_payment_option">Last Payment Option</label>
              <select id="last_payment_option" name="last_payment_option" onChange={inputHandler} value={fishbuyer.last_payment_option}>
                <option value="Creditor">Creditor</option>
                <option value="Debtor">Debtor</option>
              </select>
              {errors.last_payment_option && <span className="fishbuyererror">{errors.last_payment_option}</span>}
            </div>
            {/* ... rest of the code ... */}
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_payment">Last Payment</label>
              <input type="text" onChange={inputHandler} id="last_payment" name="last_payment" autoComplete="off" placeholder="Last Payment(LKR)" value={fishbuyer.last_payment} />
              {errors.last_payment && <span className="fishbuyererror">{errors.last_payment}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_buy_quantity">Last Buy Quantity</label>
              <input type="text" onChange={inputHandler} id="last_buy_quantity" name="last_buy_quantity" autoComplete="off" placeholder="Last Buy Quantity(kg)" value={fishbuyer.last_buy_quantity} />
              {errors.last_buy_quantity && <span className="fishbuyererror">{errors.last_buy_quantity}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="total_payment">Total Payment</label>
              <input type="text" onChange={inputHandler} id="total_payment" name="total_payment" autoComplete="off" placeholder="Total Payment(LKR)" value={fishbuyer.total_payment} />
              {errors.total_payment && <span className="fishbuyererror">{errors.total_payment}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="arrear">Arrear</label>
              <input type="text" onChange={inputHandler} id="arrear" name="arrear" autoComplete="off" placeholder="Arrear(LKR)" value={fishbuyer.arrear} />
              {errors.arrear && <span className="fishbuyererror">{errors.arrear}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_purchase_date">Last Purchase Date</label>
              <input type="date" onChange={handleDateInput} id="last_purchase_date" name="last_purchase_date" autoComplete="off" placeholder="(DD/MM/YYYY)" value={fishbuyer.last_purchase_date} max={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="fishbuyerinputGroup">
              <button type="submit" className="submitfishbuyersubmitButton">Add A Fish Buyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFishBuyer;