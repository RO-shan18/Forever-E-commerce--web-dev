import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { useSelector } from "react-redux";

const Products = () => {
  //get the products from redux store
  const productitems = useSelector((store)=> store?.products?.getproducts)

  //get the currency symbol from redux store
  const currency = useSelector((store)=> store.Utility.currency);

  const { productId } = useParams();
  const {getcartitems} = useContext(ShopContext);
  const [products, setproducts] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");

  const getproduct = async () => {
    if(productitems.length > 0){
      let foundproduct = productitems[0].find((item) => item._id === productId);

      if(foundproduct){
        setproducts(foundproduct);
        setimage(foundproduct.image[0]);
      }
    }
  };

  useEffect(() => {
    getproduct();
  }, [productId, productitems]);


  return(
    <div className=" my-10 md:my-20">
      {/* Product info section */}
      <div className="flex flex-col md:grid grid-cols-[0.5fr_2fr_2fr] lg:px-0 px-5 lg:grid-cols-[1fr_3fr_2fr] gap-5 md:gap-1 lg:gap-5 w-full  lg:w-3/4 mx-auto">
          <div className="flex md:flex-col md:px-0 px-5 flex-row md:justify-start justify-center gap-2">
             {
               products && 
               (
                 products.image.map((item, index)=> {
                   return <img onClick={()=> setimage(item)} className="h-1/6 w-1/4 md:w-full lg:h-2/4" key={index} src={item} alt="smallimage" />
                 })
               )
             }
          </div>
          <div className="flex justify-center">
             { image && <img className="h-3/4 w-full lg:h-full" src={image} alt="bigimage" />}
          </div>
          <div className="flex flex-col w-full  gap-3 lg:gap-6">
            <div className="flex flex-col ">
              <h1 className="text-lg lg:text-xl font-bold">Men Round Neck Pure Cotton T-shirt</h1>
              <div className="flex justify-start gap-1 pt-3 items-center">
                <img src={assets.star_icon} className="w-3 lg:w-4 h-3 lg:h-4" alt="starimage" />
                <img src={assets.star_icon} className="w-3 lg:w-4 h-3 lg:h-4" alt="starimage" />
                <img src={assets.star_icon} className="w-3 lg:w-4 h-3 lg:h-4" alt="starimage" />
                <img src={assets.star_icon} className="w-3 lg:w-4 h-3 lg:h-4" alt="starimage" />
                <img src={assets.star_dull_icon} className="w-3 lg:w-4 h-3 lg:h-4" alt="stardullimage" />
                <p className="text-sm lg:text-md">(122)</p>
              </div>
              </div>
              <p className="text-lg lg:text-xl font-semibold">{currency}{products.price}</p>
              <p className="text-sm text-gray-700">A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
              <p className="text-md lg:text-lg text-gray-700">Select Size</p>
              <div className="flex flex-start gap-2">
                {
                  products.sizes && 
                  (
                    products.sizes.map((item, index)=> <button onClick={()=> setsize(item)} key={index} className={`border-2 px-2 py-1 lg:px-3 lg:py-2 text-lg ${size === item ? "border-orange-300" : " "}`}>{item}</button>)
                  )
                }
              </div>
              <button onClick={()=> getcartitems(productId, size)} className="text-sm px-3 py-2 lg:px-5 lg:py-3 bg-black text-white w-2/4 sm:w-1/3">ADD TO CART</button>
              <hr className="h-[2px] bg-gray-300  lg:block md:hidden block"></hr>
              <div className="flex flex-col gap-0 lg:gap-1 lg:block md:hidden ">
              <p className="text-sm text-gray-700">100% Original product.</p>
              <p className="text-sm text-gray-700">Cash on delivery is available on this product.</p>
              <p className="text-sm text-gray-700">Easy return and exchange policy within 7 days.</p>
              </div>
          </div>
      </div>

      {/* Description */}
      <div className="flex flex-col justify-start my-10 md:my-0 lg:my-20 w-full md:w-3/4 mx-auto ">
        <div className="flex ">
          <p className="border-2 text-lg font-semibold text-black py-3 px-5">Description</p>
          <p className="border-2 text-lg font-semibold text-gray-700  py-3 px-5">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-3 border-2">
          <p className=" text-gray-700 px-5 pt-5 text-sm">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p className=" text-gray-700 px-5 py-5 text-sm">E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* Related Product */}
      <div className="my-10 md:my-20">
          <RelatedProducts category={products.category} subcategory={products.subCategory}/>
      </div>
    </div>
  )
};

export default Products;
