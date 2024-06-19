import React, { useEffect, useState, useRef } from 'react'
import "./Catch.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import logo from "../../backgroundimage/logo2.png";
import "jspdf-autotable";

const Catchlogs = () => {

    const [catches,setCatches] = useState([]);
    const [filterGrade, setFilterGrade] = useState(null);
    const [searchFishType, setSearchFishType] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const pieChartRef = useRef(null);
    const [confirmDelete, setConfirmDelete] = useState(false); // Track confirmation state
    const [deleteId, setDeleteId] = useState(null);
    

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get("http://localhost:4000/api/catch/getallcatch");
            setCatches(response.data);
            // generatePieChartData(response.data);
        }
        fetchData();
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // const deleteLog = async(catchId)=>{
    //     const confirmation = window.confirm('Are you sure you want to delete this log?')
    //     if(confirmation){
    //         await axios.delete(`http://localhost:4000/api/catch/deletecatch/${catchId}`)
    //         .then((response)=>{
    //             setCatches((prevUser)=> prevUser.filter((log)=> log._id !== catchId))
    //             toast.success(response.data.msg,{position:'top-right'})
    //         }).catch((error)=>{
    //             console.log(error);
    //         })
    //     }
    // }

    const handleDelete = async () => {
        if (deleteId) {
          await axios
            .delete(`http://localhost:4000/api/catch/deletecatch/${deleteId}`)
            .then((response) => {
                setCatches((prevUser ) =>
                prevUser.filter((log) => log._id !== deleteId)
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
        setSearchFishType(event.target.value);
    };

    const downloadPDFreport = () => {
        const { jsPDF } = require("jspdf");
        const doc = new jsPDF();
    
        // Set up logo and company name
        const img = new Image();
        img.src = logo;
    
        // When the logo is loaded, add it to the PDF
        img.onload = function () {
        doc.addImage(this, 'JPEG', 10, 10, 50, 50); // Adjust position and size as needed
        doc.setFontSize(14);
        const currentDateTime = new Date();
        const dateString = `Date: ${currentDateTime.toLocaleDateString()}`;
        doc.text(78, 30, "Chooti Putha Fish Company"); // Adjust position as needed
        doc.text(165, 30, dateString);
        generatePDFContent(doc);
        };

        const generatePDFContent = (doc) => {
            doc.setFontSize(12);
            
            
            const tableData = filteredFish.map(
            ({
                fishType,
                grade,
                method_of_catch,
                caught_quantity,
                released_quantity,
                available_stock
                
            }) => [
                fishType,
                grade,
                method_of_catch,
                caught_quantity,
                released_quantity,
                available_stock
            ]
            );

            doc.autoTable({
            head: [
                [
                "Fish Type",
                "Fish Grade",
                "Method of catch",
                "Caught Quantity(Kg)",
                "Released Quantity(Kg)",
                "Available Stock"
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
                0: { cellWidth: 30 },
                1: { cellWidth: 20 },
                2: { cellWidth: 30 },
                3: { cellWidth: 35 },
                4: { cellWidth: 35 },
                5: { cellWidth: 35 },
                
                
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
            doc.save("catch_report.pdf");
        };
    };
      
    const handleFilterGrade = (event) => {
        const selectedGrade = event.target.value;
        setFilterGrade(selectedGrade);
    };
    // const filteredFish = filterGrade !== null ? catches.filter(log => log.grade === filterGrade) : catches;

    const filteredFish = catches.filter(log =>
        log.fishType.toLowerCase().includes(searchFishType.toLowerCase())
        && (filterGrade === null || log.grade === filterGrade)
    );
    
    
    
    useEffect(() => {
        generatePieChartData();
        // Make sure to clean up the chart instance on unmount
        return () => {
            if (pieChartRef.current) {
                pieChartRef.current.destroy();
            }
        };
    }, [catches]);

    const processStockString = (stockString) => {
        // Split the string every 3 characters and convert each to a number
        const stockNumbers = stockString.match(/.{1,3}/g).map(Number);
        // Sum the numbers to get the total stock
        return stockNumbers.reduce((acc, value) => acc + value, 0);
    };
    
    const generatePieChartData = () => {
        const grades = ['A', 'B', 'C'];
        const stockByGrade = {};
        grades.forEach(grade => {
            stockByGrade[grade] = 0;
        });
        catches.forEach(log => {
            // Parse the caught and released quantities as integers and calculate the available stock
            const caughtQuantity = parseInt(log.caught_quantity, 10);
            const releasedQuantity = parseInt(log.released_quantity, 10);
            const availableStock = caughtQuantity - releasedQuantity;
    
            // Accumulate the available stock by grade
            stockByGrade[log.grade] += availableStock;
        });
        const pieData = {
            labels: Object.keys(stockByGrade),
            datasets: [{
                data: Object.values(stockByGrade),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ]
            }]
        };
    
        // Destroy the previous chart if it exists
        if (pieChartRef.current) {
            pieChartRef.current.destroy();
        }
    
        // Create a new chart instance
        const ctx = document.getElementById('pieChart').getContext('2d');
        pieChartRef.current = new Chart(ctx, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    };
    

    return (
    <div className='catchTable'>

            <div className="dateTimeContainer">
                <span className="currentDateTime">&ensp; &ensp; &ensp; Catch Logs <br />{currentDateTime}</span>
            </div>

        
        <div className="Catch_searchSection">
            <input
                type="text"
                id='CatchSearch'
                placeholder="Search by Fish Type"
                value={searchFishType}
                onChange={handleSearch}
            />
        </div>
        
            <div className="Catch_filterSection">
            <Link to={"/Addlog"} className='Catch_addButton'>Add Catch</Link>
                <select onChange={handleFilterGrade} className="Catch_gradeFilter" id="Catch_filter">
                    <option value="">Filter by Grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    {/* <option value="D">D</option> */}
                    
                </select>
                <button className='Catch_GeneratePDFreport' onClick={downloadPDFreport}>Generate PDF</button>
                <button className='Catch_GeneratePieChartButton' onClick={() => generatePieChartData(filteredFish)}>Generate Pie Chart</button>
            </div>

        <br /><br />
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    {/* <th>S.No</th> */}
                    <th>Fish Type</th>
                    <th>Fish Grade</th>
                    <th>Method of catch</th>
                    <th>Caught Quantity<br/>(Kg)</th>
                    <th>Released Quantity<br/>(Kg)</th>
                    <th>Available Stock<br/>(Kg)</th>
                    {/* <th>Availability</th> */}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredFish.map((log,index)=>{
                        return(
                            <tr key={log._id}>
                                {/* <td>{index+1}</td> */}
                                <td>{log.fishType}</td>
                                <td>{log.grade}</td>
                                <td>{log.method_of_catch}</td>
                                <td>{log.caught_quantity}</td>
                                <td>{log.released_quantity}</td>
                                <td>{log.available_stock}</td>
                                {/* <td>{log.availability}</td> */}
                                <td className='actionButton'>
                                {/* <button className='button1'onClick={()=> deleteLog(log._id)}><i className="fa-solid fa-trash"></i></button> */}
                                <button className='button1' onClick={()=>{setDeleteId(log._id); setConfirmDelete(true);}}><i className="fa-regular fa-trash-can"></i></button>
                                <button className='button2'><Link to={'/editlog/'+ log._id}><i class="fa-solid fa-pen-to-square"></i></Link></button>
                                </td>
                            </tr>

                        )
                    })
                }
                
            </tbody>
        </table>
        <br /><br />
        <div id='piechart' style={{ height: '300px', width: '300px' }}>
                <canvas id='pieChart'></canvas>
        </div>
        {confirmDelete && (
            <div className="CatchDeleteconfirmationModal">
                <div className="CatchDeleteconfirmationContent">
                <h2>Do You Want Delete This Log?</h2>
                <div className="CatchDeleteconfirmationButtons">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={() => setConfirmDelete(false)}>No</button>
                </div>
                </div>
            </div>
            )}
    </div>
  )
}

export default Catchlogs