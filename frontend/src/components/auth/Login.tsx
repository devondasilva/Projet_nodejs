import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {


    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event: React.FormEvent)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            res.data.Status === "Succes"? navigate("/"): alert(res.data.Error);
        })
        .then (err => console.log(err))
    }
  return (
    <div style={{display:"flex", justifyContent: 'center', marginTop:"10px"}}>
        <div style={{padding:"20px", border:"solid 1px", borderRadius:"5px"}}>
            <h2 style={{textAlign:"center"}}>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"10px", justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                    <label htmlFor="email"> Email</label>
                    <input type="email" onChange={e=> setValues({...values, email: e.target.value})} placeholder="Entrez votre adresse mail" name="email" style={{borderRadius:"5px", border:"none", backgroundColor:"#e6e6e6", padding:"10px"}}/>
                </div>
                <div style={{marginBottom:"10px", justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                    <label htmlFor="password"> Password</label>
                    <input type="password" onChange={e=>setValues({...values, password: e.target.value})} placeholder='Entrez le mot de passe' name="password" style={{borderRadius:"5px", border:"none", backgroundColor:"#e6e6e6", padding:"10px"}} />
                </div>
                <button type='submit' style={{borderRadius:"5px", border:"none", backgroundColor:"#2583b3", padding:"10px", color:"white",}}>Se connecter</button>
                <p>J'accepte les conditions d'utilisation</p>

                <Link to="/register" style={{textDecoration:"none", display:"flex", justifyContent:"center", backgroundColor:"#efefef", borderRadius:"5px", padding:"10px", color:"#2583b3"}}> Créer un compte</Link>
            </form>
        </div>
    </div>
  )
}
