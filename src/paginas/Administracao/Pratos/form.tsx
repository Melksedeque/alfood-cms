import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [nomePrato, setNomePrato] = useState<string>('');
    const [descricaoPrato, setDescricaoPrato] = useState<string>('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemUrl, setImagemUrl] = useState('');

    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`/pratos/${params.id}/`)
               .then(resposta => {
                    console.log(resposta.data)
                    setNomePrato(resposta.data.nome)
                    setDescricaoPrato(resposta.data.descricao)
                    setTag(resposta.data.tag)
                    setRestaurante(resposta.data.restaurante.toString())
                    if (resposta.data.imagem) {
                        setImagemUrl(resposta.data.imagem)
                    }
               })
        }
    }, [params])
    
    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
            setImagemUrl('');
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
        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricaoPrato);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        if (imagem) {
            formData.append('imagem', imagem);
        }

        if(params.id) {
            http.request({
                url: `/pratos/${params.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                data: formData
            }).then(() => {
                setNomePrato('');
                setDescricaoPrato('');
                setTag('');
                setRestaurante('');
                setImagem(null);
                alert('Prato editado com sucesso!')
                navigate(-1)
            })
        } else {
            http.request({
                url: '/pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }).then(() => {
                setNomePrato('');
                setDescricaoPrato('');
                setTag('');
                setRestaurante('');
                setImagem(null);
                alert('Prato cadastrado com sucesso!')
                navigate(-1)
            })
              .catch(erro => console.log(erro.response.data.detail))
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
                            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
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
                    {imagemUrl && (
                        <Box sx={{ mt: 2, mb: 2, textAlign: 'left' }}>
                            <Typography variant="subtitle1">Imagem atual:</Typography>
                            <img 
                                src={imagemUrl} 
                                alt={`Imagem de ${nomePrato}`} 
                                style={{ maxHeight: '200px', maxWidth: '100%' }} 
                            />
                        </Box>
                    )}
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