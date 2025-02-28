import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Log0 from "../assets/images/Log0.png";
import axios from "axios";
import Ajout from "./projecteur/ajout";
import Afficher from "./projecteur/afficher";

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [val, setVal] = useState("");
    const [valeur, setValeur] = useState<React.ReactNode | null>("");
    const [i, setI] = useState(false);
    const [affiche, setAffiche] = useState<React.ReactNode>();
    const [afficheraccueil, setAccueil] = useState(true); // Initialisation à true
    const [projecteur, setProjecteur] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const val = event.target.value;
        if (val === "modifier") {
            navigate("/profile/edit");
        } else if (val === "deconnection") {
            handleDelete();
        }
    };

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

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const manage = () => {
        switch (valeur) {
            case "Accueil":
                setAccueil(true);
                setI(true);
                setAffiche(null);
                break;
            case "projecteur":
                setAccueil(false);
                setI(true);
                setAffiche(<Afficher />);
                break;
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row ">
                <div className="mt-4 py-1 w-full md:w-2/12 flex flex-col items-center">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <img src={Log0} alt="" className="h-16 w-auto" />
                        </div>
                        <nav>
                            <ul className="flex flex-col gap-3 list-none items-left">
                                <li>
                                    <Link to="/" aria-label="Accueil">Accueil</Link>
                                </li>
                                <li>
                                    <Link to="/users" aria-label="Utilisateurs">Utilisateurs</Link>
                                </li>
                                <li>
                                    <Link to="/projecteur" aria-label="Projecteurs">Projecteurs</Link>
                                </li>
                                <li>
                                    <Link to="/" aria-label="Opérations">Opérations</Link>
                                </li>
                                <li>
                                    <label htmlFor="profile-select" className="sr-only">Profile options</label>
                                    <select id="profile-select" onChange={handleChange}>
                                        <option value="" disabled selected>
                                            Profil
                                        </option>
                                        <option value="modifier">Modifier le profil</option>
                                        <option value="deconnection">Se deconnecter</option>
                                    </select>
                                </li>
                                <div className="w-full h-[2px] bg-[#F0EFEF] "></div>
                                <li><Link to="/">Voir son profil</Link></li>
                                <li><Link to="/"> Modifier son profil</Link></li>
                                <button onClick={handleDelete}>Deconnexion</button>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="w-full md:w-10/8 bg-[#F0EFEF] px-5 py-5">
                    <div>{children}</div>
                    <div>
                        <button onClick={() => {
                            setValeur("Accueil");
                            manage();
                        }}>Accueil</button>

                        <button onClick={() => {
                            setValeur("projecteur");
                            manage();
                        }}>Projecteur</button>

                        {i &&
                            <div>
                                {afficheraccueil && <Ajout />}
                                {affiche}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;