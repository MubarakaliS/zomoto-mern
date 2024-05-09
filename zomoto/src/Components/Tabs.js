import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Carousels from "./Carousel";
import TabModal from "./TabModal";

const TabsForm = () => {
  const [restaruantData, setRestaurantData] = useState([]);
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { restaurantId } = qs;

  const getRestaurant = () => {
    axios
      .get(`https://backend-api-rlne.onrender.com/getallrestById/${restaurantId}`)
      .then((response) => response.data)
      .then((data) => {
        setRestaurantData(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };

const [modalShow,setModalShow]=useState(false)
const handleModal=()=>{
  setModalShow(true)
}
  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4" style={{ height: "auto" }}>
        <Carousels style={{marginBottom:'20px'}}/>
        <h2
          className="heading"
          style={{ paddingTop: "20px", display: "inline-block" }}
        >
          {restaruantData.name}
        </h2>
        <button className="btn btn-outline-danger " style={{ float: "right" }} onClick={handleModal}>
          Place online order
        </button>
      </div>
      <div className="container mt-3">
        <Tabs>
          <TabList>
            <Tab>Over View</Tab>
            <Tab>Contact</Tab>
          </TabList>

          <TabPanel className="p-3">
            <div className="about">{restaruantData.city}</div>
            <div className="head">Cuisine</div>
            <div className="value">{restaruantData.name}, Fast-food</div>
            <div className="head">Average Cost</div>
            <div className="value">
              &#8377; {restaruantData.min_price} for two people (approx)
            </div>
          </TabPanel>
          <TabPanel className="p-3">
            <div className="head">Phone Number</div>
            <div className="value">+91 {restaruantData.contact_number}</div>
            <div className="head">{restaruantData.name}</div>
            <div className="value">{restaruantData.address}</div>
          </TabPanel>
        </Tabs>
      </div>
      <TabModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default TabsForm;
