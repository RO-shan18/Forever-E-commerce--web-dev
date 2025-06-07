import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import Productitems from "./productitems";

const RelatedProducts = ({ category, subcategory }) => {
  const { product } = useContext(ShopContext);
  const [relatedproduct, setrelatedproduct] = useState();

  useEffect(() => {
   let productcopy = product.slice();

    if (product) {
      productcopy = productcopy.filter((item) => category === item.category);
      productcopy = productcopy.filter(
        (item) => subcategory === item.subCategory
      );

      setrelatedproduct(productcopy.slice(0, 5));
    }
  }, [product, category, subcategory]);

  return (
    <div>
      <Title title1="RELATED" title2="PRODUCTS" />
      <div className="w-3/4 mx-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-x-4">
      {relatedproduct? (
        relatedproduct.map((item, index) => {
          return (
            <Productitems
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          );
        })
       ) : <div>No Related Products available....</div>
       } '
       </div>
    </div>
  );
};

export default RelatedProducts;
