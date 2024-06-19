import React, { useEffect, useState , useRef } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import "./FishBuyer.css";
import "jspdf-autotable";
import logo from "../../backgroundimage/logo.jpg";




const FishBuyer = () => {

  const navigate = useNavigate();
  const gotoNav = () => {
    navigate("/dashboard");
  };
 // const [fishbuyers, setFishBuyers] = useState([]);
  //const [searchName, setSearchName] = useState('');
  


  const [fishbuyers, setFishBuyers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false); // Track confirmation state
  const [deleteId, setDeleteId] = useState(null); // Track id of fish to delete
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [recordsPerPage] = useState(20); // Records per page
  const tableRef = useRef(null);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/api/buyer/getAllbuyers");
      setFishBuyers(response.data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



 /* const deleteFishBuyer = async (fishbuyerId) => {
    if (window.confirm("Are you sure you want to delete this fish buyer?")) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/deletebuyer/${fishbuyerId}`);
        setFishBuyers(prevFishBuyers => prevFishBuyers.filter(fishbuyer => fishbuyer._id !== fishbuyerId));
        toast.success(response.data.msg, { position: 'top-right' });
      } catch (error) {
        console.error("Error deleting fish buyer: ", error);
        toast.error("An error occurred while deleting fish buyer", { position: 'top-right' });
      }
    }
  }
  */
  const handleDelete = async () => {
    if (deleteId) {
      await axios
        .delete(`http://localhost:4000/api/buyer/deletebuyer/${deleteId}`)
        .then((response) => {
          setFishBuyers((prevFishBuyers ) =>
          prevFishBuyers.filter((fishbuyer) => fishbuyer._id !== deleteId)
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
    setSearchTerm(event.target.value);
  };


  /*const filteredFishBuyers = fishbuyers.filter(fishbuyer =>
    fishbuyer.name.toLowerCase().includes(searchName.toLowerCase())
  );
*/
const filteredFishBuyers = fishbuyers.filter(fishbuyer =>
  fishbuyer.name.toLowerCase().includes(searchTerm.toLowerCase())
);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = filteredFishBuyers.slice(
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
      doc.setFontSize(20);
      doc.text(80, 30, "Chooti Putha Fish Company"); // Adjust position as needed
      generatePDFContent(doc);
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();


    const generatePDFContent = (doc) => {
      const tableData = currentRecords.map(
        ({
          name,
          contact_number ,
          last_payment_option,
          last_payment,
          last_buy_quantity,
          total_payment,
          arrear,
          last_purchase_date ,
   
        }) => [
          name,
          contact_number ,
          last_payment_option,
          last_payment,
          last_buy_quantity,
          total_payment,
          arrear,
          last_purchase_date ,
        ]
      );
  
      doc.autoTable({
        head: [
          [
            "Name",
            "Contact Number",
            "Last Payment Option",
            "Last Payment",
            "Last Buy Quantity",
            "Total Payment ",
            "Arrear ",
            "Last Purchase Date",
       
          ],
        ],
        body: tableData,
        startY: 80, // Adjust the startY position to leave space for the logo and company name
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 11,
          cellPadding: 2,
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 18 },
          7: { cellWidth: 25 },
        },
      });
       // Add current date and time
    doc.setFontSize(12);
    doc.text(80, 50, `Date: ${formattedDate}`);
    doc.text(80, 60, `Time: ${formattedTime}`);
      // Add footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(15, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
      }
  
      // Save PDF
      doc.save("Fish_buyers.pdf");
    };
  };

  /*return (
    <div className='FishBuyerTable'>
          
      <h1><center><b>Fish Buyer Management</b></center></h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <Link to={"/add"} className='addButton'>Add A New Fish Buyer</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th className='header2'>Name</th>
            <th className='header1'>Contact Number</th>
            <th className='header2'>Last Payment Option</th>
            <th className='header1'>Last Payment</th>
            <th className='header2'>Total Payment </th>
            <th className='header2'>Arrear </th>
            <th className='header1'>Last Purchase Date</th>
            <th className='header1'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFishBuyers.map((fishbuyer, index) => (
            <tr key={fishbuyer._id} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
              <td>{fishbuyer.name}</td>
              <td>{fishbuyer.contact_number}</td>
              <td>{fishbuyer.last_payment_option}</td>
              <td>{fishbuyer.last_payment}</td>
              <td>{fishbuyer.total_payment}</td>
              <td>{fishbuyer.arrear}</td>
              <td>{fishbuyer.last_purchase_date}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteFishBuyer(fishbuyer._id)}>Delete</button>
                <Link to={`/edit/${fishbuyer._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
*/


return (
  <div className="FishBuyerTable">
    <div className="fishbuyerheader">
      <div className="fishbuyerbuttonGroup">
        <div className="fishbuyerbackb">
          <div onClick={gotoNav}>Back To Dashboard</div>
        </div>
        <div className="fishbuyersearchBar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <center>
        <h1 className="fishbuyerdate">
          {currentDate.toLocaleDateString()} Fish Buyer Management
        </h1>
      </center>
    
      <div className="fishbuyercenterfix">
        <div className="fishbuyeraddButton1">
          <Link to={"/addfishbuyer"} className="link">
            Add A New Fish Buyer
          </Link>
        </div>
       
        <div className="fishbuyerdownloadButtonContainer">
          <button onClick={downloadPDF} className="fishbuyerdownloadButton">
            Download Fish Buyer Document
          </button>
        </div>
      </div>
      
    </div>
    <div id="fishbuyertable-container" ref={tableRef}>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th className="fishbuyerheader2">Name</th>
            <th className="fishbuyerheader1">Contact Number</th>
            <th className="fishbuyerheader2">Last Payment Option</th>
            <th className="fishbuyerheader1">Last Payment(Rs)</th>
            <th className="fishbuyerheader1">Last Buy Quantity(kg)</th>
            <th className="fishbuyerheader2">Total Payment(Rs)</th>
            <th className="fishbuyerheader1">Arrear(Rs)</th>
            <th className="fishbuyerheader2">Last Purchase Date</th>
            <th className="fishbuyerheader1">Action</th>
           
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((fishbuyer, index) => {
            return (
              <tr
                key={fishbuyers._id}
                className={index % 2 === 0 ? "evenRow" : "oddRow"}
              >
                <td>{fishbuyer.name}</td>
                <td>{fishbuyer.contact_number}</td>
                <td>{fishbuyer.last_payment_option}</td>
                <td>{parseFloat(fishbuyer.last_payment).toFixed(2)}</td>
                <td>{fishbuyer.last_buy_quantity}</td>
                <td>{parseFloat(fishbuyer.total_payment).toFixed(2)}</td>
                <td>{parseFloat(fishbuyer.arrear).toFixed(2)}</td>
                <td>{fishbuyer.last_purchase_date}</td>
                
                
                <td className="fishbuyeractionButtons">
                  <button
                    onClick={() => {
                      setDeleteId(fishbuyer._id);
                      setConfirmDelete(true);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>Delete
                    
                  </button>
                  <Link to={`/editfishbuyer/${fishbuyer._id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    {/* Pagination */}
    <div className="fishbuyerpagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={indexOfLastRecord >= filteredFishBuyers.length}
      >
        Next
      </button>
    </div>
    {/* Confirmation modal */}
    {confirmDelete && (
      <div className="fishbuyerconfirmationModal">
        <div className="fishbuyerconfirmationContent">
          <h2>Do You Want Delete This Fish Buyer?</h2>
          <div className="fishbuyerconfirmationButtons">
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default FishBuyer;
