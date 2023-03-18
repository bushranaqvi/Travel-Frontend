import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function ShowTravelDetails(props) {
  const [travel, setTravel] = useState({});
  const token = window.localStorage.getItem("token");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTravel(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowTravelDetails");
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error form ShowTravelDetails_deleteClick");
      });
  };

  const TravelItem = (
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Place</td>
            <td>{travel.place}</td>
          </tr>

          <tr>
            <th scope="row">2</th>
            <td>Image</td>
            <td>{travel.img}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>TravelWith</td>
            <td>{travel.visitWith}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Visit by Date</td>
            <td>{travel.visitByDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Travel List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Travel's Record</h1>
            <p className="lead text-center">View Travel's Info</p>
            <hr /> <br />
          </div>
          <div className="col-md-10 m-auto">{TravelItem}</div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={() => {
                onDeleteClick(travel._id);
              }}
            >
              Delete Travel
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <Link
              to={`/edit-travel/${travel._id}`}
              className="btn btn-outline-info btn-lg btn-block"
            >
              Edit Travel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTravelDetails;
