import React from "react";
import "./Dashboard.css";
import inventoryImg from "./dashboardimage/inventory.png";
import fishpricehandling from "./dashboardimage/fishprice.png";
import boat from "./dashboardimage/boat.jpg";
import equipment from "./dashboardimage/equipment.jpeg";
import catchlog from "./dashboardimage/catchlog.jpg";
import salary from "./dashboardimage/salary.jpg";
import hr from "./dashboardimage/hr.jpg";
import vehicle from "./dashboardimage/vehicle.jpeg";
import fbuy from "./dashboardimage/fbuy.png";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ position }) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* owner */}
        {position === "owner" && (
          <>
            <div className="dash-item">
              <img src={fishpricehandling} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fish Price Handling </div>
                <div className="dash-item-button">
                  <button
                    onClick={() => {
                      navigate("/fishprice");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={salary} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name"> Salary Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/empsalary");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={boat} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Boat Trip Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/boattrip");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={equipment} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Equipment Handling </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/equipment");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={vehicle} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Vehicle Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/vehiclemanagement");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={fbuy} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fish Buyers Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/FishBuyer");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={catchlog} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Catch Log Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/Catchlog");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={hr} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fishermen Profile Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishermenprofiles");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/*coordinator*/}
        {position === "coordinator" && (
         <>
         <div className="dash-item">
           <img src={fishpricehandling} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fish Price Handling </div>
             <div className="dash-item-button">
               <button
                 onClick={() => {
                   navigate("/fishprice");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={salary} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name"> Salary Management</div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/empsalary");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={boat} alt="" />
           <div className="dash-item-bottom">
             <div className="dash-item-name">Boat Trip Management</div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/boattrip");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={equipment} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Equipment Handling </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/equipment");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={vehicle} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Vehicle Management </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/vehiclemanagement");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={fbuy} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fish Buyers Management </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/FishBuyer");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={catchlog} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Catch Log Management</div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/Catchlog");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={hr} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fishermen Profile Management </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/fishermenprofiles");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
       </>
        )}

        {/* Transport */}
        {position === "tansportmanager" && (
          <>
            <div className="dash-item">
              <img src={boat} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Boat Trip Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/boattrip");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>

            <div className="dash-item">
              <img src={vehicle} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Vehicle Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/vehiclemanagement");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Inventory*/}
        {position === "inventorymanager" && (
          <>
         <div className="dash-item">
           <img src={fishpricehandling} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fish Price Handling </div>
             <div className="dash-item-button">
               <button
                 onClick={() => {
                   navigate("/fishprice");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={equipment} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Equipment Handling </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/equipment");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={fbuy} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fish Buyers Management </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/FishBuyer");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
         <div className="dash-item">
           <img src={catchlog} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Catch Log Management</div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/Catchlog");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>
          </>
        )}
        {/* wirtting person */}

        {position === "writtingperson" && (
          <>
           
            <div className="dash-item">
              <img src={fishpricehandling} alt="" />
              <div className="centered">
              <div className="dash-item-bottom">
                <div className="dash-item-name">Fish Price Handling </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishprice");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            </div> 
          </>
        )}

        {/*Human Resouse manager */}
        {position === "hrmanager" && (
          <>
        <div className="dash-item">
           <img src={fbuy} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name">Fish Buyers Management </div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/FishBuyer");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>

         <div className="dash-item">
           <img src={salary} alt="" />

           <div className="dash-item-bottom">
             <div className="dash-item-name"> Salary Management</div>
             <div className="dash-item-button">
             <button
                 onClick={() => {
                   navigate("/empsalary");
                 }}
               >
                 Manage
               </button>
             </div>
           </div>
         </div>

         <div className="dash-item">
              <img src={hr} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fishermen Profile Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishermenprofiles");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>

            <div className="dash-item">
              <img src={boat} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Boat Trip Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/boattrip");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>  
          </>
        )}

        {position === "" && (
          <>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fish Price Handling </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishprice");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name"> Salary Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishprice");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Boat Trip Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/boattrip");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Equipment Handling </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/equipment");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Vehicle Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/vehiclemanagement");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Buyer Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/FishBuyer");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Catch Log Management</div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/Catchlog");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
            <div className="dash-item">
              <img src={inventoryImg} alt="" />

              <div className="dash-item-bottom">
                <div className="dash-item-name">Fishermen Profile Management </div>
                <div className="dash-item-button">
                <button
                    onClick={() => {
                      navigate("/fishermenprofiles");
                    }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


