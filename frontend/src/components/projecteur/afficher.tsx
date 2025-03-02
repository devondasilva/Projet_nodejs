


import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../header';


interface Projecteur {
    id: number;
    marque: string;
    couleur: string;
    quantite: string;
}

interface ApiResponse {
    Status: string;
    Result?: Projecteur[]; // Result can be undefined
    Error?: string;
}
export default function Affichage() {

    const [data, setData] = useState<Projecteur[]>([]); // Explicitly set the type
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
            axios.get<ApiResponse>('http://localhost:8081/projecteur')
                .then(res => {
                    if (res.data.Status === "Succes") {
                        setData(res.data.Result || []); // Use empty array if Result is undefined
                        if(res.data.Result && res.data.Result.length > 0){
                            console.log(res.data.Result[0]);
                        }
    
                    } else {
                        setMessage(res.data.Error || '');
                    }
                })
                .catch(err => console.log(err));
        }, [])



  return (
   
    <div>
      <div>
            
            <div className="flex " style={{ justifyContent: "center", marginTop: "50px" }}>
                <table style={{ border: "solid 1px", padding: "20px" }}>
                    <thead >
                        <tr  >
                            <th>Id</th>
                            <th>Marque</th>
                            <th>Couleur</th>
                            <th>Quantité</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((Projecteur, index) => (
                            <tr key={index}>
                                <td>{Projecteur.id}</td>
                                <td>{Projecteur.marque}</td>
                                <td>{Projecteur.couleur}</td>
                                <td>{Projecteur.quantite}</td>
                                <td>
                                    <button>Modifier</button>
                                    <button>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/projecteur/add">Ajouter un projecteur</Link>
            {message && <p style={{ textAlign: "center", color: "red" }}>{message}</p>}
        </div>
    </div>
  )
}
