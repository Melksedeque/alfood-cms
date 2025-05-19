import { Box, Button, TextField, Typography, Container } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`/restaurantes/${params.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [params])

    const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (params.id) {
            http.put<IRestaurante>(`/restaurantes/${params.id}/`, { nome: nomeRestaurante })
               .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                    navigate(-1)
                })
            return;
        } else {
            http.post('/restaurantes/', { nome: nomeRestaurante })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
                navigate(-1)
            })
        }
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography component="h1" variant="h4">
                    {params.id? 'Editar' : 'Cadastrar'} Restaurante
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm} sx={{width: '100%'}}>
                    <TextField
                        id="standard-basic"
                        label="Nome do Restaurante"
                        variant="standard"
                        value={nomeRestaurante}
                        onChange={event => setNomeRestaurante(event.target.value)}
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

export default FormularioRestaurante;