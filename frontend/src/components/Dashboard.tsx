import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Log0 from "../assets/images/Log0.png";
import axios from "axios";
import Ajout from "./action/Ajout";

import Afficher from "./projecteur/afficher";
import Home from "../Home";
import Utilisateurs from "./utilisateur/utilisateurs";

const Dashboard = () => {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [valeur, setValeur] = useState("home"); // Initialisation à "home"
    const [affiche, setAffiche] = useState(<Home />); // Initialisation à <Home />

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Une erreur s'est produite lors de la vérification de l'authentification.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = () => {
        axios
            .get("http://localhost:8081/logout")
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
                setError("Une erreur s'est produite lors de la déconnexion.");
            });
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    const handleNavigation = (componentName: string) => {
        setValeur(componentName);
        switch (componentName) {
            case "home":
                setAffiche(<Home />);
                break;
            case "users":
                setAffiche(<Utilisateurs />);
                break;
            case "projecteur":
                setAffiche(<Afficher />);
                break;
            case "ajout":
                setAffiche(<Ajout />);
                break;
            default:
                setAffiche(<Home />);
        }
    };



    return (
        <>
            {auth ? (
                <div className="flex flex-col md:flex-row">
                    <div className="mt-4 py-1 w-full md:w-2/12 flex flex-col">
                        <div className="flex flex-col items-start ml-5">
                            <div className="mb-5">
                                <img src={Log0} alt="" className="h-16 w-auto" />
                            </div>
                            <div className="flex flex-col items-start">
                                <button className="mb-2" onClick={() => handleNavigation("home")}>Accueil</button>
                                <button className="mb-2" onClick={() => handleNavigation("users")}>Utilisateur</button>
                                <button className="mb-2" onClick={() => handleNavigation("projecteur")}>Projecteur</button>
                                <button className="mb-2" onClick={() => handleNavigation("ajout")}>Operations</button>
                            </div>
                            <div className="mt-5">
                                <div className="w-full h-[2px] bg-[#F0EFEF]"></div>
                                <ul>
                                    <li><Link to="/">Voir son profil</Link></li>
                                    <li><Link to="/">Modifier son profil</Link></li>
                                    <li><button onClick={handleDelete}>Deconnexion</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-10/8 bg-[#F0EFEF] px-5 py-5">{affiche}</div>
                </div>
            ) : (
                
                <div>
                    
                    <div>{message}</div>
                    <Link to="/login">Connecter vous maintenant</Link>
                </div>
            )}
        </>
    );
};

export default Dashboard;