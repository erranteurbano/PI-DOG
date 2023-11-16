import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import {getAllDogs} from './redux/actions/actions';
import Landing from './view/LandingPage';
import Home from './view/Home';
import Navbar from './componet/Navbar/Navbar';
import Details from './view/Details';
import RegisterDogs from './view/RegisterDog';

import './App.css';

function App() {
  
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  React.useEffect(()=>{
     dispatch(getAllDogs());
  },[dispatch]);

  return (
    <div className="App">
        {(pathname === "/" || pathname === "/dogs") ? null : <Navbar/>}
      <Routes>
         <Route path='/' element={<Landing/>}/>
         <Route path='/dogs' element={<Landing/>}/>
         <Route path='/dogs/home' element={<Home/>}/>
         <Route path='/dogs/detail/:id' element={<Details/>} />
         <Route path='/dogs/RegisterDogBreeds' element={<RegisterDogs/>}/>
         <Route path='*' />
      </Routes>
    </div>
  );
}



export default App;
