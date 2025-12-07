import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./styles.css";
import "./stylehome.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignupPage from './SignupPage';
import Home from './Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='signon' element={<SignUp/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='/signuppage' element={<SignupPage/>}/>
          </Routes>
        </Router>      
    </>
  )
}

export default App
