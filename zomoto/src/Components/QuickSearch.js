import React, { useEffect, useState } from "react";
import "../style/HomeStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const QuickSearch = () => {
  const [mealData, setMealData] = useState([]);
  const navigate = useNavigate();
  const getMealData = () => {
    axios
      .get(`http://localhost:4000/getallmeal`)
      .then((response) => response.data)
      .then((data) => {
        setMealData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };
  const selectingMeal = (item) => {
    sessionStorage.setItem('mealType',item.name)
    const locationId = sessionStorage.getItem("locationId");
    if (locationId) {
      navigate(`/filter?mealTypeId=${item.meal_type}&locationId=${locationId}`);
    } else {
      navigate(`/filter?mealTypeId=${item.meal_type}`);
    }
  };
  useEffect(() => {
    getMealData();
  }, []);
  const imag = "../Assets/dinner.jpg";
  return (
    <>
      <div className="container">
        <h1 className="display-6">Quick Searches</h1>
        <span className="text-muted">Discover Restaurent by type of meal</span>
        <div className="row mb-5 row-col-md-2 row-col-sm-3">
          {mealData.map((item, index) => {
            const name = item.image;
            console.log(typeof name);
            const pic1 = `/${item.image}`;
            console.log(pic1);
            return (
              <div
                className="col-10 col-lg-4 col-md-6 col-sm-10"
                key={item._id}
                style={{ cursor: "pointer" }}
                onClick={() => selectingMeal(item)}
              >
                <div className="foodBox justify-content-center text-wrap">
                  <img
                    src={item.image}
                    alt={`Thumbnail of ${item.name}`}
                  />
                  <h1
                    style={{ fontSize: "2.0em", justifyContent: "left" }}
                    className="p-2 mx-2"
                  >
                    {item.name}
                  </h1>
                  <h3
                    style={{
                      fontSize: "0.8em",
                      justifyContent: "left",
                      marginLeft: "5px",
                    }}
                    className="p-2 mr-2"
                  >
                    {item.content}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuickSearch;
