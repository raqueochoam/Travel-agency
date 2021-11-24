import React from 'react';
import "./home.css"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="title">Travel around Mexico</h1>
      <div className="hc">
        <div className="rowh">
          <div className="colh ci">
              <img alt="" src="https://cdn.picpng.com/planes/download-planes-38909.png" className="homeimg"></img>
          </div>
          <div className="colh">
              <h2 className="t2">Search our destinations</h2>
              <Link to={"/destinations"} className="btn btn-primary get-started-btn mt-1 mb-1 hs"> Browse</Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
