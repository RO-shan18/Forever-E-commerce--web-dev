import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const Productitems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
   
      <div className="py-4 mx-3 flex flex-col items-center">
         <Link to={`/Product/${id}`}>
        <div className="overflow-hidden flex md:justify-between justify-center">
          <img className="w-48 hover:scale-110 transition-all ease-in-out" src={image[0]} alt="productitem" />
        </div>
        </Link>
        <div className="text-sm text-gray-700 pt-3">
          <p>{name}</p>
          <p>
            {currency}
            {price}
          </p>
        </div>
      </div>
  );
};

export default Productitems;
