import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import "../addvehicle/Addvehicle.css"
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/vehicle_formimg1.jpg";
import formimg2 from "../../backgroundimage/vehicle_formimg2.jpg";
import formimg3 from "../../backgroundimage/vehicle_formimg3.jpg";
import formimg4 from "../../backgroundimage/vehicle_formimg4.jpg";

const Edit = () => {

    const vehicles = {
        name:"",
        model:"",
        number_plate:"",
        driver_phone_no:"",
        fuel_type:"",
        tank_capacity:"",
        last_location:"",
        route:""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(vehicles);
    const [error, setError] = useState('null');
    const [isFormEmpty, setIsFormEmpty] = useState(true);


    const [imageIndex, setImageIndex] = useState(0);
    const images = [formimg1, formimg2, formimg3, formimg4]; // Add more images to this array

    const updateImageIndex = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Mod by the total number of images
    };

    useEffect(() => {
        const intervalId = setInterval(updateImageIndex, 3000);
        return () => clearInterval(intervalId);
      }, []);


    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setVehicle({...vehicle, [name]:value});
        console.log(vehicle)
    }

      /*validation for vehicle name*/

      const name_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        setVehicle({ ...vehicle, [name]: filteredValue });
        }

      const valname = (value, setError) => {
        const regex = /^[A-Za-z\s]+$/;

        if (!regex.test(value)) {
            // If the test fails, set an error and display the toast immediately
            setError('Invalid character');
            toast.error(value + ' is an Invalid Name!!!\nName can only contain alphabetic characters', {
              position: 'top-center',
              autoClose: 1000,
              toastId: 'invalid-name-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
          }

        // If there's no error, clear any previous error messages
        setError('');
        return true;
    };

    
    const handleInputChange = (event) => {
        const { value } = event.target;
        valname(value, setError);
    };

    /*validation for vehicle model*/

    const model_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        setVehicle({ ...vehicle, [name]: filteredValue });
    }

    const valmodel = (valuemodel, setError) => {
        
        setError('');

        if (!/^[A-Za-z\s]+$/.test(valuemodel)) {
            // If the test fails, set an error and display the toast immediately
            setError('Invalid character');
            toast.error(valuemodel + ' is an Invalid Model!!!\nModel can only contain alphabetic characters', {
              position: 'top-center',
              autoClose: 1000,
              toastId: 'invalid-model-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
          }

        // If there's no error, clear any previous error messages
        setError('');
        return true;
    };

    const handleInputChangemodel = (event) => {
        const { value } = event.target;
        valmodel(value, setError);
    };

    //validating function for Number plate

    const number_plate_inputChangeHandler = (event) => {
        const { value } = event.target;
        let filteredValue = value.toUpperCase(); // Convert to uppercase
        
        // Remove characters other than uppercase letters and digits
        filteredValue = filteredValue.replace(/[^A-Z0-9]/g, '');
    
        // Ensure the first three characters are uppercase letters
        const letters = filteredValue.slice(0, 3);
        const numbers = filteredValue.slice(3);
    
        if (/[^A-Z]/.test(letters)) {
            // If any non-letter character is entered for the first three positions, keep previous value
            filteredValue = vehicle.number_plate;
        } else {
            // Ensure the last four characters are numbers
            filteredValue = letters + numbers.replace(/\D/g, '').slice(0, 4);
        }
    
        setVehicle({ ...vehicle, number_plate: filteredValue });
    };

    const validatenumber_plate = (number_plate, setError) => {
        
        setError('');

        const letters = number_plate.slice(0, 3); // Extract the first three characters
        const numbers = number_plate.slice(3); // Extract the remaining characters

        if (!/^[A-Z]{3}$/.test(letters)) {
            setError('First two or three characters must be upper-case letters.');
            toast.error('First three characters must be upper-case letters.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-number_plate-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
        }

        if (!/^\d{4}$/.test(numbers)) {
            
              setError('Last 4 character must be digits.');
              toast.error('Last 4 character must be digits.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-number_plate-error' // Ensure a unique toastId to prevent duplicates
            });
              return false;
        }
    
        return true;
    };

    const handleInputChangenumber_plate = (event) => {
        const { value } = event.target;
        // if (!validateNIC(value, setError)) {
        //     // If validation fails, display the error message
        //     toast.error(error, { position: 'top-center' });
        // }
        validatenumber_plate(value, setError);
    };

    /*validate driver_phone_no*/ 

    const driver_phone_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        /*const filteredValue = value.replace(/^\D/g, '').slice(0,10);*/
        const filteredValue = value.replace(/[^0-9]/g, '').slice(0,10); // Allow digits only
        setVehicle({ ...vehicle, [name]: filteredValue });
    }

    const validatedriver_phone_no = (driver_phone_no, setError) => {
        
        setError('');

        if (driver_phone_no.length <= 10 && !/^\d+$/.test(driver_phone_no.slice(0,10))) {
            setError('Contact number must be 10 digits.');
            toast.error('Contact number must be 10 digits.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-Contact-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
        }

        if (driver_phone_no.length > 10) {
            setError('contact Number can only contain 10 numbers.');
            toast.error('contact Number can only contain 10 numbers.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-ContactLength-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
        }

        return true;
    }

    const handleInputChangedriver_phone_no = (event) => {
        const { value } = event.target;
        validatedriver_phone_no(value, setError);
    };
    

    /*validation for tank capacity*/

    const tank_capacity_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^0-9.]/g, ''); // Allow digits and '.' only
        setVehicle({ ...vehicle, [name]: filteredValue });
    }

    const validatetank_capacity = (tank_capacity) => {
        
        if (!/^\d+(\.\d+)?$/.test(tank_capacity)) {
            toast.error(tank_capacity + ' is an Invalid !Tank capacity!!\nTank capacity can contain numbers only', {
              position: 'top-center',
              autoClose: 1000,
              toastId: 'invalid-tank_capacity-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
          }
        return true;
    };

    const handleInputChangetank_capacity = (event) => {
        const { value } = event.target;
        validatetank_capacity(value, setError);
    };

    /*validation for last location*/

    const last_location_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^A-Za-z]/g, '');
        setVehicle({ ...vehicle, [name]: filteredValue });
    }

    const validatelast_location = (last_location, setError) => {
        // Regular expression to match only alphabetic characters
        
        if (!/^[A-Za-z]+$/.test(last_location)) {
            // If the test fails, set an error and display the toast immediately
            setError('Invalid character');
            toast.error(last_location + ' is an Invalid !Last Location!!\nLast Location can contain letters only', {
              position: 'top-center',
              autoClose: 1000,
              toastId: 'invalid-last_location-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
          }

        // If there's no error, clear any previous error messages
        setError('');
        return true;
    };

    
    const handleInputChangelast_location = (event) => {
        const { value } = event.target;
        validatelast_location(value, setError);
    };

    /*validation for route*/

    const route_inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^A-Za-z0-9\s]/g, '');
        setVehicle({ ...vehicle, [name]: filteredValue });
    }

    const validateroute = (route, setError) => {
        // Regular expression to match only alphabetic characters
        
        if (!/^[A-Za-z0-9 ]+$/.test(route)) {
            // If the test fails, set an error and display the toast immediately
            setError('Invalid character');
            toast.error(route + ' is an Invalid !Route!!\nRoute should contain only alphabetic characters and numbers', {
              position: 'top-center',
              autoClose: 1000,
              toastId: 'invalid-route-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
          }

        // If there's no error, clear any previous error messages
        setError('');
        return true;
    };

    
    const handleInputChangeroute = (event) => {
        const { value } = event.target;
        validateroute(value, setError);
    }; 

    useEffect(()=>{
        axios.get('http://localhost:4000/api/vehicle/getonevehicle/'+id)
        .then((response)=>{
            setVehicle(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();

        if (isFormEmpty) {
            toast.error('Please fill all fields before submitting.', { position: 'top-center' });
            return;
        }

        /*check name*/
        const regex = /^[A-Za-z\s]+$/;
        if(!regex.test(vehicle.name)){
            toast.error(vehicle.name + ' is an Invalid Name!!!\nName can only contain alphabetic characters', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-name-error'
            })
            return;
        }
        
        /*check model*/
        if(!/^[A-Za-z\s]+$/.test(vehicle.model)){
            toast.error(vehicle.model + ' is an Invalid Model!!!\nModel can only contain alphabetic characters', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-model-error'
            })
            return;
        }

        /*check number plate*/
        if(vehicle.number_plate.length < 6 || vehicle.number_plate.length > 7){
            toast.error("Number plate must be 7 characters long.", {position: "top-center"})
            return;
        }

        const letters = vehicle.number_plate.slice(0, 3);
        const numbers = vehicle.number_plate.slice(3);

        if (!/^[A-Z]{3}$/.test(letters)) {
            toast.error('First three characters must be upper-case letters.', {
                position: 'top-center'});
            return ;
        }

        if (!/^\d{4}$/.test(numbers)) {
              toast.error('Last 4 character must be digits.', {
                position: 'top-center'});
              return ;
        }

        /*contact number check*/
        if(vehicle.driver_phone_no.length !== 10){
            toast.error("contact Number should contain 10 digits.", {position: "top-center"})
            return;
        }

        if (!/^\d+$/.test(vehicle.driver_phone_no)) {
            toast.error('contact Number must be digits.', {position: 'top-center'});
            return;
        }

        if(vehicle.availability === ""){
            toast.error('Select the Availability.', {position: 'top-center'});
            return;
        }

        /*if(! valfuel_type(vehicle.fuel_type)) {
            toast.error('fuel type should contain only alphabetic characters.',{position: 'top-center'});
            return;
        }*/

        /*tank capacity checks*/
        if(!/^\d+(\.\d+)?$/.test(vehicle.tank_capacity)){
            toast.error(vehicle.tank_capacity + ' is an Invalid !Tank capacity!!\nTank capacity can contain numbers only', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-tank_capacity-error'
            })
            return;
        }

        /*last location checks*/
        if(!/^[A-Za-z]+$/.test(vehicle.last_location)){
            toast.error(vehicle.last_location + ' is an Invalid !Last Location!!\nLast Location can contain numbers only', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-last_location-error'
            })
            return;
        }

        /*route checks*/
        if(!/^[A-Za-z0-9 ]+$/.test(vehicle.route)){
            toast.error(vehicle.route + ' is an Invalid !Route!!\nRoute should contain only alphabetic characters and numbers', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-route-error'
            })
            return;
        }

        await axios.put('http://localhost:4000/api/vehicle/updatevehicle/'+id, vehicle)
        .then((response)=>{
            toast.success(response.data.msg, {position: "top-right"})
            navigate("/vehiclemanagement")
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        // Check if all fields are empty
        const checkFormEmpty = () => {
          for (const key in vehicle) {
            if (typeof vehicle[key] !=='') {
              setIsFormEmpty(false);
              return;
            }
          }
          setIsFormEmpty(true);
        };
    
        checkFormEmpty();
      }, [vehicle]);

    return (
        <div className="addvehicle">
            <div className="vehicle_container">
                <div className="vehicle_image-container">
                
                    <img
                        src={images[imageIndex]}
                        alt="vehicle Image"
                        className="vehicle_vehicle-image"
                    />
            
                </div>
                <div className="vehicle_form-container">
                    
                    <div className="vehicle_header">
                        <h2 className="vehicle_form-title">Update Vehicle Details</h2>
                    </div>

                    <form className="addvehicleForm" onSubmit={submitForm}>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="name">Name</label><br></br>
                            <input type="text" value={vehicle.name} onChange={(event) => {name_inputChangeHandler(event); handleInputChange(event);}} id="name" name="name" autoComplete='off' placeholder="Enter name"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="model">Model</label><br></br>
                            <input type="text" value={vehicle.model} onChange={(event) => {model_inputChangeHandler(event); handleInputChangemodel(event);}} id="model" name="model" autoComplete='off' placeholder="Enter model"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="number_plate">Number Plate No</label><br></br>
                            <input type="text" value={vehicle.number_plate} onChange={(event) => {number_plate_inputChangeHandler(event); handleInputChangenumber_plate(event);}} id="number_plate" name="number_plate" autoComplete='off' placeholder="Enter number plate no"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="driver_phone_no">Driver's Phone No</label><br></br>
                            <input type="text" value={vehicle.driver_phone_no} onChange={(event) => {driver_phone_inputChangeHandler(event); handleInputChangedriver_phone_no(event);}} id="driver_phone_no" name="driver_phone_no" autoComplete='off' placeholder="Enter driver phone no"/>
                        </div>
                

                        <div className="vehicle_inputGroup">
                            <label htmlFor="fuel_type">Fuel Type</label><br></br>
                            <div className="vehicleradioContainer">
                                <div>
                                    <input type="radio" id="petrol" name="fuel_type" value="Petrol" onChange={inputChangeHandler} />
                                    <label htmlFor="petrol">Petrol</label>
                                </div>

                                <div>
                                    <input type="radio" id="diesel" name="fuel_type" value="Diesel" onChange={inputChangeHandler} />
                                    <label htmlFor="diesel">Diesel</label>
                                </div>
                            </div>
                        </div>

                        <div className="vehicle_inputGroup">
                            <label htmlFor="tank_capacity">Tank Capacity(L)</label><br></br>
                            <input type="text" value={vehicle.tank_capacity} onChange={(event) => {tank_capacity_inputChangeHandler(event); handleInputChangetank_capacity(event);}} id="tank_capacity" name="tank_capacity" autoComplete='off' placeholder="Enter tank capacity"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="last_location">Last location</label><br></br>
                            <input type="text" value={vehicle.last_location} onChange={(event) => {last_location_inputChangeHandler(event); handleInputChangelast_location(event);}} id="last_location" name="last_location" autoComplete='off' placeholder="Enter last location"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <label htmlFor="route">Route</label><br></br>
                            <input type="text" value={vehicle.route} onChange={(event) => {route_inputChangeHandler(event); handleInputChangeroute(event);}} id="route" name="route" autoComplete='off' placeholder="Enter route"/>
                        </div>
                        <div className="vehicle_inputGroup">
                            <center>
                            <button type="submit" className='vehicle_submitButton'>Update Vehicle Details</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit