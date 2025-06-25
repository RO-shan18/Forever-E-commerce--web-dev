import { useEffect, useState } from "react";
import Productitems from "./productitems";
import Title from "./Title";
import { useSelector } from "react-redux";
import usegetproducts from "../hooks/usegetproducts"

const BestSeller = () => {
  //get all products
  usegetproducts();

  //get the products from redux store
  const productitems = useSelector((store) => store?.products?.getproducts);
  const [bestproducts, setbestproducts] = useState();

  useEffect(() => {
    //Filter the products
    if (productitems.length > 0) {
      const filterproducts = productitems[0].filter(
        (items) => items.bestseller === true
      );
      setbestproducts(filterproducts.slice(0, 5));
    }
  }, [productitems]);

  return (
    <div className="my-10">
      <div className="flex flex-col items-center pb-3">
        <Title title1={"BEST"} title2={"SELLER"} />
        <p className="text-gray-700 text-sm lg:text-md text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="w-3/4 mx-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-x-4">
        {bestproducts &&
          bestproducts.map((item, index) => {
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
  );
};

export default BestSeller;
