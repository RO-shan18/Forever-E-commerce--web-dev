import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrders from './pages/PlaceOrders'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/searchbar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/verify'

const App = () => {
  return (
    
    <div >
      <Navbar/>
      <ToastContainer/>
      <Searchbar/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Orders' element={<Orders/>} />
        <Route path='/PlaceOrder' element={<PlaceOrders/>} />
        <Route path='/Product/:productId' element={<Products/>} />
        <Route path='/verify' element={<Verify/>} />
       </Routes>
       <Footer/>
    </div>
  )
}

export default App
