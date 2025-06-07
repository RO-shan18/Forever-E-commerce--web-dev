import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Productitems from './productitems';
import Title from './Title';

const BestSeller = () => {
  
  const {product} = useContext(ShopContext);
  const [bestproducts, setbestproducts] = useState();

  useEffect(()=>{
      const filterproducts = product.filter((items)=> items.bestseller === true);
      setbestproducts(filterproducts.slice(0,5));
  }, [product]);

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
        {
         bestproducts && (
            bestproducts.map((item, index)=>{
                return(
                    <Productitems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                )
            })
           )
        }
      </div>
    </div>
  )
}

export default BestSeller
