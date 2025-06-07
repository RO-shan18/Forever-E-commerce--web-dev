import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='text-gray-700 text-sm md:text-md  md:grid grid-cols-[3fr_1fr_1fr] px-5 gap-3 flex flex-col'>
      <div className='flex flex-col items-start'>
         <img className='w-32 pb-6' src={assets.logo} alt="logo"/>
         <p className=''>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         </p>
      </div>
       <div>
         <h1 className='text-lg md:pb-6 text-black font-semibold  py-6'>
            COMPANY
         </h1>
         <ul >
            <li className='pb-3'>Home</li>
            <li className='pb-3'>About</li>
            <li className='pb-3'>Delivery</li>
            <li className='pb-3'>Privacy policy</li>
         </ul>
      </div>
       <div>
         <h1 className='text-lg md:pb-6 text-black font-semibold  py-6'>
            GET IN TOUCH
         </h1>
          <ul>
            <li className='pb-3'>+1-212-456-7890</li>
            <li className='pb-3'>greatstackdev@gmail.com</li>
         </ul>
      </div>
    </div>

    <div className='my-10'>
        <hr className='h-[0.1px] w-full border-gray-600 py-3'></hr>
        <p className='text-gray-700 text-md text-center px-5'>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
    </div>
    </div>
  )
}

export default Footer
