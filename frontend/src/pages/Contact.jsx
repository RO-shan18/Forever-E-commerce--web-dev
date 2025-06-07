import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Subscription from "../components/Subscription";

const Contact = () => {
  return (
    <div className="my-10 sm:my-20">
      <div className="flex justify-center">
        <Title title1="CONTACT" title2="US" />
      </div>

      <div className="flex md:flex-row flex-col justify-center w-full lg:px-0 px-5 lg:w-3/4 mx-auto my-5 md:my-10 items-center gap-6 lg:gap-16">
        <img className="w-96" src={assets.contact_img} alt="contactimage" />

        <div className="flex flex-col md:items-start items-center gap-5 text-gray-700 text-sm " >
          <h1 className="text-black font-semibold text-md">OUR STORE</h1>
          <div>
            <p>54709 Willms Station </p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p>Tel: (415) 555‑0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>
          <h1 className="text-black font-semibold text-md">CARRERS AT FOREVER</h1>
          <p>Learn more about our teams and job openings.</p>
          <button className="px-5 py-2 border-2 w-2/4">Explore Jobs</button>
        </div>
      </div>

      <div>
        <Subscription />
      </div>
    </div>
  );
};

export default Contact;
