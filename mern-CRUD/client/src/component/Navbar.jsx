import React from "react";

const Navbar = () => {
  return (
     <div className="w-full flex justify-between h-15 items-center bg-gray-200 px-5">
        <div className="w-[10%] h-full flex items-center">
            <h1 className="font-bold text-zinc-800">LOGO</h1>
        </div>
        <div className="w-[50%] h-full">
            <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-md">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
     </div>
  );
};

export default Navbar;