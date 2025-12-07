import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate()
    const [form,setForm] = useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
    })
    const [errors,setErr] = useState({})
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [mobile, setMobile] = useState("")
    // const [password, setPassword] = useState("")

    const handleChange= (e)=>{
          setForm({...form, [e.target.name]: e.target.value})
    }

    // function Names(evt){

    //     setName(evt.target.value)
    // }

    // function Emails(evt){

    //     setEmail(evt.target.value)
    // }

    // function Mobiles(evt){
    //     setMobile(evt.target.value)
    // }

    // function Password(evt){

    //     setPassword(evt.target.value)
    // }

    function Formvalidate(e){

      e.preventDefault();

      let err= {}
          if(!form.name.trim()){
            err.name="Name is Required"
          }
          let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if(!emailPattern.test(form.email)){
            err.email= "Mail Enter the Valid mail"
          }
           if (!/^[0-9]{10}$/.test(form.mobile)) {
           err.mobile = "Enter 10-digit mobile number";
            }
          if(form.password.length <8 ){
            err.password = "Password length should be 8 characters"
          }

          setErr(err)

          if(Object.keys(err).length === 0  ){

            handleinput();

          }
        
    }

    function handleinput(){

      axios.post("http://localhost:5000/signup", form)
      .then((res)=>{
          console.log(res)
          navigate("/signuppage")
      }  
      
      )
        
      .catch(err=> console.log(err))
      
    }

  return (
    <div className="signup-bg">
      <div className="overlay"></div>

      <div className="signup-container">
        <div className="signup-card">
          <div className="logo">Netflix</div>
          <h1>Create Account</h1>
          <form onSubmit={Formvalidate}>
          <div className="signup-inputs">
          
            <input value={form.name} onChange={handleChange} name="name"  type="text" placeholder="Full Name" />
            <p style={{ color: "red" }}>{errors.name}</p>
            <input value={form.email} onChange={handleChange} name="email"  type="email" placeholder="Email ID" />
            <p style={{ color: "red" }}>{errors.email}</p>
            <input value={form.mobile} onChange={handleChange} name="mobile"  placeholder="Mobile Number" />
            <p style={{ color: "red" }}>{errors.mobile}</p>
            <input value={form.password} onChange={handleChange} name="password"  type="password" placeholder="Password" />
            <p style={{ color: "red" }}>{errors.password}</p>
          
            
          </div>

          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
          <p className="signin-text">
            Already have account? <Link to="/">Sign In</Link> 
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp