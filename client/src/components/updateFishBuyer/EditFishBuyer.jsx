import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import formimg5 from "../../backgroundimage/fishbuyer_formimg5.jpg";
import formimg6 from "../../backgroundimage/fishbuyer_formimg6.jpg";
import formimg9 from "../../backgroundimage/fishbuyer_formimg9.jpg";

const EditFishBuyer = () => {
  const [fishbuyer, setFishBuyer] = useState({
    name: '',
    contact_number: '',
    last_payment_option: 'Creditor',
    last_payment: '',
    last_buy_quantity: '',
    total_payment: '',
    arrear: '',
    last_purchase_date: '',
  });

  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg5, formimg6, formimg9];

  const { id } = useParams();
  const navigate = useNavigate();

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/buyer/getonebuyer/${id}`)
      .then((response) => {
        setFishBuyer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    let filteredValue = value;

    switch (name) {
      case 'name':
        filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        break;
      case 'contact_number':
        filteredValue = value.replace(/\D/g, '').slice(0, 10);
        break;
      case 'last_payment':
      case 'total_payment':
      case 'last_buy_quantity':
      case 'arrear':
        filteredValue = value.replace(/\D/g, '');
        break;
      default:
        break;
    }

    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.name = 'Name must include only letters';
    } else {
      delete newErrors.name;
    }

    if (name === 'contact_number') {
      if (!/^\d{10}$/.test(filteredValue)) {
        newErrors.contact_number = 'Contact number must be 10 digits';
      } else {
        delete newErrors.contact_number;
      }
    }

    if (['last_payment', 'total_payment', 'last_buy_quantity', 'arrear'].includes(name)) {
      if (!/^\d+(\.\d+)?$/.test(filteredValue)) {
        newErrors[name] = 'You can only insert Positive Integer or Decimal Number';
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
    setFishBuyer((prevFishBuyer) => ({
      ...prevFishBuyer,
      [name]: filteredValue,
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
    if (Object.values(errors).every((error) => !error)) {
      try {
        let updatedFishBuyer = { ...fishbuyer };

        if (updatedFishBuyer.last_payment_option === 'Creditor') {
          updatedFishBuyer.total_payment = parseFloat(updatedFishBuyer.total_payment) + parseFloat(updatedFishBuyer.last_payment);
        } else if (updatedFishBuyer.last_payment_option === 'Debtor') {
          updatedFishBuyer.arrear = parseFloat(updatedFishBuyer.arrear) + parseFloat(updatedFishBuyer.last_payment);
        }

        const response = await axios.put(`http://localhost:4000/api/buyer/updatebuyer/${id}`, updatedFishBuyer);
        if (response.status === 200) {
          toast.success("Fish Buyer Details Updated Successfully", { position: "top-right" });
          navigate("/fishbuyer");
        } else {
          toast.error("Failed to Update fish Buyer Details", { position: "top-right" });
        }
      } catch (error) {
        toast.error("An error occurred while updating fish buyer", { position: "top-right" });
        console.error("Error updating fish buyer: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", { position: "top-right" });
    }
  };

  const resetArrear = () => {
    setFishBuyer({ ...fishbuyer, arrear: 0 });
  };

  return (
    <div className='fishbuyerAddFishBuyer'>
      <button className="fishbuyerback-button"><Link to={"/fishbuyer"} >Back</Link></button>
      <div className="fishbuyercontainer">
        <div className="fishbuyerimage-container">
          <img src={images[imageIndex]} alt="" className="fishbuyer-image" />
        </div>
        <div className="fishbuyerform-container">
          <div className="fishbuyerheader">
            <h1 className="fishbuyerform-title">Update Fish Buyer Details</h1>
          </div>
          <form className='fishbuyerAddFishBuyer' onSubmit={submitForm}>
            <div className="fishbuyerinputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" onChange={inputChangeHandler} id="name" name="name" autoComplete='off' placeholder='Name' value={fishbuyer.name} />
              {errors.name && <span className="fishbuyererror" style={{ color: "red" }}>{errors.name}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="contact_number">Contact Number</label>
              <input type="text" onChange={inputChangeHandler} id="contact_number" name="contact_number" autoComplete='off' placeholder='Contact Number' value={fishbuyer.contact_number} />
              {errors.contact_number && <span className="fishbuyererror" style={{ color: "red" }}>{errors.contact_number}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_payment_option">Last Payment Option</label>
              <select id="last_payment_option" name="last_payment_option" onChange={inputChangeHandler} value={fishbuyer.last_payment_option}>
                <option value="Creditor">Creditor</option>
                <option value="Debtor">Debtor</option>
              </select>
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_payment">Last Payment</label>
              <input type="text" onChange={inputChangeHandler} id="last_payment" name="last_payment" autoComplete='off' placeholder='Last Payment(LKR)' value={fishbuyer.last_payment} />
              {errors.last_payment && <span className="fishbuyererror" style={{ color: "red" }}>{errors.last_payment}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_buy_quantity">Last Buy Quantity</label>
              <input type="text" onChange={inputChangeHandler} id="last_buy_quantity" name="last_buy_quantity" autoComplete='off' placeholder='Last Buy Quantity(kg)' value={fishbuyer.last_buy_quantity} />
              {errors.last_buy_quantity && <span className="fishbuyererror" style={{ color: "red" }}>{errors.last_buy_quantity}</span>}
            </div>
            <div className="fishbuyerinputGroup">
              <label htmlFor="last_purchase_date">Last Purchase Date</label>
              <input
                type="date"
                onChange={handleDateInput}
                id="last_purchase_date"
                name="last_purchase_date"
                autoComplete="off"
                placeholder="Last Purchase Date"
                value={fishbuyer.last_purchase_date}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="fishbuyerinputGroup">
              <button type="button" onClick={resetArrear} className="reset-arrear-button">Reset Arrear</button>
            </div>
            <div className="fishbuyerinputGroup">
              <button type="submit" className="submitfishbuyersubmitButton">UPDATE FISH BUYER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFishBuyer;
