import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./GetEmployee.css";
import Select from "react-select";
import "jspdf-autotable";
import logo from "../../backgroundimage/logo.jpg";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const tableRef = useRef(null);
  const [confirmDelete, setConfirmDelete] = useState(false); // Track confirmation state
  const [deleteId, setDeleteId] = useState(null); // Track id of fish to delete
   const [currentPage, setCurrentPage] = useState(1); // Current page
   const [recordsPerPage] = useState(20); // Records per page
   const navigate = useNavigate();
   const gotoNav = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/employee/getallemployee",
      );
      setEmployees(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deleteEmployee = async employeeID => {
    if (deleteId) {
    await axios
      .delete(`http://localhost:4000/api/employee/deleteemployee/${deleteId}`)
      .then(response => {
        setEmployees(prevemployees =>
          prevemployees.filter(employee => employee._id !== deleteId),
        );
        toast.success(response.data.msg, { position: "top-right" });
        setDeleteId(null); // Reset deleteId
        setConfirmDelete(false); // Close confirmation dialog
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const handleDepartmentChange = selectedOption => {
    setSelectedDepartment(selectedOption.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const departmentOption = [
    { value: "", label: "All" },
    { value: "KITCHEN", label: "KITCHEN" },
    { value: "IT", label: "IT" },
    { value: "FISHERY", label: "FISHERY" },
    { value: "CLEANING", label: "CLEANING" },
  ];

  const filteredemployees = selectedDepartment
    ? employees.filter(employee => employee.department === selectedDepartment)
    : employees;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredemployees.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

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
    const tableData = filteredemployees.map(
      ({
        name,
        position,
        department,
        NIC,
        experience,
        salary,
        availability,
      }) => [
        name,
        position,
        department,
        NIC,
        experience,
        salary,
        availability,
      ],
    );
    doc.autoTable({
      head: [
        [
          "Name",
          "Position",
          "Dep",
          "NIC",
          "Experience",
          "Salary",
          "Availability",
        ],
      ], // Include 'Availability' in the head
      body: tableData,
      startY: 80,
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 12,
        cellPadding: { top: 3, right: 1, bottom: 3, left: 1 }, // Set cell padding for top, right, bottom, and left separately
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 24 },
        2: { cellWidth: 25 },
        3: { cellWidth: 35 },
        4: { cellWidth: 29 },
        5: { cellWidth: 20 },
        6: { cellWidth: 28 },
      },
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const txtWidth = doc.getStringUnitWidth(`Employee Salary  - ${currentDate.toLocaleDateString()}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (pageWidth - txtWidth) / 2;
    doc.text(`Employee Salary  - ${currentDate.toLocaleDateString()}`, x, 10);

    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(15, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
    }

    doc.save("Employee_salary_list.pdf");
  };

  }
  const [searchTerm, setSearchTerm] = useState("");
  const [showOTDetails, setShowOTDetails] = useState(false);

const handleOTDetailsClick = () => {
  setShowOTDetails(!showOTDetails);
};

  const handleSearchChange = event => {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(event.target.value)) {
      setSearchTerm(event.target.value);
    }
  };

  const searchedEmployees = searchTerm
    ? filteredemployees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : filteredemployees;

  
  return (
    <div className="EmployeeTable">
      <div className="header">
      <div className="buttonGroup">
          <div className="backb">
            <div onClick={gotoNav}>Back To Dashboard</div>
          </div>
        </div>
        
        <center>
          <h1 className="date">
            {currentDate.toLocaleDateString()} Employee Salary Table
          </h1>
        </center>
        <div className="searchContainer">
          
          <input
            type="text"
            placeholder="Employee name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>
        <Select
          options={departmentOption}
          value={departmentOption.find(option => option.value === selectedDepartment)}
          onChange={handleDepartmentChange}
          placeholder="department"
          className="department-select"
          classNamePrefix="department-select"
        />
        
        <div className="OTBDiv">
          <button className="OTButton" onClick={handleOTDetailsClick}><h4>OT Details</h4></button>
        </div>
        
        {showOTDetails && (
          <div className="OTdiv">
            <h5>OT rate : 2000 RSperHour</h5>
            <h5>ETF     : 8.8%</h5>
            <h5>EPF     : 5.5%</h5>
          </div>
        )}
        
        <div className="addButton">
          <Link to={"/addempsalary"} className="link">
            <h4>Add A New Employee</h4>
            
          </Link>
        </div>
        <div class="downloadButtonContainer">
          <button onClick={downloadPDF} className="downloadButton">
            <h5>Download Employee Salary Sheet</h5>
          </button>
        </div>
      </div>
      <div id="table-container" ref={tableRef}>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th className="header2">Name</th>
              <th className="header1">Position</th>
              <th className="header2">Department</th>
              <th className="header1">NIC</th>
              <th className="header2">Experience(year)</th>
              <th className="header1">Basic Salary(rupees)</th>
              <th className="header1">Availability</th>
              <th className="header1">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedEmployees.map((employee, index) => {
              return (
                <tr
                  key={employee._id}
                  className={index % 2 === 0 ? "evenRow" : "oddRow"}
                >
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.NIC}</td>
                  <td>{employee.experience}</td>
                  <td>{employee.salary}</td>
                  <td>
                    {employee.availability === "Yes" ? (
                      <button
                        style={{
                          backgroundColor: "#52a0ff",
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
                          backgroundColor: "#8B8B8B",
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
                  <td className="actionButtons">
                    <button onClick={() => {
                        setDeleteId(employee._id);
                        setConfirmDelete(true);
                      }}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/editempsalary/${employee._id}`} style={{ fontSize: '10px' }}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     
      {/* Confirmation modal */}
      {confirmDelete && (
        <div className="empconfirmationModal">
          <div className="empconfirmationContent">
            <h2>Do You Want Remove This Employee?</h2>
            <div className="empconfirmationButtons">
              <button onClick={deleteEmployee}>Yes</button>
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
