


import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../header';


interface Action {
    id: number;
    user_id: number;
    projecteur_id: string;
    date_retrait: string;
    date_depot: string;
}

interface ApiResponse {
    Status: string;
    Result?: Action[]; // Result can be undefined
    Error?: string;
}
export default function AfficherAction() {

    const [data, setData] = useState<Action[]>([]); // Explicitly set the type
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
            axios.get<ApiResponse>('http://localhost:8081/action')
                .then(res => {
                    console.log(res.data);
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
                            <th>User_id</th>
                            <th>projecteur_id</th>
                            <th>Date_retrait</th>
                            <th>Date_depot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((Action, index) => (
                            <tr key={index}>
                                <td>{Action.id}</td>
                                <td>{Action.user_id}</td>
                                <td>{Action.projecteur_id}</td>
                                <td>{Action.date_retrait}</td>
                                <td>{Action.date_depot}</td> 
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
