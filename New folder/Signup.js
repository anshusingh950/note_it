import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import {Link} from "react-router-dom";
import React ,{useState} from 'react'

export default function Signup() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",location:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
        })
        const js=await response.json();
        console.log(js)
        if(!js.success){
            alert("Enter Valid Credentials")
        }
    }
    const onChange=(ev)=>{
        setcredentials({...credentials,[ev.target.name]:ev.target.value})
    }


    return (
        <div className='sindiv'>
        <Navbar/>
        <div className='container py-5 signform ' style={{width:'50%',marginTop:'3rem',marginBottom:'2.99996rem'}}>
            
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fs-3">Your User Name</label>
                        <input type="string" className="form-control" id="username" name='name'  onChange={onChange} value={credentials.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-3">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email'  onChange={onChange} value={credentials.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-3">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1 "  name='password'  onChange={onChange} value={credentials.password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label fs-3">Your Location</label>
                        <input type="string" className="form-control" id="location "  name='location'  onChange={onChange} value={credentials.location} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/Login" style={{marginLeft:'10px'}} >Already a user?</Link>
                </form>

            </div>
            <Footer/>
        </div>
    )
}
