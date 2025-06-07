import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { BackendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({login}) => {

  const [image1, setimage1] = useState(false); 
  const [image2, setimage2] = useState(false); 
  const [image3, setimage3] = useState(false); 
  const [image4, setimage4] = useState(false); 

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('Men');
  const [subCategory, setsubCategory] = useState('Topwear');
  const [price, setprice] = useState('');
  const [sizes, setsizes] = useState([]);
  const [bestseller, setbestseller] = useState(false);


  const onsubmithandler = async (event)=>{
    try{
      event.preventDefault();

      let formdata = new FormData();

      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('category', category);
      formdata.append('subCategory', subCategory);
      formdata.append('price', price);
      formdata.append('sizes', JSON.stringify(sizes));
      formdata.append('bestseller', bestseller);

      image1 && formdata.append('image1', image1)
      image2 && formdata.append('image2', image2)
      image3 && formdata.append('image3', image3)
      image4 && formdata.append('image4', image4)

      let response = await axios.post(BackendUrl + '/api/product/add',formdata,{headers:{login}})

      if(response.data.success){
         toast.success(response.data.message);
         setname('');
         setimage1('');
         setimage2('');
         setimage3('');
         setimage4('');
         setdescription('');
         setprice('');
         setsizes([]);
         setbestseller(false);
      }else{
        toast.error(response.data.message)
      }

    }catch(error){
        toast.error(response.data.message)
    }
  }
  return (
    <div>
      <form onSubmit={onsubmithandler} className="flex flex-col gap-5 mt-5 mx-10 sm:w-full ">
        <div className="flex gap-2 flex-col">
          <p className="text-gray-700">Upload image</p>
          <div className="flex gap-5">
          <label htmlFor="image1">
            <img  className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="image1" />
            <input onChange={(e)=> setimage1(e.target.files[0])} className="hidden" type="file" id="image1" />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="image1" />
            <input onChange={(e)=> setimage2(e.target.files[0])} className="hidden"  type="file" id="image2" />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="image1" />
            <input onChange={(e)=> setimage3(e.target.files[0])} className="hidden"  type="file" id="image3" />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="image1" />
            <input onChange={(e)=> setimage4(e.target.files[0])} className="hidden"  type="file" id="image4" />
          </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Product name</p>
          <input onChange={(e)=> setname(e.target.value)} value={name} className="border-2 px-3 py-1 sm:w-full w-80" type="text" placeholder="Type here...."/>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Product description</p>
          <textarea onChange={(e)=> setdescription(e.target.value)} value={description} className="border-2 px-3 sm:w-full w-80"  placeholder="Type description here...."></textarea>
        </div>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-3">
          <p className="text-gray-700">Category</p>
          <select onChange={(e)=> setcategory(e.target.value)} value={category}  className="border-2 px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-gray-700">Sub category</p>
           <select onChange={(e)=> setsubCategory(e.target.value)} value={subCategory} className="border-2 px-3 py-2">
            <option value="Topwear" className="text-gray-700 text-gray-700 border-2">Topwear</option>
            <option value="Bottomwear" className="text-gray-700 text-gray-700 border-2">Bottomwear</option>
            <option value="Winterwear" className="text-gray-700 text-gray-700 border-2">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Product price</p>
          <input onChange={(e)=> setprice(e.target.value)} value={price} className="border-2 px-3 py-2" type="number" placeholder="25"/>
        </div>
        </div>

        <div className="flex flex-col gap-2 text-gray-700 ">
          <p className="text-gray-700">Sizes</p>
          <div className="flex gap-4">
          <p onClick={()=> setsizes((prev) => prev.includes("S") ? sizes.filter(s => s!=="S") : [...prev, "S"])} className={`${sizes.includes("S") ? 'bg-gray-300' : 'bg-white'} px-2 py-1 border-2 `} >S</p>
          <p onClick={()=> setsizes((prev) => prev.includes("M") ? sizes.filter(s => s!=="M") : [...prev, "M"])} className={`${sizes.includes("M")? 'bg-gray-300' : 'bg-white'} px-2 py-1 border-2`}>M</p>
          <p onClick={()=> setsizes((prev) => prev.includes("L") ? sizes.filter(s => s!=="L") : [...prev, "L"])} className={`${sizes.includes("L") ? 'bg-gray-300' : 'bg-white'} px-2 py-1 border-2`}>L</p>
          <p onClick={()=> setsizes((prev) => prev.includes("XL") ? sizes.filter(s => s!=="XL") : [...prev, "XL"])} className={`${sizes.includes("XL") ? 'bg-gray-300' : 'bg-white'} px-2 py-1 border-2`}>XL</p>
          <p onClick={()=> setsizes((prev) => prev.includes("XXL") ? sizes.filter(s => s!=="XXL") :[...prev, "XXL"])} className={`${sizes.includes("XXL") ? 'bg-gray-300' : 'bg-white'} px-2 py-1 border-2`}>XXL</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input onChange={(e)=> setbestseller(!bestseller)} checked={bestseller} type="checkbox" alt="checkbox" />
          <p className="text-gray-700" >Add to bestseller</p>
        </div>

        <div className="bg-black text-white text-xl px-3 py-1 text-center w-1/4">
          <input type="submit" value="ADD" />
        </div>
      </form>
    </div>
  );
};

export default Add;
