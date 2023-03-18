import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import CreateTravel from "./components/CreateTravel";
import ShowTravelList from "./components/ShowTravelList";
import ShowTravelDetails from "./components/ShowTravelDetails";
import UpdateTravelInfo from "./components/UpdateTravelInfo";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <div>
          <div>
            <Routes>
              <Route
                exact
                path="/"
                element={isLoggedIn === "true" ? <ShowTravelList /> : <Login />}
              />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                exact
                path="/show-travel-list"
                element={<ShowTravelList />}
              />
              <Route path="/create-travel" element={<CreateTravel />} />
              <Route path="/edit-travel/:id" element={<UpdateTravelInfo />} />
              <Route path="/show-travel/:id" element={<ShowTravelDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
