import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../Context/ShopContext";
import Productitems from "../components/productitems";

const Collection = () => {
  const [visiblefilter, setvisiblefilter] = useState(false);

  const { product ,search , showsearch, } = useContext(ShopContext);

  const [collection, setcollection] = useState();
  const [category, setcategory] = useState([]);
  const [type, settype] = useState([]);

  //toggling for category
  const togglecategory = (e)=>{
     if(category.includes(e.target.value)){
       setcategory(prev=> prev.filter(item=> item !== e.target.value));
     }else{
       setcategory(prev=> [...prev, e.target.value]);
     }
  }

  //toggling for type
  const toggletype = (e)=>{
    if(type.includes(e.target.value)){
       settype(prev=>  prev.filter(item=> item !== e.target.value));
     }else{
       settype(prev=> [...prev, e.target.value]);
     }
  }

  //filteringproducts
  const filterproducts = ()=>{
    let productscopy = product.slice();

    if(!showsearch && search){
      productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productscopy = productscopy.filter(item => category.includes(item.category));
    }

    if(type.length > 0){
      productscopy = productscopy.filter(item => type.includes(item.subCategory));
    }

    setcollection(productscopy);
  }

  // sortprice 
  const sortprice = (e)=>{

    let pricecopy = collection.slice();

    switch(e.target.value){
       
      case 'Low high':
      setcollection(pricecopy.sort((a, b)=> a.price - b.price));
      break;

      case 'high Low':
      setcollection(pricecopy.sort((a, b)=> b.price - a.price));
      break;

      default:
      filterproducts();
      break;
    }
  }

  useEffect(()=>{
    filterproducts();
  },[category, type, showsearch, search, product])

  return (
    <div className="flex md:flex-row flex-col w-full lg:w-3/4  mx-auto">
      <div className="my-10 md:my-20 px-6 w-full md:w-2/6 lg:w-1/4 ">
        <div
          onClick={() => {
            setvisiblefilter(!visiblefilter);
          }}
          className="flex gap-3 items-center"
        >
          <h1 className="text-xl ">FILTERS</h1>
          <img
            src={assets.dropdown_icon}
            className={`w-3 h-4 md:hidden block transition ${
              visiblefilter ? "rotate-90" : "rotate-0"
            }`}
            alt="dropdown"
          />
        </div>
        <div className="flex ">
          <div className={`md:block ${visiblefilter ? " w-3/4 " : "hidden"} `}>
            {/* left side  */}
            <div className="flex flex-col text-gray-700 border-2 mb-4 px-5 py-3 ">
              {/* Category Filter */}
              <p className="text-black text-md">CATEGORIES</p>
              <div>
                <p className="py-1">
                  <input type="checkbox" value="Men" onChange={togglecategory} />
                  &nbsp; Men
                </p>
                <p className="py-1">
                  <input type="checkbox" value="Women" onChange={togglecategory} />
                  &nbsp; Women
                </p>
                <p className="py-1">
                  <input type="checkbox" value="Kids" onChange={togglecategory} />
                  &nbsp; Kids
                </p>
              </div>
            </div>
            <div className="flex flex-col text-gray-700 border-2 mb-4 px-5 py-3">
              {/* type Filter */}
              <p className="text-black text-md">TYPE</p>
              <div>
                <p className="py-1">
                  <input type="checkbox" value="Topwear" onChange={toggletype}/> Topwear
                </p>
                <p className="py-1">
                  <input type="checkbox" value="Bottomwear" onChange={toggletype}/> Bottomwear
                </p>
                <p className="py-1">
                  <input type="checkbox" value="Winterwear" onChange={toggletype}/> Winterwear
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col ">
      <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-3 md:justify-between justify-evenly my-8">
        <div>
          <Title title1="ALL" title2="COLLECTIONS" />
        </div>
        <div className="pr-5">
          <select onChange={sortprice} className="py-3 px-4 border-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="Low high">Sort by: Low to High</option>
            <option value="high Low">Sort by: High to Low</option>
          </select>
        </div>
      </div>
      {/* collection */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-x-4">
        {collection &&
          collection.map((item, index) => {
            return (
              <Productitems
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            );
          })}
      </div>
      </div>    
    </div>
  );
};

export default Collection;
