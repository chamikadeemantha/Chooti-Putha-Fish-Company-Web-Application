import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import logo from "../../backgroundimage/logo2.png";
import "./DeletedFishermenProfiles.css"
import "jspdf-autotable";

const DeletedFishermenProfiles = () => {
    const [deletedFishermen, setDeletedFishermen] = useState([]);

    useEffect(() => {
        const fetchDeletedFishermen = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/fishermen/getDeletedFishermen");
                setDeletedFishermen(response.data);
            } catch (error) {
                console.error("Error fetching deleted fishermen:", error);
            }
        };

        fetchDeletedFishermen();
    }, []);

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
            

            const tableData = deletedFishermen.map(
            ({
                name,
                age,
                nic,
                address,
                contact_number,
                experience,
                trip,
                availability,
                salary,
                deletedAt
            }) => [
                name,
                age,
                nic,
                address,
                contact_number,
                experience,
                trip,
                availability,
                salary,
                deletedAt
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
                "Salary(Rs.)",
                "Deleted At"
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
                9: { cellWidth: 'auto' }
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
            doc.save("DeletedFishermenProfile_report.pdf");
        };
    };

    return (
        <div className="deletedFishermenTable">
            <center><h2>Deleted Fishermen Profiles</h2></center>
            <button className='DeletedGeneratePDFreport' onClick={downloadPDFreport}>Generate report</button>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>NIC</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Experience (Years)</th>
                        <th>Trip (Weeks)</th>
                        <th>Availability</th>
                        <th>Salary (Rs.)</th>
                        <th>Deleted Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {deletedFishermen.map((fisherman) => (
                        <tr key={fisherman._id}>
                            <td>{fisherman.name}</td>
                            <td>{fisherman.age}</td>
                            <td>{fisherman.nic}</td>
                            <td>{fisherman.address}</td>
                            <td>{fisherman.contact_number}</td>
                            <td>{fisherman.experience}</td>
                            <td>{fisherman.trip}</td>
                            <td>{fisherman.availability}</td>
                            <td>{fisherman.salary}</td>
                            <td>{moment(fisherman.deletedAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeletedFishermenProfiles;
