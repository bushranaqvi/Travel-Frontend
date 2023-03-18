import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const CreateTravel = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [travel, setTravel] = useState({
    place: "",
    img: "",
    visitWith: "",
    visitByDate: "",
  });

  const onChange = (e) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  const token = window.localStorage.getItem("token");
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/travels/`, travel, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTravel({
          place: "",
          img: "",
          visitWith: "",
          visitByDate: "",
        });
        // Push to /
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in CreateTravel!");
      });
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Travel List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Travel</h1>
            <p className="lead text-center">Create new travel</p>

            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Travel"
                  name="place"
                  className="form-control"
                  value={travel.place}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  placeholder="img"
                  name="img"
                  className="form-control"
                  value={travel.img}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="visitWith"
                  name="visitWith"
                  className="form-control"
                  value={travel.visitWith}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  placeholder="visitByDate"
                  name="visitByDate"
                  className="form-control"
                  value={travel.visitByDate}
                  onChange={onChange}
                />
              </div>

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTravel;
