import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./FishPrice.css";
import Select from "react-select";
import Chart from "chart.js/auto";
import logo from "../../backgroundimage/logo.jpg";
import "jspdf-autotable";

const FishPrice = () => {
  const navigate = useNavigate();
  const gotoNav = () => {
    navigate("/dashboard");
  };
  const [fishprices, setFishPrices] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false); // Track confirmation state
  const [deleteId, setDeleteId] = useState(null); // Track id of fish to delete
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [recordsPerPage] = useState(20); // Records per page
  const [pieChartVisible, setPieChartVisible] = useState(false);
  const tableRef = useRef(null);
  const pieChartRef = useRef(null);

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
      doc.setFontSize(12);
      doc.text(15, 70, `Date: ${currentDate.toLocaleDateString()}`); // Add current date
    
      const tableData = filteredFishPrices.map(
        ({
          name,
          fishType,
          species,
          grade,
          wholesale_price,
          retail_price,
          average_weight,
          availability,
        }) => [
          name,
          fishType,
          species,
          grade,
          wholesale_price,
          retail_price,
          average_weight,
          availability,
        ]
      );
    
      doc.autoTable({
        head: [
          [
            "Name",
            "Fish Type",
            "Species",
            "Grade",
            "Wholesale Price",
            "Retail Price",
            "Avg. Weight",
            "Today Avail",
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
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 18 },
          4: { cellWidth: 20 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
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
      doc.save("Fish_price_list.pdf");
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/fish/getallfish"
      );
      setFishPrices(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pieChartVisible) {
      renderPieChart();
    }
  }, [pieChartVisible]);

  const handleDelete = async () => {
    if (deleteId) {
      await axios
        .delete(`http://localhost:4000/api/fish/deletefish/${deleteId}`)
        .then((response) => {
          setFishPrices((prevFishPrices) =>
            prevFishPrices.filter((fishprice) => fishprice._id !== deleteId)
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

  const handleGradeChange = (selectedOption) => {
    setSelectedGrade(selectedOption.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const gradeOptions = [
    { value: "", label: "All" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  // Apply filtering and searching to the entire dataset
  const filteredFishPrices = fishprices
    .filter(
      (fishprice) => fishprice.grade === selectedGrade || selectedGrade === ""
    )
    .filter((fishprice) =>
      fishprice.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredFishPrices.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPieChart = () => {
    const grades = ["A", "B", "C"];
    const gradeCounts = {};
    let totalFishCount = 0;
    filteredFishPrices.forEach(({ grade }) => {
      if (gradeCounts[grade]) {
        gradeCounts[grade]++;
      } else {
        gradeCounts[grade] = 1;
      }
      totalFishCount++;
    });

    const pieChartCanvas = pieChartRef.current.getContext("2d");
    new Chart(pieChartCanvas, {
      type: "pie",
      data: {
        labels: grades,
        datasets: [
          {
            data: grades.map((grade) => gradeCounts[grade] || 0),
            backgroundColor: [
              "#0BE1FF", // Change to your preferred color for grade A
              "#007DF3", // Change to your preferred color for grade B
              "#2700FF", // Change to your preferred color for grade C
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  context.label +
                  ": " +
                  ((context.parsed / totalFishCount) * 100).toFixed(2) +
                  "%"
                );
              },
            },
          },
          title: {
            display: true,
            text: "Fish Grades",
            font: {
              size: 20, // Adjust the font size here
            },
          },
        },
      },
    });
  };

  return (
    <div className="FishPriceTable">
      <div className="fishheader">
        <div className="fishbuttonGroup">
          <div className="fishbackb">
            <div onClick={gotoNav}>Back To Dashboard</div>
          </div>
          <div className="fishsearchBar">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <center>
          <h1 className="fishdate">
            {currentDate.toLocaleDateString()} Fish Price List
          </h1>
        </center>
        <Select
          options={gradeOptions}
          value={gradeOptions.find((option) => option.value === selectedGrade)}
          onChange={handleGradeChange}
          placeholder="Grade"
          className="fishgrade-select"
          classNamePrefix="fishgrade-select"
        />
        <div className="fishcenterfix">
          <div className="fishaddButton1">
            <Link to={"/addfish"} className="link">
              Add A New Fish
            </Link>
          </div>
          <button
            class="fishtoggleButton1"
            onClick={() => setPieChartVisible(!pieChartVisible)}
          >
            Toggle Pie Chart
          </button>
          <div className="fishdownloadButtonContainer">
            <button onClick={downloadPDF} className="fishdownloadButton">
              Download Fish Price List
            </button>
          </div>
        </div>
        <div className="fishpieChartContainer">
          <center></center>
          {pieChartVisible && (
            <div className="fishpieChart">
              <canvas ref={pieChartRef}></canvas>
              <button
                className="fishcloseButton"
                onClick={() => setPieChartVisible(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="table-container" ref={tableRef}>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th className="header2">Name</th>
              <th className="header1">Fish Type</th>
              <th className="header2">Species</th>
              <th className="header1">Grade</th>
              <th className="header2">Wholesale Price(Rs)</th>
              <th className="header1">Retail Price(Rs)</th>
              <th className="header2">Average Weight(Kg)</th>
              <th className="header1">Today Availability</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((fishprice, index) => {
              return (
                <tr
                  key={fishprice._id}
                  className={index % 2 === 0 ? "evenRow" : "oddRow"}
                >
                  <td>{fishprice.name}</td>
                  <td>{fishprice.fishType}</td>
                  <td>{fishprice.species}</td>
                  <td>{fishprice.grade}</td>
                  <td>{fishprice.wholesale_price}</td>
                  <td>{fishprice.retail_price}</td>
                  <td>{fishprice.average_weight}</td>
                  <td>
                    {fishprice.availability === "Yes" ? (
                      <button
                        style={{
                          backgroundColor: "#E481FF",
                          color: "black",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "none",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        YES
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#F5FF5D",
                          color: "black",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "none",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        NO
                      </button>
                    )}
                  </td>
                  <td className="fishactionButtons">
                    <button
                      onClick={() => {
                        setDeleteId(fishprice._id);
                        setConfirmDelete(true);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/editfish/${fishprice._id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="fishpagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastRecord >= filteredFishPrices.length}
        >
          Next
        </button>
      </div>
      {/* Confirmation modal */}
      {confirmDelete && (
        <div className="fishconfirmationModal">
          <div className="fishconfirmationContent">
            <h2>Do You Want Delete This Fish?</h2>
            <div className="fishconfirmationButtons">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FishPrice;
