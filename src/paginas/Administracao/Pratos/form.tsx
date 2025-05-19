import { Box, Button, TextField, Typography, Container } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`/pratos/${params.id}/`)
                .then(resposta => setNomePrato(resposta.data.nome))
        }
    }, [params])

    const [nomePrato, setNomePrato] = useState<string>('');
    const [descricaoPrato, setDescricaoPrato] = useState<string>('');
    
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (params.id) {
            http.put<IPrato>(`/pratos/${params.id}/`, { nome: nomePrato })
               .then(() => {
                    alert('Prato atualizado com sucesso!')
                })
            return;
        } else {
            http.post('/pratos/', { nome: nomePrato })
            .then(() => {
                alert('Prato cadastrado com sucesso!')
            })
        }
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography component="h1" variant="h4">
                    {params.id? 'Editar' : 'Cadastrar'} Prato
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm} sx={{width: '100%'}}>
                    <TextField
                        id="standard-basic"
                        label="Nome do Prato"
                        variant="standard"
                        value={nomePrato}
                        onChange={event => setNomePrato(event.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        id="standard-basic"
                        label="Descrição do Prato"
                        variant="standard"
                        value={descricaoPrato}
                        onChange={event => setDescricaoPrato(event.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        sx={{marginTop: 2}}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default FormularioPrato;