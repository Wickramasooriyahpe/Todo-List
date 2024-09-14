import React from "react";
import './button.css'

//Customizable button component
const CustomButton = ({
  text,
  className,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
    {text}
  </button>
  );
};

export default CustomButton;
