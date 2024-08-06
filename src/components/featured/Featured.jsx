import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find world best <span>Graphic Designers</span> for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "logo design"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>UI/UX Design</button>
            <button>3D Rendering</button>
            <button>Logo Design</button>
            <button>Flyer Design</button>
          </div>
        </div>
        <div className="right">
          <div className="right-co">
            <img src="./img/man.png" alt="" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Featured;