import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Utilisateurs from './components/utilisateur/utilisateurs';
import Im1 from "./assets/images/etudiants.jpg"
import AfficherAction from './components/action/affichage';

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.error(err);
                setMessage("Une erreur s'est produite.");
            })
            .finally(() => setLoading(false)); 
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    if (loading) {
        return <div>Chargement...</div>; 
    }

    return (
        <div>
            {/* {auth ? ( */}
                {/* <Header> */}
                    <div className="flex  justify-center bg-[#F0EFEF] ">
                      <div className="w-full ">
                        <div className='mt-8'>
                            <p className='text-center my-5'>Bienvenue, {name}!</p> 
                            <div className='w-full h-96 bg-white rounded-2xl overflow-hidden'>
                              <img src={Im1} alt="" />
                            </div>
                            <div className='my-10 flex flex-wrap justify-center gap-10'>
                              
                            <Link to="/action/add">
                              <div className='h-64 w-64 bg-white rounded-2xl p-10 relative'>
                                  <div className=''>
                                      <h1 className='font-[Lexend2] text-2xl'>Faire une réservation</h1>
                                      <div className='w-40 h-2 rounded-2xl bg-[#F0EFEF] mt-4'></div>
                                  </div>
                                  <button
                                      className='absolute bottom-5 right-5 text-xl cursor-pointer'
                                    
                                  >
                                      <AddCircleIcon style={{fontSize:"50px"}} />
                                  </button>
                                  
                              </div>
                              </Link>

                              <Link to="/projecteur/add">
                              <div className='h-64 w-64 bg-[#1ce2c1] rounded-2xl p-10 relative text-white'>
                                  <div className=''>
                                      <h1 className='font-[Lexend2] text-2xl'>Ajouter un projecteur</h1>
                                      <div className='w-40 h-2 rounded-2xl bg-[#F0EFEF] mt-4'></div>
                                  </div>
                                  <button
                                      className='absolute bottom-5 right-5 text-xl cursor-pointer'
                                    
                                  >
                                      <AddCircleIcon style={{fontSize:"50px"}} />
                                  </button>
                                  
                              </div>
                              </Link>

                              
                              <Link to="/projecteur/add">
                              <div className='h-64 w-64 bg-[#469ECE] rounded-2xl p-10 relative text-white'>
                                  <div className=''>
                                      <h1 className='font-[Lexend2] text-2xl'>Projecteurs disponibles</h1>
                                      <div className='w-40 h-2 rounded-2xl bg-[#F0EFEF] mt-4'></div>
                                  </div>
                                  <button
                                      className='absolute bottom-5 right-5 text-xl cursor-pointer'
                                    
                                  >
                                      <EventAvailableIcon style={{fontSize:"50px"}} />
                                  </button>
                                  
                              </div>
                              </Link>
                              <Link to="/users">
                              <div className='h-64 w-64 bg-[#E21C41] rounded-2xl p-10 relative text-white'>
                                  <div className=''>
                                      <h1 className='font-[Lexend2] text-2xl'>Liste des étudiants</h1>
                                      <div className='w-40 h-2 rounded-2xl bg-[#F0EFEF] mt-4'></div>
                                  </div>
                                  <button
                                      className='absolute bottom-5 right-5 text-xl cursor-pointer'
                                    
                                  >
                                      <RecentActorsIcon style={{fontSize:"50px"}} />
                                  </button>
                                  
                              </div>
                              </Link>
                              
                            </div>
                            
                            <AfficherAction />
                            
                        </div>
                        </div>
                    </div>
                {/* </Header> */} 
            {/* )} */}
        </div>
    );
}