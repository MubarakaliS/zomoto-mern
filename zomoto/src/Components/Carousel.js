import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselModal from "./CarouselModal";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import pic1 from "../Assets/snacks.jpg";

const Carousels = () => {
  const [modalShow, setModalShow] = useState(false);
  const [restaruantData, setRestaurantData] = useState([]);
  
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { restaurantId } = qs;

  useEffect(() => {
    async function getRestaurant() {
      try {
        const response = await axios.get(`https://backend-api-rlne.onrender.com/getallrestById/${restaurantId}`);
        setRestaurantData(response.data.thumb);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    }
    getRestaurant();
  }, [restaurantId]);

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Carousel showThumbs={false}>
          {restaruantData.length > 0 ? (
            restaruantData.map((item, index) => (
              <div
                style={{ height: "400px", width: "100%", padding: "0px 50px" }}
                onClick={() => setModalShow(true)}
                key={index}
              >
                <img src={item ? item : pic1} alt="not found" />
              </div>
            ))
          ) : (
            <div style={{ height: "400px", width: "100%", padding: "0px 50px" }}>
              <img src={pic1} alt="not found" />
            </div>
          )}
        </Carousel>
      </div>
      <CarouselModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Carousels;
