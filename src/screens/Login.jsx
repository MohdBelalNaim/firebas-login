import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../firebase';
import login from './Login.css'
import { GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,FacebookAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2'

const Login = () =>{

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    
    const googleLogin = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(Authentication,provider)
        .then(successfull=>Swal.fire({
            title:"Logged in",
            text:"Logged in successfully as "+successfull.user.displayName,
            icon:"success",
            button:"Hurrahh!"
        }))
        .catch(err=>{
            Swal.fire({
                title:"Error",
                text:"Cannot login using google",
                icon:"error",
                button:"okay!"
            })
        })
    }

    const emailLogin = () =>{
        signInWithEmailAndPassword(Authentication,email,password)
        .then(logged=>{
            new Swal({
                title:"Logged in",
                text:"Logged in successfully to your account",
                icon:"success",
                button:"Hurrahh!"
            })
        })
        .catch(err=>{
            if(err.message==="Firebase: Error (auth/wrong-password)."){
                new Swal("Cannot login","Invalid email or password","error")
            }
        })
    }

    const FacebookLogin = () =>{
        const provider = new FacebookAuthProvider()
        signInWithPopup(Authentication,provider)
        .then(logged=>{
            new Swal({
                title:"Logged in",
                text:"Logged in successfully",
                icon:"success",
                button:"Hurrahh!"
            })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    return(
        <div id="main">
            <div id="wrapper">
            <div id="content">
                    
                    <div style={{"backgroundColor":"white"}} className='shadow'>
                        <div id="image-wrapper">
                            {/* This section has image in background */}
                        </div>
                        <div className='px-5'>
                            <div style={{"fontSize":30+"px"}} className='py-3'>Sign In </div>
                            <div className='py-4'>
                                <form onSubmit={e=>e.preventDefault()}>
                                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className='form-control py-2' placeholder="Email address" required/>
                                    <input value={password} onChange={e=>setPassword(e.target.value)} type="text" className='form-control py-2 mt-3' placeholder="Password" required/>
                                    <button onClick={()=>emailLogin()} style={{"backgroundColor":"#01D28E","color":"white"}} className='mt-3 py-2 form-control'>Sign in</button>
                                    <div className='py-3 text-center' style={{"fontSize":18+"px"}}>
                                        or continue with
                                    </div>
                                    <div className='row'>
                                       <div className='col-lg-6 col-6'>
                                            <div className='text-center border rounded py-2' id="google-button" onClick={()=>googleLogin()}>
                                                 <img id="google-icon" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="" />Google
                                             </div>
                                       </div>
                                        <div className='col-lg-6 col-6'>
                                            <div style={{"backgroundColor":"#3B579D","color":"white"}} className='text-center border rounded py-2' id="google-button" onClick={()=>FacebookLogin()}>
                                                <img id="google-icon" src="https://www.freepnglogos.com/uploads/facebook-logo-design-1.png" alt="" />Facebook
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='text-center py-2' style={{"fontSize":18+"px"}}>
                                Not a member? <span><Link to="/signup" style={{"color":"#01D28E"}}>Signup</Link></span>
                            </div>
                            <div className='py-1'></div>
                        </div>
                    </div>
                    
            
            </div>
        </div>
        </div>
    )    
}

export default Login