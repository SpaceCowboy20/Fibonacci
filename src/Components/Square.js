import React from "react";

const Square = ({ size, color }) => {
  const squareStyle = {
    width: `${size * 2}rem`,
    height: `${size * 2}rem`,
    backgroundColor: color,
    border: "black solid 1px",
  };
  return <div style={squareStyle}>{size}</div>;
};
export default Square;
