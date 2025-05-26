# AlFood

![Tela Principal](./screencapture.png)

## Menu

- [Descrição](#descrição)
  - [Principais recursos incluem](#principais-recursos-incluem)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
  - [Arquivos Principais](#arquivos-principais)
- [Como Instalar e Rodar o Projeto](#como-instalar-e-rodar-o-projeto)
  - [Configuração](#configuração)
  - [Casos de Uso Comuns](#casos-de-uso-comuns)
  - [Solução de Problemas](#solução-de-problemas)
- [Projeto ao Vivo](#projeto-ao-vivo)
- [Fluxo de Dados](#fluxo-de-dados)
- [Licença](#licença)
- [Autor](#autor)

## Descrição

O AlFood é um sistema de gerenciamento de restaurantes e cardápios online. É um MVP (Produto Mínimo Viável) que permite listar restaurantes e seus respectivos pratos, além de oferecer uma área administrativa para gerenciar esses dados.

### Principais recursos incluem

- Listagem de restaurantes com paginação
- Visualização de pratos por restaurante
- Área administrativa para:
  - Cadastro, edição e exclusão de restaurantes
  - Cadastro, edição e exclusão de pratos
- Interface responsiva e amigável
- Integração com API backend em Django

## Tecnologias Utilizadas

### Frontend
- `React 17`
- `TypeScript`
- `React Router Dom 6`
- `Axios` para requisições HTTP
- `Material UI` para componentes de interface
- `SASS` para estilização avançada
- `CSS Modules` para estilos encapsulados

### Backend
- `Django 3.2`
- `Django REST Framework`
- `Docker` e `Docker Compose` para containerização
- `Python 3.9`
- `SQLite` (desenvolvimento)

## Estrutura de Pastas

```
alfood-cms/
├── backend/                # API Django
│   ├── restaurantes/       # App de restaurantes
│   ├── Dockerfile          # Configuração do container
│   ├── docker-compose.yml  # Orquestração de containers
│   └── requirements.txt    # Dependências Python
├── public/                 # Arquivos estáticos
│   └── imagens/            # Imagens do projeto
├── src/                    # Código fonte React
│   ├── componentes/        # Componentes reutilizáveis
│   ├── interfaces/         # Interfaces TypeScript
│   ├── paginas/            # Páginas da aplicação
│   │   ├── Administracao/  # Área administrativa
│   │   ├── Home/           # Página inicial
│   │   └── VitrineRestaurantes/ # Listagem de restaurantes
│   └── App.tsx             # Componente principal
└── package.json            # Dependências JavaScript
```

### Arquivos Principais

- `src/App.tsx`: Configuração de rotas da aplicação
- `src/http.ts`: Cliente HTTP configurado com Axios
- `src/interfaces/`: Definições de tipos para o TypeScript
- `backend/docker-compose.yml`: Configuração do ambiente de desenvolvimento

## Como Instalar e Rodar o Projeto

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Docker e Docker Compose (para o backend)
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Melksedeque/alfood-cms.git
cd alfood-cms
```

2. Instale as dependências do frontend:
```bash
npm install
```

3. Inicie o backend com Docker:
```bash
cd backend
docker-compose up -d
```

4. Volte para a pasta raiz e inicie o frontend:
```bash
cd ..
npm start
```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

### Configuração

#### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente que podem ser configuradas:

- `REACT_APP_API_URL`: URL da API (padrão: http://localhost:8000/api/v1)

#### Backend

O backend já vem configurado com dados iniciais através do arquivo `seed.json`. Ao iniciar o container Docker, o banco de dados será populado automaticamente.

### Casos de Uso Comuns

1. **Visualizar restaurantes**:
   - Acesse a página inicial e clique em "Conheça os melhores restaurantes"
   - Ou navegue diretamente para `/restaurantes`

2. **Acessar área administrativa**:
   - Navegue para `/admin`
   - Selecione "Restaurantes" ou "Pratos" no menu lateral

3. **Adicionar um novo restaurante**:
   - Na área administrativa, clique em "+ Adicionar" na seção de restaurantes
   - Preencha o nome e salve

4. **Adicionar um novo prato**:
   - Na área administrativa, acesse a seção de pratos
   - Clique em "+ Adicionar"
   - Preencha os dados, selecione uma imagem e salve

### Solução de Problemas

- **API não responde**: Verifique se o container Docker está rodando com `docker ps`
- **Erro ao carregar imagens**: Verifique se o backend está configurado corretamente para servir arquivos estáticos
- **Problemas de CORS**: Verifique se o backend está configurado para permitir requisições do frontend

## Projeto ao Vivo

Para acessar uma versão de demonstração do projeto, visite: [https://alfood-cms.vercel.app](https://alfood-cms.vercel.app)

## Fluxo de Dados

1. **Listagem de Restaurantes**:
   - Frontend faz requisição GET para `/restaurantes/`
   - API retorna lista paginada de restaurantes
   - Frontend renderiza os dados e botão "Carregar mais" se houver próxima página

2. **Administração**:
   - CRUD completo para restaurantes e pratos
   - Formulários enviam dados via POST/PUT
   - Exclusão via DELETE
   - Após operações bem-sucedidas, usuário é redirecionado para a listagem

3. **Upload de Imagens**:
   - Formulário de pratos permite upload de imagens
   - Dados enviados como `multipart/form-data`
   - Backend processa e armazena as imagens

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [MIT License](https://github.com/Melksedeque/alfood-cms?tab=MIT-1-ov-file) para mais detalhes.

## Autor

- GitHub - [Melksedeque](https://github.com/Melksedeque/)
- FrontEndMentor - [Melksedeque](https://www.frontendmentor.io/profile/Melksedeque)
- Twitter / X - [SouzaMelk](https://x.com/SouzaMelk)
- LinkedIn - [Melksedeque Silva](https://www.linkedin.com/in/melksedeque-silva/)
