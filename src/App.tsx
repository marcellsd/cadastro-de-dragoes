import './App.css';

import { Route, Routes } from "react-router-dom";

import { UserLogin } from './components/UserLogin';
import  Home from './components/Home';

function App() {
  return (
    <Routes>
        <Route path="*" element={<UserLogin/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
