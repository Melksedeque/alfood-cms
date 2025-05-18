import { useEffect, useState } from "react";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>('/pratos/')
        .then(resposta => {
            setPratos(resposta.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const excluir = (prato: IPrato) => () => {
        http.delete(`/pratos/${prato.id}/`)
            .then(() => {
                const pratosAtualizados = pratos.filter(p => p.id !== prato.id);
                setPratos([...pratosAtualizados]);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
            <Container maxWidth="lg">
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', mb:4}}>
                    <Typography component="h1" variant="h4">
                        Pratos
                    </Typography>
                    <Button
                        component={Link}
                        to="/admin/pratos/novo"
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
                            {pratos.map((prato) => (
                                <TableRow key={prato.id}>
                                    <TableCell>{prato.id}</TableCell>
                                    <TableCell>{prato.nome}</TableCell>
                                    <TableCell sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Button component={Link} to={`/admin/pratos/${prato.id}`} variant="outlined" color="primary">Editar</Button>
                                        <Button variant="outlined" color="error" onClick={excluir(prato)}>Excluir</Button>
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

export default AdministracaoPratos;