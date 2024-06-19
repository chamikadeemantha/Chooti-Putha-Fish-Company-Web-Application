import React, { useEffect, useState } from "react";
import "../getBoatTrip/BoatTrip.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../backgroundimage/logo.jpg";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const BoatTrip = () => {
  const navigate = useNavigate();
  const [boatTrips, setBoatTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTripType, setSelectedTripType] = useState("");
  const [sortByProfit, setSortByProfit] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSortByProfit = () => {
    setSortByProfit(!sortByProfit);
  };

  const handleTripTypeChange = (event) => {
    setSelectedTripType(event.target.value);
    setSortByProfit(false); // Reset profit sorting
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/boattrip/getboattrip");
        const sortedBoatTrips = response.data.sort((a, b) => a.tripID - b.tripID);
        setBoatTrips(sortedBoatTrips);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deleteBoatTrip = async (id, tripID, boatName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Trip ID: ${tripID} And Boat Name ${boatName}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/boattrip/deleteboattrip/${id}`);
        setBoatTrips(boatTrips.filter(boatTrip => boatTrip._id !== id));
        alert(`Trip with ID ${tripID} and Boat Name ${boatName} has been deleted successfully.`);
      } catch (error) {
        console.error("Error:", error);
        alert(`Failed to delete trip with ID ${tripID} and Boat Name ${boatName}.`);
      }
    }
  };

  const downloadPageAsPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = Logo;

    img.onload = function () {
      doc.addImage(this, 'JPEG', 15, 10, 50, 50);
      doc.setFontSize(18);
      doc.text(80, 30, "Chooti Putha Fish Company");
      generatePDFContent(doc);
    };

    const generatePDFContent = (doc) => {
      const headers = [
        "TripID",
        "Boat Name",
        "Trip Type",
        "No Of Employees Joining",
        "Fishing Caught(Kg)",
        "Cost Avg(Rs)",
        "Profit Avg(Rs)",
      ];

      const tableData = filteredBoatTrips.map((boatTrip) => [
        boatTrip.tripID.toString(),
        boatTrip.boatName,
        boatTrip.tripType,
        boatTrip.noOfEmployees.toString(),
        boatTrip.fishingCaught.toString(),
        boatTrip.costAvg.toString(),
        boatTrip.profitAvg.toString(),
      ]);

      doc.autoTable({
        head: [headers],
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
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(15, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
      }

      doc.save("BoatTripPage.pdf");
    };
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let sortedBoatTrips = [...boatTrips];

  if (selectedTripType) {
    sortedBoatTrips = sortedBoatTrips.filter(boatTrip => boatTrip.tripType === selectedTripType);
  }

  if (sortByProfit) {
    sortedBoatTrips = sortedBoatTrips.sort((a, b) => b.profitAvg - a.profitAvg);
  }

  const filteredBoatTrips = sortedBoatTrips.filter(boatTrip =>
    boatTrip.boatName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="boatboattriptable">
      <center>
        <div>
          <h1>Boat Trip Details: {currentDate.toLocaleDateString()}</h1>
        </div>
      </center>
      <div className="boatbuttonContainer">
      </div>
      <div className="boatsearchboattrip">
        <input
          type="text"
          placeholder="Search by Boat Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="boatbuttonContainer">
        <Link to="/tripadd" className="boatboattripaddButton">Add Boat Trip</Link>
      </div>
      <div className="boatsearchAndSortContainer">
        <div className="boatbutton-container">
          <button className={`boatsortprofit ${sortByProfit ? 'active' : ''}`} onClick={handleSortByProfit}>
            Sort by Profit (High to Low)
          </button>
          <div className="boatfilterOptions">
            <select
              value={selectedTripType}
              onChange={handleTripTypeChange}
              className={`${selectedTripType ? 'active' : ''}`}
            >
              <option value="">All Trip Types</option>
              <option value="one_day">One Day</option>
              <option value="one_week">One Week</option>
              <option value="One_month">One Month</option>
            </select>
          </div>
        </div>
        <div className="boatdownloadButtonContainer">
          <Link onClick={downloadPageAsPDF} className="boatdownloadButton">
            Download Trip Details as PDF
          </Link>
        </div>
      </div>
      <table id="boatboattrip-table" className="boattripdetailstable" border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>TripID</th>
            <th>Boat Name</th>
            <th>Trip Type</th>
            <th>No Of Employees Joining</th>
            <th>Fishing Caught(Kg)</th>
            <th>Cost Avg(Rs)</th>
            <th>Profit Avg(Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBoatTrips.map((boatTrip, index) => (
            <tr key={boatTrip._id} style={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#a7e0a6' }}>
              <td>{boatTrip.tripID}</td>
              <td>{boatTrip.boatName}</td>
              <td>{boatTrip.tripType}</td>
              <td>{boatTrip.noOfEmployees}</td>
              <td>{boatTrip.fishingCaught}</td>
              <td>{boatTrip.costAvg}</td>
              <td>{boatTrip.profitAvg}</td>
              <td>
                <button className="boatbtripdeletebt" onClick={() => deleteBoatTrip(boatTrip._id, boatTrip.tripID, boatTrip.boatName)}><i className="fa-solid fa-trash"></i></button>
                <button className="boatbtripupdatebt"><Link to={`/tripupdate/${boatTrip._id}`} className="boatbtripupdatebt"><i className="fa-solid fa-pen-to-square"></i></Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoatTrip;
