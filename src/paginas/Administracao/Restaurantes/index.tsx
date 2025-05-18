import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

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
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Opções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.id}</TableCell>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                                <Button variant="outlined" color="error" onClick={excluir(restaurante)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdministracaoRestaurantes;