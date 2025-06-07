import{ useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import Productitems from "./productitems";

const LatestCollection = () => {
  const { product } = useContext(ShopContext);
  const [items, setitems] = useState();

  useEffect(()=>{
    setitems(product.slice(0,10))
  },[product])

  return (
    <div className="my-10">
      <div className="flex flex-col items-center pb-3">
        <Title title1={"LATEST"} title2={"COLLECTIONS"} />
        <p className="text-gray-700 text-sm lg:text-md text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="w-3/4 mx-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-x-4">
        {
         items && (
            items.map((item, index)=>{
                return(
                    <Productitems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                )
            })
           )
        }
      </div>
    </div>
  );
};

export default LatestCollection;
