import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const {setshowsearch, countcartitems, navigate, setcartitems, setlogin, login} = useContext(ShopContext);

  const loggedout = ()=>{
    navigate('/login');
    localStorage.removeItem('token');
    setlogin('');
    setcartitems({});

  }

  return (
    <div className="flex justify-between items-center py-3 lg:justify-evenly px-5">
      <Link to="/"><img src={assets.logo} className="w-36 sm:w-48 " alt="logo" /></Link>

      <ul className="lg:flex justify-between items-center text-xl hidden ">
        <NavLink
          to="/"
          className="flex flex-col justify-center items-center px-3  "
        >
          <p>Home</p>
          <hr className="w-2/3 h-[1.3px] bg-black hidden"></hr>
        </NavLink>
        <NavLink
          to="/Collection"
          className="flex flex-col justify-center items-center px-3 "
        >
          <p>Collection</p>
          <hr className="w-2/3 h-[1.3px] bg-black hidden"></hr>
        </NavLink>
        <NavLink
          to="/About"
          className="flex flex-col justify-center items-center px-3 "
        >
          <p>About</p>
          <hr className="w-2/3 h-[1.3px] bg-black hidden"></hr>
        </NavLink>
        <NavLink
          to="/Contact"
          className="flex flex-col justify-center items-center px-3 "
        >
          <p>Contact</p>
          <hr className="w-2/3 h-[1.3px] bg-black hidden"></hr>
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        <img onClick={()=> setshowsearch(false)} src={assets.search_icon} className="w-4 sm:w-5" alt="search" />

        <div className="group relative">
          <img onClick={()=> login ? null : navigate('/Login')} src={assets.profile_icon} className="w-4 sm:w-5" alt="profile" />
          {login && 
            <div className="group-hover:block hidden absolute dropdown-menu -right-6 px-4">
              <div className="flex flex-col w-36 px-5 py-3 bg-slate-100 text-gray-500">
                <p className="hover:text-black cursor-pointer">My Profile</p>
                <Link to='/Orders'><p className="hover:text-black cursor-pointer">Orders</p></Link>
                <p onClick={loggedout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          }
        
        </div>

        <Link
          to="/Cart"
          className="flex flex-col items-center w-4 sm:w-5 relative"
        >
          <img src={assets.cart_icon} alt="cart-icon" className="" />
          <p className="absolute -bottom-1 -right-3 bg-black text-white rounded-full text-[9px] px-[3px] py-[1px]">
            {countcartitems()}
          </p>
        </Link>
      </div>

      <img
        onClick={() => {
          setvisible(true);
        }}
        className="w-5 lg:hidden"
        src={assets.menu_icon}
        alt="menuicon"
      />

      {/* show dropdown list for small screen */}
      {visible && (
        <div className="absolute w-full bg-white right-0 left-1 top-2 h-full transition-all durtion-500 ease-in-out">
          <div className="flex gap-3 items-center ">
            <img src={assets.dropdown_icon} className="rotate-180 w-2" alt="" />
            <p onClick={()=> {setvisible(false)}}>Back</p>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <NavLink to="/" onClick={()=> {setvisible(false)}} className="text-gray-500 cursor-pointer hover:text-black px-3 "><p>HOME</p></NavLink>
             <NavLink to="/Collection" onClick={()=> {setvisible(false)}} className="text-gray-500 cursor-pointer hover:text-black px-3 "><p>COLLECTION</p></NavLink>
             <NavLink to="/About" onClick={()=> {setvisible(false)}} className="text-gray-500 cursor-pointer hover:text-black px-3 "><p>ABOUT</p></NavLink>
             <NavLink to="/Contact" onClick={()=> {setvisible(false)}} className="text-gray-500 cursor-pointer hover:text-black px-3 "><p>CONTACT</p></NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
