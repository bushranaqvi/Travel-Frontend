import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const TravelCard = (props) => {
  const travel = props.travel;
  return (
    <div className="card-container">
      <img src={travel.img} alt="Travels" height={200} />
      <div className="desc">
        <h2>
          <Link to={`/show-travel/${travel._id}`}>{travel.place}</Link>
        </h2>
        <h3>{travel.visitWith}</h3>
        {/* <h2>{travel.visitByDate}</h2> */}
        <h2>{travel.visitByDate.slice(0, 7)}</h2>
      </div>
    </div>
  );
};

export default TravelCard;
