import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/login";
  import { ToastContainer } from 'react-toastify';

export const BackendUrl = 'http://localhost:4000';

const App = () => {
  const [login, setlogin] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [opensidebar, setopensidebar] = useState(false);

  useEffect(()=>{
    localStorage.setItem('token', login);
  },[login])

  return (
    <div>
      {login !== "" ? (
        <div>
          <ToastContainer/>
          <Navbar sidebar={opensidebar} setopensidebar={setopensidebar} setlogin={setlogin} />
          <hr />
          <div className='flex w-full'>
          <div>
            <Sidebar sidebar={opensidebar} />
          </div>        
          <Routes>
            <Route path="/add" element={<Add login={login} />} />
            <Route path="/list" element={<List login={login} />} />
            <Route path="/order" element={<Orders login={login} />} />
          </Routes>
          </div>
        </div>
      ) : <Login  setlogin={setlogin}/>}
    </div>
  );
};

export default App;
