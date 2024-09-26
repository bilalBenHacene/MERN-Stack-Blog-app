import React from "react";
import Logo from "../logo/logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 w-auto h-14 bg-purple-900 text-white font-semibold">
      <div className="bg-white w-10 h-10 rounded-full p-1">
      <Logo />
      </div>
      <ul className="list-none flex justify-between items-center">
        
        <Link to={'/'} className="mr-5 hover:text-gray-300">
          <li className="list-none">Home</li>
        </Link>
        
        <Link to={'/add'} className="mr-5 hover:text-gray-300">
          <li className="list-none">+ Add</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
