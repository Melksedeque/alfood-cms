import { Box, Container, Paper } from "@mui/material"
import AppHeader from "../AppHeader";

const AdminApp = () => {
    return (
        <>
            <AppHeader />
            <Box>
                <Container maxWidth="lg">
                    <Paper sx={{p: 3}}>
                        {/* Conteúdo da Página Admin */}
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default AdminApp;