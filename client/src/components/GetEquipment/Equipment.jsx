import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Select from 'react-select';
import './Equipment.css';
import logo from "../../backgroundimage/logo.jpg";
import "jspdf-autotable";

const Equipment = () => {
  const navigate = useNavigate();
  const gotoNav = () => {
    navigate("/dashboard");
  };

  const [equipments, setEquipments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const tableRef = useRef(null);
  const [selectedAvailability, setSelectedAvailability] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/equipment/getallequipment"
      );
      setEquipments(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async () => {
    if (deleteId) {
      await axios
        .delete(`http://localhost:4000/api/equipment/deleteequipment/${deleteId}`)
        .then((response) => {
          setEquipments((prevEquipment) =>
            prevEquipment.filter((equipment) => equipment._id !== deleteId)
          );
          toast.success(response.data.msg, { position: "top-right" });
          setDeleteId(null);
          setConfirmDelete(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const availabilityOptions = [
    { value: '', label: 'All' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const handleAvailabilityChange = (selectedOption) => {
    setSelectedAvailability(selectedOption.value);
  };

  const filteredEquipmentByName = searchTerm
    ? equipments.filter((equipment) => 
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : equipments;

  const filteredEquipmentByAvailability = selectedAvailability
    ? filteredEquipmentByName.filter((equipment) => 
        equipment.availability === selectedAvailability
      )
    : filteredEquipmentByName;

  const currentRecords = filteredEquipmentByAvailability.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const downloadPDF = () => {
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = function () {
      doc.addImage(this, 'JPEG', 15, 10, 50, 50);
      doc.setFontSize(18);
      doc.text(80, 30, "Chooti Putha Fish Company");
      generatePDFContent(doc);
    };
  };

  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const generatePDFContent = (doc) => {
    const tableData = currentRecords.map(
      ({
        name,
        quantity,
        relaseamount,
        condition,
        availability,
      }) => [
        name,
        quantity,
        relaseamount,
        condition,
        availability,
      ]
    );

    doc.autoTable({
      head: [
        [
          "Name",
          "Quantity",
          "Release Amount",
          "Condition",
          "Availability",
        ],
      ],
      body: tableData,
      startY: 80,
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 12,
        cellPadding: 3,
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 },
      },
    });

    doc.setFontSize(12);
    doc.text(80, 50, `Date: ${formattedDate}`);
    doc.text(80, 60, `Time: ${formattedTime}`);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(15, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
    }

    doc.save("Fish_equipment_list.pdf");
  };

  return (
    <div className="EquipmentTable">
      <div className="equipmentheader">
        <div className="equipmentbuttonGroup">
          <div className="equipmentbackb">
            <div onClick={gotoNav}>Back To Dashboard</div>
          </div>
          <div className="equipmentsearchBar">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <center>
          <h1 className="equipmentdate">
            {formattedDate} Equipment List
          </h1>
        </center>
        <div className="equipmentcenterfix">
          <div className="equipmentaddButton1">
            <Link to={"/addEquipment"} className="link">
              Add A New Equipment
            </Link>
          </div>
          <Select
            options={availabilityOptions}
            value={availabilityOptions.find(option => option.value === selectedAvailability)}
            onChange={handleAvailabilityChange}
            placeholder="Availability"
            className="equipment-select"
            classNamePrefix="equipment-select-container"
          />
          <div className="equipmentdownloadButtonContainer">
            <button onClick={downloadPDF} className="equipmentdownloadButton">
              Download Equipment List
            </button>
          </div>
        </div>
      </div>
      <div id="table-container" ref={tableRef}>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th className="equipmentheader2">Name</th>
              <th className="equipmentheader1">Quantity</th>
              <th className="equipmentheader2">Release Amount</th>
              <th className="equipmentheader1">Condition</th>
              <th className="equipmentheader2">Current Availability</th>
              <th className="equipmentheader1">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((equipment, index) => {
              return (
                <tr
                  key={equipment._id}
                  className={index % 2 === 0 ? "evenRow" : "oddRow"}
                >
                  <td>{equipment.name}</td>
                  <td>{equipment.quantity}</td>
                  <td>{equipment.relaseamount}</td>
                  <td>{equipment.condition}</td>
                  <td>
                    {equipment.availability === "Yes" ? (
                      <button
                        style={{
                          backgroundColor: "#AF98FF",
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
                          backgroundColor: "#FF7770",
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
                  <td className="equipmentactionButtons">
                    <button
                      onClick={() => {
                        setDeleteId(equipment._id);
                        setConfirmDelete(true);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/editEquipment/${equipment._id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {confirmDelete && (
        <div className="equipmentconfirmationModal">
          <div className="equipmentconfirmationContent">
            <h2>Do You Want Delete This Equipment?</h2>
            <div className="equipmentconfirmationButtons">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
