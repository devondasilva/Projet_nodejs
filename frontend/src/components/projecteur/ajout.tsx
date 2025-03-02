import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header';

export default function Ajout() {

    const [values, setValues] = useState({
        marque: '',
        couleur: '',
        quantite: ''
    })

    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/projecteur/add', values)
        .then(res => {
            console.log(values);
            res.data.Status === "Succes"? navigate("/projecteur"): alert(res.data.Error);
        })
    }


  return (

    <>
    <div className="" style={{display:"flex", justifyContent: 'center', marginTop:"10px"}}>
        <div style={{padding:"20px", border:"solid 1px", borderRadius:"5px"}}>
            <h2 style={{textAlign:"center"}}>Enregistrer un outils</h2>

            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"10px", justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                    <label htmlFor="name"> Marque</label>
                    <input type="text" onChange={e=> setValues({...values, marque: e.target.value})} placeholder="Entrez votre nom" name="name" style={{borderRadius:"5px", border:"none", backgroundColor:"#e6e6e6", padding:"10px"}}/>
                </div>
                <div style={{marginBottom:"10px", justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                    <label htmlFor="email"> couleur</label>
                    <select
                    name="role"
                    id="role"
                    onChange={(e) => setValues({ ...values, couleur: e.target.value })}
                    className="rounded-md border-none bg-gray-200 p-2 w-full"
                    >
                        <option value="" disabled selected>
                            Sélectionnez la couleur
                        </option>
                        <option value="Blanche">Couleur blanche</option>
                        <option value="Gris">Couleur gris</option>
                        <option value="Noir">Couleur noir</option>
                    </select>
                </div>
                <div style={{marginBottom:"10px", justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                    <label htmlFor="password"> Quantité </label>
                    <input type="number" onChange={e=> setValues({...values, quantite: e.target.value})} placeholder='Entrez la quantité' name="quantite" style={{borderRadius:"5px", border:"none", backgroundColor:"#e6e6e6", padding:"10px", }}/>
                </div>
                <button type='submit' style={{borderRadius:"5px", border:"none", backgroundColor:"#2583b3", padding:"10px", color:"white", textAlign:"left", marginBottom:"10px"}}>Enregistrer</button>
            </form>
        </div>
    </div>
    </>
    
  )
}
