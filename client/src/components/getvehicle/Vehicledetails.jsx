import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"
import "./Vehicledetails.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import logo from "../../backgroundimage/logo.jpg";
import "jspdf-autotable";


const Vehicle = () => {

    const [vehicles, setVehicles] = useState([]);
    /*const [fuelConsumption, setFuelConsumption] = useState([]);*/
    const [remfuelcapacity, setremfuelcapacity] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [recordsPerPage] = useState(20); // Records per page
    const [selectedLastLocation, setSelectedLastLocation] = useState("");
    
    const [searchVehicle, setSearchVehicle] = useState('');

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get("http://localhost:4000/api/vehicle/getallvehicle")
            setVehicles(response.data);
        }
        fetchData();
    }, [])
    
    /*const deleteVehicle = async(vehicleId) => {
        await axios.delete('http://localhost:4000/api/vehicle/deletevehicle/'+vehicleId)
        .then((respones)=>{
            setVehicles((prevUser)=> prevUser.filter((vehicle)=> vehicle._id !== vehicleId))
            toast.success(respones.data.msg, {position: 'top-right'})
        })
        .catch((error) =>{
            console.log(error)
        })
    }*/

    const deleteVehicle = async (vehicleId) => {
        if (vehicleId) {
          await axios.delete(`http://localhost:4000/api/vehicle/deletevehicle/${vehicleId}`)
            .then((response) => {
              setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== vehicleId));
              toast.success(response.data.msg, { position: 'top-right' });
              setDeleteId(null); // Reset deleteId
              setConfirmDelete(false); // Close confirmation dialog
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      
    const handleSearch = (event) => {
      setSearchVehicle(event.target.value);
    };

    const calculateremfuelcapacity = (vehicle) => {
        let remfuelcapacity;
        if (vehicle.last_location === "Matara" || vehicle.last_location === "matara") {
            remfuelcapacity = (vehicle.tank_capacity - 8 * 2).toFixed(2);
        } else if (vehicle.last_location === "Colombo" || vehicle.last_location === "colombo") {
            remfuelcapacity = (vehicle.tank_capacity - 22 * 2).toFixed(2);
        }else if (vehicle.last_location === "Weligama" || vehicle.last_location === "weligama") {
            remfuelcapacity = (vehicle.tank_capacity - 5 * 2).toFixed(2);
        }else if (vehicle.last_location === "Ambalangoda" || vehicle.last_location === "ambalangoda") {
            remfuelcapacity = (vehicle.tank_capacity - 6.5 * 2).toFixed(2);
        }else if (vehicle.last_location === "Beruwala" || vehicle.last_location === "beruwala") {
            remfuelcapacity = (vehicle.tank_capacity - 12 * 2).toFixed(2);
        }else if (vehicle.last_location === "Kalutara" || vehicle.last_location === "kalutara") {
            remfuelcapacity = (vehicle.tank_capacity - 13.5 * 2).toFixed(2);
        }else if (vehicle.last_location === "Kotte" || vehicle.last_location === "kotte") {
            remfuelcapacity = (vehicle.tank_capacity - 20 * 2).toFixed(2);
        }else {
            remfuelcapacity = "Unknown";
        }
        setremfuelcapacity({ [vehicle._id]: remfuelcapacity });
    }

    /*const PDFReport = () => {
        const doc = new jsPDF('landscape'); 
        const table = document.querySelector('table');
        const tableHeight = table.clientHeight;
        const tableWidth = table.clientWidth;
        const increasedWidth = tableWidth * 2; 
       
        html2canvas(table, {
          width: increasedWidth,
          height: tableHeight
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 550; 
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 
          doc.save('Vehicle_report.pdf');
        });
      };*/

      const handleLastLocationChange = (selectedOption) => {
        setSelectedLastLocation(selectedOption.value);
      };

      const lastlocationOptions = [
        { value: "", label: "All" },
        { value: "Matara", label: "Matara" },
        { value: "Colombo", label: "Colombo" },
        { value: "Weligama", label: "Weligama" },
        { value: "Ambalangoda", label: "Ambalangoda" },
        { value: "Beruwala", label: "Beruwala" },
        { value: "Kalutara", label: "Kalutara" },
        { value: "Kotte", label: "Kotte" },
      ];

      const filteredVehicle = vehicles.filter((vehicle) => 
    vehicle.name.toLowerCase().includes(searchVehicle.toLowerCase()) &&
    (vehicle.last_location.toLowerCase() === selectedLastLocation.toLowerCase() || selectedLastLocation === "")
);

      

        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = filteredVehicle.slice(
            indexOfFirstRecord,
            indexOfLastRecord
        );
        

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      const downloadPDF = () => {
        const { jsPDF } = require("jspdf");
        const doc = new jsPDF();
      
        // Set up logo and company name
        const img = new Image();
        img.src = logo;
      
        // When the logo is loaded, add it to the PDF
        img.onload = function () {
          doc.addImage(this, 'JPEG', 15, 10, 50, 50); // Adjust position and size as needed
          doc.setFontSize(18);
          doc.text(80, 30, "Chooti Putha Fish Company"); // Adjust position as needed
          generatePDFContent(doc);
        };
      
        const generatePDFContent = (doc) => {
          const tableData = currentRecords.map(
            ({
              name,
              model,
              number_plate,
              driver_phone_no,
              fuel_type,
              tank_capacity,
              last_location,
              route,
            }) => [
                name,
                model,
                number_plate,
                driver_phone_no,
                fuel_type,
                tank_capacity,
                last_location,
                route,
            ]
          );
      
          doc.autoTable({
            head: [
              [
                "Vehicle Name",
                "Model",
                "Number Plate No",
                "Driver's Phone No",
                "Fuel Type",
                "Tank Capacity ",
                "Last Location",
                "Route",
              ],
            ],
            body: tableData,
            startY: 80, // Adjust the startY position to leave space for the logo and company name
            styles: {
              halign: "center",
              valign: "middle",
              fontSize: 12,
              cellPadding: 3,
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
            columnStyles: {
              0: { cellWidth: 25 },
              1: { cellWidth: 20 },
              2: { cellWidth: 25 },
              3: { cellWidth: 30 },
              4: { cellWidth: 20 },
              5: { cellWidth: 25 },
              6: { cellWidth: 25 },
              7: { cellWidth: 25 },
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
            doc.save("Vehicle_details.pdf");
        }
    };
        
    return(
        <div className="vehicleTable">
            <Link to={"/addVehicle"} className="vehicleaddButton">Add Vehicle</Link>
            <h1 className="vehicle_title">Vehicle Details</h1>
            <Select
                options={lastlocationOptions}
                value={lastlocationOptions.find((option) => option.value === selectedLastLocation)}
                onChange={handleLastLocationChange}
                placeholder="Grade"
                className="vehicleroute-select"
                classNamePrefix="vehicleroute-select"
            />

            <br></br>

            <button className='vehicledownloadButton' onClick={downloadPDF}>Download PDF report</button>
            <input
                    type="text"
                    id="searchVehicle"
                    placeholder="Search Vehicle"
                    value={searchVehicle}
                    onChange={handleSearch}
                />
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                    <th>Vehicle Name</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Number Plate No</th>
                    <th>Vehicle Driver's Phone No</th>
                    <th>Vehicle Fuel Type</th>
                    <th>Tank Capacity (L)</th>
                    <th>Last Location</th>
                    <th>Vehicle Route</th>
                    <th>Action</th>
                    <th>Remaining Fuel Capacity</th> {/* Add this header for fuel consumption */}
                    <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredVehicle.map((vehicle, index)=>{
                            return(
                                <tr key={vehicle._id}>
                                    <td>{vehicle.name}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.number_plate}</td>
                                    <td>{vehicle.driver_phone_no}</td>
                                    <td>{vehicle.fuel_type}</td>
                                    <td>{vehicle.tank_capacity}</td>
                                    <td>{vehicle.last_location}</td>
                                    <td>{vehicle.route}</td>
                                    
                                    <td className="vehicleactionButtons">
                                        <button onClick={()=> {setDeleteId(vehicle._id);
                                        setConfirmDelete(true);}}><i className="fa-regular fa-trash-can"></i></button>
                                        <Link to={'/editVehicle/'+vehicle._id}><i className="fa-solid fa-pen"></i></Link>
                                    </td>

                                    <td className="vehicleactionButtonsCalculate">
                                        <button onClick={() => calculateremfuelcapacity(vehicle)}>Calculate</button>
                                    </td>
                                    <td>{remfuelcapacity[vehicle._id]}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
                
            </table>
            
            {/* Confirmation modal */}
            {confirmDelete && (
                <div className="vehicleconfirmationModal">
                    <div className="vehicleconfirmationContent">
                        <h2>Do You Want to Delete This Vehicle?</h2>
                            <div className="vehicleconfirmationButtons">
                                <button onClick={() => deleteVehicle(deleteId)}>Yes</button>
                                <button onClick={() => setConfirmDelete(false)}>No</button>
                            </div>
                    </div>
                </div>
            )}
        </div>
 
    )
}

export default Vehicle