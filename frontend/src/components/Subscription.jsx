
const Subscription = () => {
  return (
    <div className='flex flex-col my-20'>
      <h1 className='text-2xl text-center font-bold pb-3'>
        Subscribe now & get 20% off
      </h1> 
      <p className='text-sm text-center pb-3 text-gray-700' >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      </p>

      <div className='flex items-center justify-center gap-4 pb-3 md:flex-row flex-col'>
        <input className='px-4 py-3 md:w-1/4 w-11/12 border-black' type="email" placeholder="Enter your Email" />
        <input onSubmit={(e)=>{e.preventDefault()}} className='bg-black text-white px-6 py-3 cursor-pointer  md:w-auto w-11/12' type="submit" value="Subscribe"/>
      </div>
    </div>
  )
}

export default Subscription
