import { useEffect, useState } from "react";
import Title from "./Title";
import Productitems from "./productitems";
import { useSelector } from "react-redux";

const RelatedProducts = ({ category, subcategory }) => {
  //get the products from redux store
  const productitems = useSelector((store)=> store?.products?.getproducts);
  const [relatedproduct, setrelatedproduct] = useState();

  useEffect(() => {
   let productcopy = productitems.length > 0 && productitems[0].slice();

    if (productitems.length > 0) {
      productcopy = productcopy.filter((item) => category === item.category);
      productcopy = productcopy.filter(
        (item) => subcategory === item.subCategory
      );

      setrelatedproduct(productcopy.slice(0, 5));
    }
  }, [productitems, category, subcategory]);

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
