import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
    const params = useParams();
    const [nomePrato, setNomePrato] = useState<string>('');
    const [descricaoPrato, setDescricaoPrato] = useState<string>('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    
    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    useEffect(() => {
        http.get<{tags: ITag[]}>(`/tags/`)
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>(`/restaurantes/`)
           .then(resposta => setRestaurantes(resposta.data))
    }, [])

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
                        label="Nome do Prato"
                        variant="standard"
                        value={nomePrato}
                        onChange={event => setNomePrato(event.target.value)}
                        margin="dense"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Descrição do Prato"
                        variant="standard"
                        value={descricaoPrato}
                        onChange={event => setDescricaoPrato(event.target.value)}
                        margin="dense"
                        fullWidth
                        required
                    />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select id="" variant="standard" labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)} required>
                            {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                                {tag.value}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                        <Select id="" variant="standard" labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)} required>
                            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <input type="file" onChange={selecionarArquivo} />
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