import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import "../addfishermen/add.css"
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/fishermenProfile_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishermenProfile_formimg2.png";
import formimg3 from "../../backgroundimage/fishermenProfile_formimg3.jpg";

const Editfishermen = () => {

    const fishermens = {
        name:"",
        age:"",
        nic:"",
        // email:"",
        address:"",
        experience:"",
        trip:"",
        contact_number:"",
        availability:"",
        salary:""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [fishermen, setFishermen] = useState(fishermens);
    const [error, setError] = useState('');
    const [isFormEmpty, setIsFormEmpty] = useState(true);
    const [imageIndex, setImageIndex] = useState(0);
    const images = [formimg1, formimg2, formimg3];

    const updateImageIndex = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Mod by the total number of images
      };

      useEffect(() => {
        const intervalId = setInterval(updateImageIndex, 3000);
        return () => clearInterval(intervalId);
      }, []);

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setFishermen({...fishermen, [name]:value});
    }

    const nameinputHandler = (e) => {
        const {name, value} = e.target;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const expinputHandler = (e) => {
        const { name, value } = e.target;
        // Replace any characters that are not digits with an empty string
        const filteredValue = value.replace(/\D/g, '').slice(0, 2);
        // Update state with the filtered value
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const ageinputHandler = (e) => {
        const { name, value } = e.target;
        // Allow only digits and limit the input to 2 characters
        const filteredValue = value.replace(/\D/g, '').slice(0, 2);
        // Update state with the filtered value
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const nicInputHandler = (e) => {
        const { name, value } = e.target;
    
        let filteredValue = value.replace(/[^0-9xXvV]/g, '');
    
        // If the length of the NIC is less than 10, keep it as is
        if (filteredValue.length < 10) {
            // Do nothing, keep the current value
        } else if (filteredValue.length === 10) {
            // If the length is 10 and the 10th character is not 'X' or 'V', append 02 digits
            if (!/^[xXvV]$/.test(filteredValue.charAt(9))) {
                // filteredValue += '00';
            }
        } else if (filteredValue.length > 12) {
            // If the length exceeds 12, truncate the value
            filteredValue = filteredValue.slice(0, 12);
        }
    
        // Update state with the filtered value
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const contactinputHandler = (e) => {
        const { name, value } = e.target;
        // Allow only digits and limit the input to 10 characters
        const filteredValue = value.replace(/\D/g, '').slice(0, 10);
        setFishermen({ ...fishermen, [name]: filteredValue });
    }


    const validateName = (value, setError) => {
        // Regular expression to match only alphabetic characters
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
        validateName(value, setError);
    };

    //validating function for NIC
    const validateNIC = (nic, setError) => {
        setError('');
    
        // Check if NIC has reached at least 10 characters before displaying length-related error messages
        if (nic.length >= 10) {
            const firstNineDigits = nic.slice(0, 9);
            if (!/^\d+$/.test(firstNineDigits)) {
                setError('First nine characters must be digits.');
                toast.error('First nine characters must be digits.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-nicFirstNine-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
            }
    
            // Check the 10th character
            const tenthCharacter = nic.charAt(9).toLowerCase();
            if (tenthCharacter === 'x' || tenthCharacter === 'v') {
                // If 10th character is 'X' or 'V', NIC length should be 10
                if (nic.length !== 10) {
                    setError('If old version of NIC, 10th character must be X or V.');
                    toast.error('If old version of NIC, 10th character must be X or V.', {
                        position: 'top-center',
                        autoClose: 1000,
                        toastId: 'invalid-nicLength-error' // Ensure a unique toastId to prevent duplicates
                    });
                    return false;
                }
            } else {
                // If 10th character is a number
                if (nic.length === 10 && !/^\d+$/.test(nic.charAt(9))) {
                    setError('If old version of NIC, 10th character must be X or V.');
                    toast.error('If old version of NIC, 10th character must be X or V.', {
                        position: 'top-center',
                        autoClose: 1000,
                        toastId: 'invalid-nicLength-error' // Ensure a unique toastId to prevent duplicates
                    });
                    return false;
                } else if (nic.length > 12) {
                    setError('New NIC should contain 12 digits.');
                    toast.error('New NIC should contain 12 digits.', {
                        position: 'top-center',
                        autoClose: 1000,
                        toastId: 'invalid-nic12Length-error' // Ensure a unique toastId to prevent duplicates
                    });
                    return false;
                } else if (!/^\d+$/.test(nic)) {
                    setError('New NIC should contain digits only.');
                    toast.error('New NIC should contain digits only.', {
                        position: 'top-center',
                        autoClose: 1000,
                        toastId: 'invalid-nicDigits-error' // Ensure a unique toastId to prevent duplicates
                    });
                    return false;
                }
            }
        }
    
        return true;
    }

    const handleInputChangeNIC = (event) => {
        const { value } = event.target;
        validateNIC(value, setError);
    };
    
    const validateExperience = (experience, setError) => {
        setError('');
        
            if (!/^\d+$/.test(experience)) {
                setError('Experience must be digits.');
                toast.error('\''+experience+'\''+' is an invalid character'+'\nExperience must be digits.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-Experiencedigitdd-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
            }
            
            const experienceNumber = parseInt(experience);
            if (experienceNumber <= 2) {
                setError('Experience must be greater than 2 years.');
                toast.error('Experience must be greater than 2 years.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-Experience-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
            }


        // Check if the experience has reached at least 2 digits before displaying length-related error messages
        // if (experience.length > 2) {
        //     // Convert the input to a number
        //     const experienceNumber = parseInt(experience);
    
        //     // Check if the input is a number
        //     // if (isNaN(experienceNumber)) {
        //     //     setError('Experience must be digits.');
        //     //     toast.error('Experience must be digits.', {
        //     //         position: 'top-center',
        //     //         autoClose: 1000,
        //     //         toastId: 'invalid-Experiencedigit-error' // Ensure a unique toastId to prevent duplicates
        //     //     });
        //     //     return false;
        //     // }
    
        //     // Check if the experience is greater than 2 years
        //     // if (experienceNumber <= 2) {
        //     //     setError('Experience must be greater than 2 years.');
        //     //     toast.error('Experience must be greater than 2 years.', {
        //     //         position: 'top-center',
        //     //         autoClose: 1000,
        //     //         toastId: 'invalid-Experience-error' // Ensure a unique toastId to prevent duplicates
        //     //     });
        //     //     return false;
        //     // }
        // }
    
        // If the function hasn't returned false by now, it means the input is valid
        return true;
    };
    
    const handleInputChangeExp = (event) => {
        const { value } = event.target;
        validateExperience(value, setError);
    };

    const validateContactNumber = (contactNumber, setError) => {
        setError('');
    
        // Check if the contact number has reached at least 10 characters before displaying length-related error messages
        if (contactNumber.length >= 10) {
            // Ensure the contact number has exactly 10 digits
            if (contactNumber.length !== 10 || !/^\d+$/.test(contactNumber)) {
                setError('Contact number must be exactly 10 digits.');
                toast.error('Contact number must be exactly 10 digits.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-Contact-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
            }
        }

        if(!/^\d+$/.test(contactNumber)){
            setError(+contactNumber+'  is an invalid contact number.');
                toast.error('\''+contactNumber+'\''+'  is an invalid contact number.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-Contact-charac-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
        }
    
        return true;
    }

    const handleInputChangeContact = (event) => {
        const { value } = event.target;
        validateContactNumber(value, setError);
    };

    const validateAge = (age, setError) => {
        // Clear any previous error messages
        setError('');

        if (!/^\d+$/.test(age)) {
            setError('Age must be between 22 and 75.');
            toast.error('\''+age+'\''+' is an invalid character'+'\nAge must be between 22 and 75.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-age-char-error' // Ensure a unique toastId to prevent duplicates
            });
            return false;
        }


        // if(!/^\d+$/.test(age)){
        //     setError('Age cannot contain letters.');
        //     toast.error('\''+age+'\''+' is not a digit.', {
        //     position: 'top-center',
        //     autoClose: 1000,
        //     toastId: 'invalid-ageLetter-error' // Ensure a unique toastId to prevent duplicates
        //     });
        //     return false;
        // } CHECK THIS AGAIN

        // Check if the age has reached at least 2 digits before displaying length-related error messages
        if (age.length >= 2) {
            // Convert the input to a number
            const ageNumber = Number(age);
        
            // Check if the age is a number and within the specified range
            if (!/^\d+$/.test(age) || ageNumber < 22 || ageNumber > 75) {
                setError('Age must be between 22 and 75.');
                toast.error('Age must be between 22 and 75.', {
                    position: 'top-center',
                    autoClose: 1000,
                    toastId: 'invalid-age-error' // Ensure a unique toastId to prevent duplicates
                });
                return false;
            }
        }
        return true;
    }
      
    const handleInputChangeAge = (event) => {
        const { value } = event.target;
        validateAge(value, setError);
    };

    useEffect(()=>{
        axios.get('http://localhost:4000/api/fishermen/getOneFishermen/'+id)
        .then((response)=>{
            setFishermen(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])


    useEffect(() => {
        // Calculate and set the salary based on experience and trip
        calculateSalary();
      }, [fishermen.experience, fishermen.trip]);

    const submitForm = async(e)=>{
        e.preventDefault();

        if (isFormEmpty) {
            toast.error('Please fill out all fields before submitting.', { position: 'top-center' });
            return;
        }

        //Name checks
        const regex = /^[A-Za-z\s]+$/;
        if(!regex.test(fishermen.name)){
            toast.error(fishermen.name + ' is an Invalid Name!!!\nName can only contain alphabetic characters', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-name-error'
            })
            return;
        }

        //Age check
        if(!/^\d+$/.test(fishermen.age)){
            setError('Age cannot contain letters.');
            toast.error('Age cannot contain letters.', {position: 'top-center',});
            return;
        }

        const age = parseInt(fishermen.age)
        if(age < 22 || age > 75){
            toast.error("Age must be between 22 and 75!!!", {position: "top-center"})
            return;
        }
       
        //NIC Checks
        // if(fishermen.nic.length !== 10){
        //     toast.error("NIC must be 10 characters long.", {position: "top-center"})
        //     return;
        // }

        // if (fishermen.nic.length <= 9 && !/^\d+$/.test(fishermen.nic.slice(0, 9))){
        //     toast.error("First nine characters must be digits.", {position: "top-center"})
        //     return;
        // }

        // if (fishermen.nic.charAt(9).toLowerCase() !== 'x' && fishermen.nic.charAt(9).toLowerCase() !== 'v'){
        //     toast.error("Last character must be X or V.", {position: "top-center"})
        //     return;
        // }
        //Experience Checks
        if (isNaN(parseInt(fishermen.experience)) || parseInt(fishermen.experience) <= 2) {
            toast.error('Experience must be greater than 2 years.', {position: "top-center"})
            return;
        }

        if (!/^\d+$/.test(fishermen.experience)) {
            toast.error('Experience must be digits.', {position: 'top-center'});
            return;
        }

        //Contact check
        if(fishermen.contact_number.length !== 10){
            toast.error("contact Number should contain 10 digits.", {position: "top-center"})
            return;
        }

        if (!/^\d+$/.test(fishermen.contact_number)) {
            toast.error('contact Number must be digits.', {position: 'top-center'});
            return;
        }

        if(fishermen.availability === ""){
            toast.error('Select the Availability.', {position: 'top-center'});
            return;
        }

        await axios.put('http://localhost:4000/api/fishermen/updateFishermen/'+id, fishermen)
        .then((response)=>{
            toast.success(response.data.msg, {position: "top-right"})
            navigate("/fishermenprofiles")
        }).catch(error => console.log(error))
    }

    const calculateSalary = () => {
        const { experience, trip } = fishermen;
        if (experience && trip) {
          const exp = parseInt(experience);
          const t = parseInt(trip);
          let salary = 0;
          if (t === 2) {
            if (exp === 3) {
              salary = 50000.00;
            } else if (exp > 3 && exp <= 5) {
              salary = 75000.00;
            } else if (exp > 5) {
              salary = 100000.00;
            }
          } else if (t === 4) {
            if (exp === 3) {
              salary = 75000.00;
            } else if (exp > 3 && exp <= 5) {
              salary = 100000.00;
            } else if (exp > 5) {
              salary = 125000.00;
            }
          }
          setFishermen({ ...fishermen, salary: salary.toString() });
        }
      };

      useEffect(() => {
        // Check if all fields are empty
        const checkFormEmpty = () => {
          for (const key in fishermen) {
            if (fishermen[key] !== '') {
              setIsFormEmpty(false);
              return;
            }
          }
          setIsFormEmpty(true);
        };
    
        checkFormEmpty();
      }, [fishermen]);

    return(
        <div className="addFishermen">
            <div className="Fishermen_container">
                <div className="Fishermen_image-container">
                    
                    <img
                        src={images[imageIndex]}
                        alt="Fish Image"
                        className="Fishermen_fish-image"
                    />
            
                </div>
                <div className="Fishermen_form-container">
                    <div className="Fishermen_header">
                        <h2 className="Fishermen_form-title">Update Fisherman</h2>
                    </div>
                    <form className="addFishermenForm" onSubmit={submitForm}>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="name">Name</label> <br />
                            <input type="text" value={fishermen.name} onChange={(event) => {nameinputHandler(event); handleInputChange(event);}} id="name" name="name" autoComplete='off' placeholder="Enter name"/>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="age">Age</label> <br />
                            <input type="text" value={fishermen.age} onChange={(event) => {ageinputHandler(event); handleInputChangeAge(event);}} id="age" name="age" autoComplete='off' placeholder="Enter age"/>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="nic">NIC</label> <br />
                            <input type="text" value={fishermen.nic} onChange={(event) => {nicInputHandler(event); handleInputChangeNIC(event);}} id="nic" name="nic" autoComplete='off' placeholder="0123456789 'X' or 'V'"/>
                        </div>
                        {/* <div className="inputGroup">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={fishermen.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder="Enter Email"/>
                        </div> */}
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="address">Address</label> <br />
                            <input type="text" value={fishermen.address} onChange={inputChangeHandler} id="address" name="address" autoComplete='off' placeholder="Enter Address"/>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="experience">Experience (Years)</label> <br />
                            <input type="text" value={fishermen.experience} onChange={(event) => {expinputHandler(event); handleInputChangeExp(event);}} id="experience" name="experience" autoComplete='off' placeholder="Enter Experience"/>
                        </div>
                        <div className='Fishermen_inputGroup'>
                            <label htmlFor="trip">Trip (Weeks)</label> <br />
                            <select onChange={inputChangeHandler} value={fishermen.trip} id="trip" name="trip" >
                                <option value="0" >Select Trip length</option>
                                <option value="2">2 weeks</option>
                                <option value="4">4 weeks</option>
                            </select>
                        </div>
                        {/* <div className="inputGroup">
                            <label htmlFor="trip">Trip</label>
                            <input type="text" value={fishermen.trip} onChange={inputChangeHandler} id="trip" name="trip" autoComplete='off' placeholder="Enter trip duration"/>
                        </div> */}
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="contact_number">Contact Number</label> <br />
                            <input type="text" value={fishermen.contact_number} onChange={(event) => {contactinputHandler(event); handleInputChangeContact(event);}} id="contact_number" name="contact_number" autoComplete='off' placeholder="Ex: xxxxxxxxxx"/>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="availability">Availability</label> <br />
                            {/* <input type="text" value={fishermen.availability} onChange={inputChangeHandler} id="availability" name="availability" autoComplete='off' placeholder="Is this fishermen available ?"/> */}
                            <select onChange={inputChangeHandler} value={fishermen.availability} id="availability" name="availability">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="salary">Salary(Rs.)</label> <br />
                            <input type="text" value={fishermen.salary} onChange={inputChangeHandler} id="salary" name="salary" autoComplete='off' placeholder="Salary of fisherman" readOnly/>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <center>
                                <button type="submit" className="Fishermen_submitButton">Update Fishermen</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editfishermen