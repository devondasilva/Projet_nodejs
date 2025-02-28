import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Header from '../header';


interface Utilisateur {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface ApiResponse {
    Status: string;
    Result?: Utilisateur[];
    Error?: string;
}

export default function Utilisateurs() {
    const [data, setData] = useState<Utilisateur[]>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get<ApiResponse>('http://localhost:8081/users')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setData(res.data.Result || []);
                } else {
                    setMessage(res.data.Error || '');
                }
            })
            .catch((err: AxiosError) => {
                console.error(err);
                setError('Une erreur est survenue lors du chargement des utilisateurs.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        
            <Box display="flex" justifyContent="center"  pt={6}>
                <Box maxWidth={1200} width="100%">
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="left">Nom</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((utilisateur) => (
                                    <TableRow key={utilisateur.id}>
                                        <TableCell component="th" scope="row">
                                            {utilisateur.id}
                                        </TableCell>
                                        <TableCell align="left">{utilisateur.name}</TableCell>
                                        <TableCell align="left">{utilisateur.email}</TableCell>
                                        <TableCell align="left">{utilisateur.role}</TableCell>
                                        <TableCell align="left">
                                            <Button component={Link} to={`/users/${utilisateur.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                                                Voir
                                            </Button>
                                            <Button variant="outlined" size="small" sx={{ mr: 1 }}>Modifier</Button>
                                            <Button variant="outlined" size="small">Supprimer</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {message && (
                        <Box textAlign="center" mt={2}>
                            <Alert severity="error">{message}</Alert>
                        </Box>
                    )}
                </Box>
            </Box>
    
        
    );
}