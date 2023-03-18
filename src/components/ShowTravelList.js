import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TravelCard from "./TravelCard";

function ShowTravelList() {
  const [travels, setTravels] = useState([]);
  const token = window.localStorage.getItem("token");
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTravels(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowTravelList");
      });
  }, []);

  const travelList =
    travels.length === 0
      ? "there is no travel record!"
      : travels.map((travel, k) => <TravelCard travel={travel} key={k} />);

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Travel Goals</h2>
          </div>

          <div className="col-md-11">
            <Link
              to="/create-travel"
              className="btn btn-outline-warning float-right"
            >
              + Add New Travel
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="list">{travelList}</div>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}

export default ShowTravelList;
