import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Subscription from "../components/Subscription";

const About = () => {
  return (
    <div className="my-10 sm:my-20">
      <div className="flex justify-center">
        <Title title1="ABOUT" title2="US" />
      </div>

      <div className="flex justify-center lg:justify-between md:flex-row flex-col w-full lg:px-0 px-5 lg:w-3/4 mx-auto my-10 items-center gap-8 lg:gap-16">
        <div className="flex justify-center"> 
          <img className=" md:w-full sm:w-2/4 w-4/6"  src={assets.about_img} alt="about"/>
        </div>
        <div className="flex flex-col gap-5 text-gray-700 text-sm ">
           <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes</p>
           <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
           <h1 className="text-black font-semibold">Our Mission</h1>
           <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className="md:w-3/4 w-full md:px-0 px-5 mx-auto my-10 md:my-20">
        <Title title1="WHY" title2="CHOOSE US"/>
         
        <div className="flex my-5 sm:flex-row flex-col md:my-10">
          <div className="flex flex-col gap-4 border-2 px-4 py-5 text-gray-700 text-sm">
            <h1 className="font-semibold text-black">QUALITY ASSURANCE:</h1>
            <p className="">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="flex flex-col gap-4 border-2 px-4 py-5 text-gray-700 text-sm">
            <h1 className="font-semibold text-black">CONVENIENCE: </h1>
            <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="flex flex-col gap-4 border-2 px-4 py-5 text-gray-700 text-sm">
            <h1 className="font-semibold text-black">EXCEPTIONAL CUSTOMER SERVICE:</h1>
            <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      <div>
        <Subscription/>
      </div>
    </div>
  );
};

export default About;
