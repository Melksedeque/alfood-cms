import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [params])

    const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (params.id) {
            axios.put<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, { nome: nomeRestaurante })
               .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
            return;
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
        }
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                id="standard-basic"
                label="Nome do Restaurante"
                variant="standard"
                value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event.target.value)}
            />
            <Button type="submit" variant="outlined">Enviar</Button>
        </form>
    )
}

export default FormularioRestaurante;