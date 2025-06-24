import Title from "./Title";
import Productitems from "./productitems";
import { useSelector } from "react-redux";

const LatestCollection = () => {

  //get the products from redux store
  const productitems = useSelector((store)=> store?.products?.getproducts)

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
        { productitems.length > 0 &&
           (
            productitems[0].slice(0, 10).map((item, index)=>{
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
