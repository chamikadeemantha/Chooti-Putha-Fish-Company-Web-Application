import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"
import "./Fishermen.css";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../../backgroundimage/logo2.png";
import "jspdf-autotable";

const Fishermen = () => {

    const [fishermens, setFishermens] = useState([]);
    const [filterExperience, setFilterExperience] = useState(null);
    const [searchFishermen, setSearchFishermen] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const [confirmDelete, setConfirmDelete] = useState(false); // Track confirmation state
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/fishermen/getAllActiveFishermen");
                setFishermens(response.data);
            } catch (error) {
                console.error('Error fetching fishermen:', error);
                toast.error('Failed to fetch fishermen data', { position: 'top-right' });
            }
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    
    // const deleteFishermen = async (fishermenId) => {
    //     const confirmDelete = window.confirm('Warning: Deleting this profile will permanently remove it from your system. Proceed with deletion?');
    //     if (confirmDelete) {
    //       try {
    //         await axios.delete(`http://localhost:4000/api/fishermen/deleteFishermen/${fishermenId}`);
    //         setFishermens((prevFishermen) => prevFishermen.filter((fisherman) => fisherman._id !== fishermenId));
    //         toast.success('Fishermen deleted successfully', { position: 'top-right' });
    //       } catch (error) {
    //         console.error('Error deleting fishermen:', error);
    //         toast.error('Failed to delete fishermen', { position: 'top-right' });
    //       }
    //     }
    //   };

    const handleDelete = async () => {
        if (deleteId) {
          await axios
            .delete(`http://localhost:4000/api/fishermen/deleteFishermen/${deleteId}`)
            .then((response) => {
                setFishermens((prevFishermen ) =>
                prevFishermen.filter((fisherman) => fisherman._id !== deleteId)
              );
              toast.success(response.data.msg, { position: "top-right" });
              setDeleteId(null); // Reset deleteId
              setConfirmDelete(false); // Close confirmation dialog
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      const handleSearch = (event) => {
        setSearchFishermen(event.target.value);
    };
    
    const downloadPDFreport = () => {
        const { jsPDF } = require("jspdf");
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a3"
        });
    
        // Set up logo and company name
        const img = new Image();
        img.src = logo;
    
        // When the logo is loaded, add it to the PDF
        img.onload = function () {
        doc.addImage(this, 'JPEG', 15, 10, 180, 180); // Adjust position and size as needed
        doc.setFontSize(18);
        const currentDateTime = new Date();
        const dateString = `Date: ${currentDateTime.toLocaleDateString()}`;
        doc.text(500, 100, "Chooti Putha Fish Company"); // Adjust position as needed
        doc.text(1020, 100, dateString);
        generatePDFContent(doc);
        };

        const generatePDFContent = (doc) => {
            doc.setFontSize(12);
            

            const tableData = filteredFishermens.map(
            ({
                name,
                age,
                nic,
                address,
                experience,
                trip,
                contact_number,
                availability,
                salary
            }) => [
                name,
                age,
                nic,
                address,
                experience,
                trip,
                contact_number,
                availability,
                salary
            ]
            );

            doc.autoTable({
            head: [
                [
                "Name",
                "Age",
                "NIC",
                "Address",
                "Contact_Number",
                "Experience(Years)",
                "Trip(Weeks)",
                "Availability",
                "Salary(Rs.)"
                ],
            ],
            body: tableData,
            startY: 230, // Adjust the startY position to leave space for the logo and company name
            styles: {
                halign: "center",
                valign: "middle",
                fontSize: 12,
                cellPadding: 5,
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 'auto' },
                6: { cellWidth: 'auto' },
                7: { cellWidth: 'auto' },
                8: { cellWidth: 'auto' },
            },
            });
            
            // Add footer
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(15, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
            }
        
            // Save PDF
            doc.save("FishermenProfile_report.pdf");
        };
    };

    const handleFilterExperience = (event) => {
        const selectedExperience = parseInt(event.target.value);
        setFilterExperience(selectedExperience);
    };

    // const filteredFishermens = filterExperience !== null ? fishermens.filter(fishermen => parseInt(fishermen.experience) === filterExperience) : fishermens;
    const filteredFishermens = fishermens.filter(fishermen =>
        fishermen.name.toLowerCase().includes(searchFishermen.toLowerCase())
        && (filterExperience === null || parseInt(fishermen.experience) === filterExperience)
    );

    return(
        <div className="fishermenTable">

            <div className="dateTimeContainer">
                <span className="currentDateTime">&ensp; Fishermen Profiles <br />{currentDateTime}</span>
            </div>

            <div className="Fishermen_add_delete_button">
                <Link to={"/addfishermen"} className="Fishermen_addButton">Add Fishermen</Link>
                <Link to={"/deletedfishermen"} className="Fishermen_DeleteButton">Deleted fishermen Profiles</Link>
            </div>
            
            {/* <div className="Fishermen_searchSection"> */}
            <div className="Fishermen_filterSection">
            
                <select onChange={handleFilterExperience} className="experienceFilter" id="EXPfilter">
                    <option value="">Filter by Experience</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                </select>

                <input
                    type="text"
                    id="searchfishermen"
                    placeholder="Search by Name"
                    value={searchFishermen}
                    onChange={handleSearch}
                />

                <button className='Fishermen_GeneratePDFreport' onClick={downloadPDFreport}>Get PDF report</button>
            </div>
            <br /> <br />
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>NIC</th>
                    {/* <th>Email</th> */}
                    <th>Address</th>
                    <th>Contact_Number</th>
                    <th>Experience<br/>(Years)</th>
                    <th>Trip<br/>(Weeks)</th>
                    <th>Availability</th>
                    <th>Salary <br/>(Rs.)</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // fishermens.map((fishermen, index)=>
                        filteredFishermens.map((fishermen, index)=>{
                            return(
                                <tr key={fishermen._id}>
                                    <td>{fishermen.name}</td>
                                    <td>{fishermen.age}</td>
                                    <td>{fishermen.nic}</td>
                                    {/* <td>{fishermen.email}</td> */}
                                    <td>{fishermen.address}</td>
                                    <td>{fishermen.contact_number}</td>
                                    <td>{fishermen.experience}</td>
                                    <td>{fishermen.trip}</td>
                                    <td>{fishermen.availability}</td>
                                    <td>{fishermen.salary}</td>

                                    <td className="actionButtons">
                                        {/*<button onClick={()=> deleteFishermen(fishermen._id)}><i className="fa-regular fa-trash-can"></i></button> */}
                                        <button onClick={()=>{setDeleteId(fishermen._id); setConfirmDelete(true);}}><i className="fa-regular fa-trash-can"></i></button>
                                        <Link to={'/editfishermen/'+fishermen._id}><i className="fa-solid fa-pen"></i></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {confirmDelete && (
            <div className="fishermenDeleteconfirmationModal">
                <div className="fishermenDeleteconfirmationContent">
                <h2>Do You Want Delete This Fishermen?</h2>
                <div className="fishermenDeleteconfirmationButtons">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={() => setConfirmDelete(false)}>No</button>
                </div>
                </div>
            </div>
            )} 
        </div>  
    )
}

export default Fishermen