import './App.css';

import { Route, Routes } from "react-router-dom";

import { UserLogin } from './components/UserLogin';
import  Home from './components/Home';
import { AddDragon } from './components/AddDragon';

function App() {
  return (
    <Routes>
        <Route path="*" element={<UserLogin/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/registration" element={<AddDragon/>}/>
    </Routes>
  );
}

export default App;
