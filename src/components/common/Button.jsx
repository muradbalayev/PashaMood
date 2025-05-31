import React from "react";
import { Link } from "react-router-dom";
const Button = ({ text, href, onClick, className }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`px-8 py-3 border-2 border-black  text-black uppercase font-medium hover:bg-black hover:text-white hover:bg-opacity-10 transition duration-300 ${className}`}
    >
      {text}
    </Link>
  );
};

export default Button;
