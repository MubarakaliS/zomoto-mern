import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import pic1 from "../Assets/snacks.jpg";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const CarouselModal = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const [restaruantData, setRestaurantData] = useState([]);
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { restaurantId } = qs;
  const getRestaurant = async () => {
    await axios
      .get(`https://backend-api-rlne.onrender.com/getallrestById/getallrestById/${restaurantId}`)
      .then((response) => response.data)
      .then((data) => {
        setRestaurantData(data.thumb);
        console.log(data.thumb);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };

  useEffect(() => {
    getRestaurant();
  }, [restaurantId]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="m-0 p-0" onClick={() => setModalShow(true)}>
        <Carousel showThumbs={false} showIndicators={false}>
          {restaruantData.length > 0 ? (
            restaruantData.map((items, index) => {
              return (
                <div
                  style={{
                    height: "400px",
                    width: "100%",
                    padding: "0px 50px",
                  }}
                  key={index}
                >
                  <img src={items} alt="not found" />
                </div>
              );
            })
          ) : (
            <div
              style={{ height: "400px", width: "100%", padding: "0px 50px" }}
            >
              <img src={pic1} alt="not found" />
            </div>
          )}
        </Carousel>
      </div>
    </Modal>
  );
};

export default CarouselModal;
