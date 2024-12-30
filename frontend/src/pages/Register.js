import { useState } from "react";

function Register() {
    const [formData, setFormData] =  useState({
        name:"",
        email:"",
        address:"",
        contactNo:"",
        password:"",
        confirmPassword:"",
        profile:null
    });


    return <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

        </form>
    </div>
}

export default Register;