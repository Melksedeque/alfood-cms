import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
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