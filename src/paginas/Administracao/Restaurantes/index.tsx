import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";
import AppHeader from "../AppHeader";

const AdministracaoRestaurantes = () => {
    const [restaurantes, steRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('/restaurantes/')
        .then(resposta => {
            steRestaurantes(resposta.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const excluir = (restaurante: IRestaurante) => () => {
        http.delete(`/restaurantes/${restaurante.id}/`)
            .then(() => {
                const restaurantesAtualizados = restaurantes.filter(r => r.id !== restaurante.id);
                steRestaurantes([...restaurantesAtualizados]);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
            <AppHeader />
            <Container maxWidth="lg">
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', mb:4}}>
                    <Typography component="h1" variant="h4">
                        Restaurantes
                    </Typography>
                    <Button
                        component={Link}
                        to="/admin/restaurantes/novo"
                        variant="outlined"
                        color="success"
                    >
                        + Adicionar
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width:'7%'}}>#</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell sx={{width:'19%'}}>Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantes.map((restaurante) => (
                                <TableRow key={restaurante.id}>
                                    <TableCell>{restaurante.id}</TableCell>
                                    <TableCell>{restaurante.nome}</TableCell>
                                    <TableCell sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Button component={Link} to={`/admin/restaurantes/${restaurante.id}`} variant="outlined" color="primary">Editar</Button>
                                        <Button variant="outlined" color="error" onClick={excluir(restaurante)}>Excluir</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default AdministracaoRestaurantes;