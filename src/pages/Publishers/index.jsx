import React from "react";
import "./index.scss";

const Publishers = ({ publisher }) => {
  return (
    <div className="Publishers">
      <h1>{publisher.title}</h1>
    </div>
  );
};

export default Publishers;
