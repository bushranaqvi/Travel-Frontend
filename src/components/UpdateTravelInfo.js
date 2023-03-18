import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UpdateTravelInfo(props) {
  const [travel, setTravel] = useState({
    place: "",
    img: " ",
    visitWith: "",
    visitByDate: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTravel({
          place: res.data.place,
          img: res.data.img,
          visitWith: res.data.visitWith,
          visitByDate: res.data.visitByDate,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateTravelInfo");
      });
  }, [id]);

  const onChange = (e) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      place: travel.place,
      img: travel.img,
      visitWith: travel.visitWith,
      visitByDate: travel.visitByDate,
    };

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        navigate(`/show-travel/${id}`);
      })
      .catch((err) => {
        console.log("Error in UpdateTravelInfo!");
      });
  };

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Travel List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Travel</h1>
            <p className="lead text-center">Update Travel's Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="place">Place</label>
              <input
                type="text"
                placeholder="Place to visit"
                name="place"
                className="form-control"
                value={travel.place}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="img">image</label>
              <input
                type="text"
                placeholder="image"
                name="img"
                className="form-control"
                value={travel.img}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="visitWith">Visit with</label>
              <input
                type="text"
                placeholder="visitWith"
                name="visitWith"
                className="form-control"
                value={travel.visitWith}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="visitByDate">Visit By Date</label>
              <input
                type="date"
                placeholder="Visit By Date"
                name="visitByDate"
                className="form-control"
                value={travel.visitByDate}
                onChange={onChange}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Travel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTravelInfo;
