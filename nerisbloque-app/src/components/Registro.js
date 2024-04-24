import React from "react";
import { database } from ' ./FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'

function RegisterAndLogin(){

    const handleSubmit = (e)=>{
    e.preventDefault ()
    const email = e. target.email.value
    const password = e. target.password.value
    
    createUserWithEmailAndPassword (database, email, password). then(data=>(
        console. log(data, "authData")
    ))
}
        return(
    
<div className="App">
    {/* Registration and login Screen */}
    <form onSubmit={(e)=>handleSubmit(e) }>
        <input name="email" id="emailInp" placeholder="Email" /><br/>
        <input name="password" type="password" id="passwordInp" placeholder="Password" /><br/><br/>
</ form>
</div>
)
        }
export default RegisterAndLogin;