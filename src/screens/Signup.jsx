import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from './Login.css'
import { Authentication } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';


const Signup = () =>{

    const navigate = useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    function signup(){
        if(email==="" || password ===""){
            console.log("all feildsa re required")
        }
        else{
            createUserWithEmailAndPassword(Authentication,email,password)
            .then(userCredential=>{
               new Swal({
                   title:"Account created successfully!!",
                   text:"Login to continue",
                   icon:"success"
               })
               navigate('/')
                
            })
            .catch(err=>{
                if(err.message==="Firebase: Password should be at least 6 characters (auth/weak-password)."){
                    new Swal({
                        title:"Error",
                        text:"Password should be at least 6 characters",
                        icon:"error"
                    })
                }
                else if(err.message==="Firebase: Error (auth/email-already-in-use)."){
                    new Swal({
                        title:"Error",
                        text:email+" is already in use",
                        icon:"error"
                    })
                }
            })
        }
    }

    return(
        <div id="main">
            <div id="wrapper">
                <div id="content">

                        <div style={{"backgroundColor":"white"}} className='shadow'>
                            <div id="image-wrapper-signup">
                                {/* This section has image in background */}
                            </div>
                            <div className='px-5'>
                                <div style={{"fontSize":30+"px"}} className='py-3'>Signup </div>
                                <div className='py-4'>
                                    <form onSubmit={e=>e.preventDefault()}>
                                        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className='form-control py-2 mt-3' placeholder="Email address" required/>
                                        <input value={password} onChange={e=>setPassword(e.target.value)} type="text" className='form-control py-2 mt-3' placeholder="Create Password" required/>
                                        <button onClick={()=>signup()} style={{"backgroundColor":"#01D28E","color":"white"}} className='mt-3 py-2 form-control'>Signup</button>
                                    </form>
                                </div>
                                <div className='text-center py-4' style={{"fontSize":18+"px"}}>
                                    Already a member? <span><Link to="/" style={{"color":"#01D28E"}}>Login</Link></span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

    )
}

export default Signup